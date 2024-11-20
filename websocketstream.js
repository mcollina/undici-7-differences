import { WebSocketStream } from 'undici'
import { pipeline } from 'node:stream/promises'
import fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import {createWebSocketStream} from 'ws'

const app = fastify({ logger: true })

await app.register(fastifyWebsocket)

app.get('/', { websocket: true }, async (ws) => {
  const stream = createWebSocketStream(ws)
  await pipeline(stream, async function * (s) {
    for await (const data of s) {
      console.log(data.toString())
      yield data.toString().toUpperCase()
    }
  }, stream)
})

await app.listen({ port: 3000 })

const ws = new WebSocketStream('ws://localhost:3000/')

const { readable, writable } = await ws.opened

const writer = writable.getWriter();

writer.write('hello world')

for await (const value of readable) {
  console.log('received', new TextDecoder().decode(value))
  writer.close()
}
