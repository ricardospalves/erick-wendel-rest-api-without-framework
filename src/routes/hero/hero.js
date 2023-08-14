import { once } from 'node:events'
import { HeroEntity } from '../../entities/HeroEntity.js'
import { DEFAULT_HEADER } from '../../constants/DEFAULT_HEADER.js'

export const routes = ({ heroService }) => {
  return {
    '/heroes:get': async (request, response) => {
      response.write('GET')

      return response.end()
    },
    '/heroes:post': async (request, response) => {
      const data = await once(request, 'data')
      const item = JSON.parse(data)
      const hero = new HeroEntity(item)
      const heroID = await heroService.create(hero)

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
