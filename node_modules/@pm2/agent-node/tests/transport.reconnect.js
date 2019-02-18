/* eslint-env mocha */

'use strict'

process.env.NODE_ENV = 'test'
process.env.DEBUG = 'agent:transport'

const assert = require('assert')
const ws = require('ws')
const http = require('http')

const Transport = require('../src/transport')

describe('Transporter', _ => {
  let wss = null
  let conn = null

  let transporter = null

  before(() => {
    wss = new ws.Server({ port: 64000 })
  })

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

  it('should reconnect if connection is closed and backend unavailable', function (done) {
    if (parseInt(process.env.NODE_VERSION) < 10) return done()
    this.timeout(10000)
    wss.close(_ => {
      const server = http.createServer(function (req, res) {
        res.writeHead(503)
        res.write('Backend unavailable')
        res.end()
        server.close(_ => {
          wss = new ws.Server({ port: 64000 })
          wss.once('connection', connection => {
            conn = connection
            done()
          })
        })
      }).listen(64000)
    })
  })

  it('should send message correctly', done => {
    if (parseInt(process.env.NODE_VERSION) < 10) return done()
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

  it('should reconnect if port is not binded', function (done) {
    if (parseInt(process.env.NODE_VERSION) < 10) return done()
    this.timeout(10000)
    wss.close()
    setTimeout(_ => {
      wss = new ws.Server({ port: 64000 })
      wss.once('connection', connection => {
        conn = connection
        done()
      })
    }, 2000)
  })

  it('should send message correctly', done => {
    if (parseInt(process.env.NODE_VERSION) < 10) return done()
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

  it('should disconnect correctly', (done) => {
    transporter.disconnect()
    setTimeout(_ => {
      assert(wss.clients.size === 0)
      return done()
    }, 500)
  })

  after(() => {
    transporter.disconnect()
    wss.close()
  })
})
