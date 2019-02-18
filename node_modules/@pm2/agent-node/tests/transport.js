/* eslint-env mocha */

'use strict'

process.env.NODE_ENV = 'test'

const assert = require('assert')
const ws = require('ws')
const socks = require('simple-socks')

const Transport = require('../src/transport')

describe('Transporter', _ => {
  let wss = null
  let conn = null

  let transporter = null

  before(() => {
    wss = new ws.Server({ port: 64000 })
  })

  describe('Without proxy', _ => {
    it('construct without error', () => {
      transporter = new Transport()
    })

    it('should set config correctly', () => {
      transporter.setConfig('ws://localhost:64000', { 'X-Test': true })
    })

    it('should connect correctly', done => {
      transporter.connect(err => {
        assert(err === null)
      })
      wss.once('connection', connection => {
        conn = connection
        // TODO: check header
        done()
      })
    })

    it('must return false if message not formatted correctly', () => {
      assert(transporter.send('test') === false)
      assert(transporter.send({}) === false)
      assert(transporter.send({ channel: 'test' }) === false)
      assert(transporter.send({ payload: 'test' }) === false)
    })

    it('should send message correctly', done => {
      transporter.send({
        channel: 'test',
        payload: true
      })
      conn.once('message', msg => {
        msg = JSON.parse(msg)
        assert(msg.channel === 'test')
        assert(msg.payload === true)
        done()
      })
    })

    it('should receive message correctly', done => {
      transporter.once('test-2', p => {
        assert(p === true)
        done()
      })
      conn.send(JSON.stringify({ channel: 'test-2', payload: true }))
    })

    it('should disconnect correctly', (done) => {
      transporter.disconnect()
      setTimeout(_ => {
        assert(wss.clients.size === 0)
        return done()
      }, 500)
    })
  })

  describe('With proxy', _ => {
    let proxyServer = null
    let proxyClients = 0

    before(() => {
      proxyServer = socks.createServer().listen(1080)

      proxyServer.on('proxyConnect', (info) => {
        proxyClients++
      })
      proxyServer.on('proxyEnd', _ => {
        proxyClients--
      })
    })

    it('should set proxy conf correctly', () => {
      transporter.setConfig('ws://localhost:64000', { 'X-Test': true }, 'socks5://127.0.0.1:1080')
    })

    it('should connect correctly', done => {
      wss.once('connection', connection => {
        conn = connection
        assert(proxyClients === 1)
        done()
      })
      transporter.connect(_ => {})
    })

    it('should send message correctly', done => {
      transporter.send({
        channel: 'test',
        payload: true
      })
      conn.once('message', msg => {
        msg = JSON.parse(msg)
        assert(msg.channel === 'test')
        assert(msg.payload === true)
        done()
      })
    })

    it('should receive message correctly', done => {
      transporter.once('test-2', p => {
        assert(p === true)
        done()
      })
      conn.send(JSON.stringify({ channel: 'test-2', payload: true }))
    })

    after(() => {
      proxyServer.close()
    })
  })

  after(() => {
    transporter.disconnect()
    wss.close()
  })
})
