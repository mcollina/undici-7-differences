import { request, setGlobalDispatcher, getGlobalDispatcher, interceptors, cacheStores } from 'undici'
import { setTimeout as sleep } from 'timers/promises'
import fastify from 'fastify'

const app = fastify({ logger: true })

let count = 0
app.get('/', async (req, reply) => {
  reply.header('Cache-Control', 'public, max-age=1')
  return 'hello world ' + count++
})

await app.listen({ port: 3000 })

console.error(cacheStores)

setGlobalDispatcher(getGlobalDispatcher().compose(
  interceptors.cache({
    store: new cacheStores.SqliteCacheStore({
      location: './cache.db'
    })
  })
))


{
  const res = await request('http://localhost:3000/')

  console.log(res.statusCode)
  console.log(await res.body.text())
}

{
  const res = await request('http://localhost:3000/')

  console.log(res.statusCode)
  console.log(await res.body.text())
}

await sleep(1000)

{
  const res = await request('http://localhost:3000/')

  console.log(res.statusCode)
  console.log(await res.body.text())
}

await app.close()
