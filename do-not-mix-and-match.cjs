'use strict'

// Do not initialize fetch() before requiring/importing undici
fetch('https://example.com').catch(console.error)

const undici = require('undici')

undici.setGlobalDispatcher(undici.getGlobalDispatcher().compose((dispatch) => {
  return (opts, handler) => {
    if (!handler.onRequestStart) {
      throw new Error('Handler must implement onRequestStart')
    }
    return dispatch(opts, handler)
  }
}))

undici.request('https://example.com').then((res) => {
  console.log(res.statusCode)
  return res.body.dump()
}).catch(console.error)
