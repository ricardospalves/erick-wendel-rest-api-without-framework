import { ServerResponse, IncomingMessage } from 'node:http'
import { DEFAULT_HEADER } from './constants/defaultHeader'

type Handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => void

const allRoutes = {
  '/heroes:get': ((request, response) => {
    response.write('GET')
    response.end()
  }) as Handler,
  // 404 routes
  default: ((request, response) => {
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

  return routeChosen(request, response)
}
