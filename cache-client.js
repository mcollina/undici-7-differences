import { request, setGlobalDispatcher, Agent, interceptors, cacheStores } from 'undici'

setGlobalDispatcher(new Agent().compose(
  interceptors.cache({
    store: new cacheStores.SqliteCacheStore({
      location: './cache.db'
    })
  })
))

{
  const res = await request('http://localhost:3000/')

  console.log(res.statusCode, await res.body.text())
}

{
  // Global fetch()
  const res = await fetch('http://localhost:3000/')

  console.log(res.status, await res.text())
}
