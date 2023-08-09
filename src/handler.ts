import { ServerResponse, IncomingMessage } from 'node:http'
import { DEFAULT_HEADER } from './constants/defaultHeader'

type Handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => void

const allRoutes = {
  '/heroes:get': (async (request, response) => {
    // throw new Error('HEROES ERROR')
    response.write('GET')
    response.end()
  }) as Handler,
  // 404 routes
  default: (async (request, response) => {
    // throw new Error('DEFAULT ERROR')
    response.writeHead(404, DEFAULT_HEADER)
    response.write('Not found')
    response.end()
  }) as Handler,
}

export const handler: Handler = (request, response) => {
  const { url, method } = request
  const { pathname } = new URL(`http://${request.headers.host}${url}`)
  const routeKey = `${pathname}:${method?.toLowerCase()}`
  const routeChosen =
    allRoutes[routeKey as keyof typeof allRoutes] || allRoutes.default

  return Promise.resolve(routeChosen(request, response)).catch(
    handlerError(response),
  )
}

export const handlerError = (response: ServerResponse<IncomingMessage>) => {
  return (error: Error) => {
    console.log('Something went wrong', error.stack)

    response.writeHead(500, DEFAULT_HEADER)
    response.write(
      JSON.stringify({
        error: 'Internet server error',
      }),
    )

    return response.end()
  }
}
