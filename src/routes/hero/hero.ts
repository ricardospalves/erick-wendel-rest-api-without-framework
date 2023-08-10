import { ServerResponse, IncomingMessage } from 'node:http'

export const routes = () => {
  return {
    '/heroes:get': async (
      request: IncomingMessage,
      response: ServerResponse<IncomingMessage>,
    ) => {
      // throw new Error('HEROES ERROR')
      response.write('GET')
      response.end()
    },
    '/heroes:post': async (
      request: IncomingMessage,
      response: ServerResponse<IncomingMessage>,
    ) => {
      // throw new Error('HEROES ERROR')
      response.write('GET')
      response.end()
    },
  }
}
