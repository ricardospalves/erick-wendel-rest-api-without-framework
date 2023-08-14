import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_HEADER } from './constants/DEFAULT_HEADER.js'
import { routes } from './routes/hero/hero.js'
import { generateInstance } from './factories/heroFactory.js'

const CURRENT_DIRECTORY = dirname(fileURLToPath(import.meta.url))
const FILE_PATH = join(CURRENT_DIRECTORY, './../database', 'data.json')
const heroService = generateInstance({
  filePath: FILE_PATH,
})
const heroRoute = routes({
  heroService,
})

const allRoutes = {
  ...heroRoute,
  // 404 routes
  default: async (request, response) => {
    response.writeHead(404, DEFAULT_HEADER)
    response.write('Not found')
    response.end()
  },
}

export const handler = (request, response) => {
  const { url, method } = request
  const { pathname } = new URL(`http://${request.headers.host}${url}`)
  const routeKey = `${pathname}:${method?.toLowerCase()}`
  const routeChosen = allRoutes[routeKey] || allRoutes.default

  return Promise.resolve(routeChosen(request, response)).catch(
    handlerError(response),
  )
}

export const handlerError = (response) => {
  return (error) => {
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
