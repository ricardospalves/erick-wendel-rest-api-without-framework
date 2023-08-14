import test from 'node:test'
import assert from 'node:assert'
import { routes } from '../../../src/routes/hero/hero.js'
import { DEFAULT_HEADER } from '../../../src/constants/DEFAULT_HEADER.js'

const callTracker = new assert.CallTracker()

process.on('exit', () => callTracker.verify())

test('Hero routes: endpoint test suit', async (testConstext) => {
  await testConstext.test('should call /heroes:get route', async () => {
    const databaseMock = [
      {
        id: 'f7a7d556-e005-4cb4-a2f4-18ced13ea14e',
        name: 'Batman',
        age: 50,
        power: 'rich',
      },
    ]
    const heroServiceStub = {
      find: async () => databaseMock,
    }
    const endpoints = routes({
      heroService: heroServiceStub,
    })
    const endpoint = '/heroes:get'
    const request = {}
    const response = {
      write: callTracker.calls((item) => {
        const expected = JSON.stringify({
          results: databaseMock,
        })

        assert.strictEqual(
          item,
          expected,
          'write should be called with the correct payload',
        )
      }),
      end: callTracker.calls((item) => {
        assert.strictEqual(
          item,
          undefined,
          'end should be called withoud params',
        )
      }),
    }
    const route = endpoints[endpoint]

    await route(request, response)
  })

  testConstext.todo('should call /heroes:post route')
})
