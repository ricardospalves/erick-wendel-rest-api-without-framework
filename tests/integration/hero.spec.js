import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'

test('Hero Integration Test Suit', async (testConstext) => {
  const testPort = 9009

  // that's a bad practice because it mutates the environment
  process.env.PORT = `${testPort}`

  const { server } = await import('../../src/index.js')
  const testServerAddress = `http://localhost:${testPort}/heroes`

  await testConstext.test('should create a hero', async () => {
    const data = {
      name: 'Batman',
      age: 50,
      power: 'rich',
    }

    const request = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    assert.deepStrictEqual(
      request.headers.get('Content-Type'),
      'application/json',
    )
    assert.strictEqual(request.status, 201)

    const result = await request.json()

    assert.deepStrictEqual(
      result.message,
      'User created with success',
      'should return a valid text message',
    )
    assert.ok(result.heroID.length > 30, 'id should be a valid uuid')
  })

  await promisify(server.close.bind(server))()
})
