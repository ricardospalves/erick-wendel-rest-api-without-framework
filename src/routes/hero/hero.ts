import { ServerResponse, IncomingMessage } from 'node:http'
import { once } from 'node:events'
import { HeroEntity } from '../../entities/HeroEntity'
import { DEFAULT_HEADER } from '../../constants/defaultHeader'

type RequestData = {
  name: string
  age: number
  power: string
}

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
      const data = await once(request, 'data')
      const item = JSON.parse(`${data}`) as RequestData
      const hero = new HeroEntity(item)
      const heroID = hero.id

      // throw new Error('HEROES ERROR')
      response.writeHead(201, DEFAULT_HEADER)
      response.write(
        JSON.stringify({
          heroID,
          message: 'User created with success',
        }),
      )
      return response.end()
    },
  }
}
