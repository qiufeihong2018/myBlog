/* eslint-env mocha */

'use strict'

process.env.NODE_ENV = 'test'

const assert = require('assert')
const async = require('async')
const http = require('http')
const socks = require('simple-socks')
const httpWrapper = require('../../src/utils/http')

describe('HTTP wrapper', () => {
  describe('open', _ => {
    it('should fail with an error', (done) => {
      httpWrapper.open({url: 'invalid-url'}, (err) => {
        assert(err instanceof Error)
        return done()
      })
    })
    it('should return json content', (done) => {
      let server = null
      async.series([
        (next) => {
          server = http.createServer((req, res) => {
            res.write(JSON.stringify({response: 'json'}))
            res.end()
          }).listen(8080, next)
        },
        (next) => httpWrapper.open({url: 'http://localhost:8080'}, (err, data) => {
          assert(err === null)
          assert(data.response === 'json')
          return next()
        })
      ], (err) => {
        if (err) return done(err)
        return server.close(done)
      })
    })
    it('should return json content with proxy', done => {
      let server = null
      let proxyServer = socks.createServer().listen(1080)
      let proxyTotalClients = 0
      proxyServer.on('proxyConnect', _ => {
        proxyTotalClients++
      })
      async.series([
        (next) => {
          server = http.createServer((req, res) => {
            res.write(JSON.stringify({response: 'json'}))
            res.end()
          }).listen(8080, next)
        },
        (next) => httpWrapper.open({url: 'http://localhost:8080', proxy: 'socks5://127.0.0.1:1080'}, (err, data) => {
          assert(err === null)
          assert(data.response === 'json')
          assert(proxyTotalClients === 1)
          return next()
        })
      ], (err) => {
        if (err) return done(err)
        proxyServer.close()
        return server.close(done)
      })
    })
  })
  describe('getModule', _ => {
    it('should return http module', (done) => {
      assert(httpWrapper.getModule('http://google.fr') === require('http'))
      assert(httpWrapper.getModule('http://google.fr/https://') === require('http'))
      return done()
    })
    it('should return https module', (done) => {
      assert(httpWrapper.getModule('https://google.fr') === require('https'))
      assert(httpWrapper.getModule('https://google.fr/http://') === require('https'))
      return done()
    })
  })
})
