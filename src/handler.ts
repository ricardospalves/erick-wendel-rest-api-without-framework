import { ServerResponse, IncomingMessage } from 'node:http'

export const handler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage
  },
) => {
  response.end('Hello World')
}
