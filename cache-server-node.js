import { createServer } from 'node:http'

let count = 0
const server = createServer((req, res) => {
  console.log('request', req.url)
  res.setHeader('Cache-Control', 'public, max-age=60')
  res.end('hello world ' + count++)
})

server.listen(3000)
