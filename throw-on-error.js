import { createServer } from 'node:http'
import { once } from 'node:events'
import { interceptors, getGlobalDispatcher, setGlobalDispatcher, request } from 'undici'

const server = createServer((req, res) => {
  console.log('request', req.url)
  res.statusCode = 404
  res.end('hello world')
})

server.listen(3000)
await once(server, 'listening')

setGlobalDispatcher(getGlobalDispatcher().compose(
  interceptors.responseError()
))

await request('http://localhost:3000/')
