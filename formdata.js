import { fetch, FormData } from 'undici'
import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'

const app = fastify()

app.register(fastifyMultipart, {
  attachFieldsToBody: true
})

app.post('/upload', async (req, reply) => {
  console.log('received', req.body.file.filename)
  return 'ok'
})

await app.listen({ port: 3000 })

const body = new FormData()
body.append('file', new Blob(['hello world'], { type: 'text/plain' }), 'hello.txt')

const res = await fetch('http://localhost:3000/upload', {
  method: 'POST',
  body
})

console.log(res.status)
console.log(await res.text())
