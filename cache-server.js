import fastify from 'fastify'

const app = fastify({ logger: true })

let count = 0
app.get('/', async (req, reply) => {
  reply.header('Cache-Control', 'public, max-age=60')
  return 'hello world ' + count++
})

await app.listen({ port: 3000 })
