import { request, setGlobalDispatcher, Agent, interceptors, cacheStores } from 'undici'
import { createServer } from 'node:http'
import { once } from 'node:events'

let count = 0
const server = createServer((req, res) => {
  console.log('request', req.url)
  res.setHeader('Cache-Control', 'public, max-age=60').end('hello world ' + count++)
})

await once(server.listen(3000), 'listening')

setGlobalDispatcher(new Agent().compose(
  interceptors.cache({
    store: new cacheStores.SqliteCacheStore({ location: './cache.db' })
  })
))

const res1 = await request('http://localhost:3000/')
console.log(res1.statusCode, await res1.body.text())

const res2 = await fetch('http://localhost:3000/') // works with global fetch() too
console.log(res2.status, await res2.text())
