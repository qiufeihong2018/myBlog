/* eslint-env mocha */

'use strict'

process.env.NODE_ENV = 'test'

const Agent = require('../src/index')
const assert = require('assert')
const transport = require('../src/transport')
const createAgent = (proc, cb) => {
  if (!cb) {
    cb = proc
    proc = null
  }
  transport.prototype.connect = (cb) => cb()
  module.exports = transport
  let tmp = Agent.prototype.checkCredentials
  Agent.prototype.checkCredentials = (config, cb) => cb(null, {ws: 'endpoint'})
  let config = {publicKey: 'public', secretKey: 'secret', appName: 'app'}
  let agent = new Agent(config, proc || {})
  return cb(agent, next => {
    Agent.prototype.checkCredentials = tmp
    agent.destruct()
    next()
  })
}

describe('Agent', _ => {
  describe('constructor', _ => {
    it('should return an error with bad configuration', (done) => {
      assert(new Agent() instanceof Error)
      assert(new Agent({}) instanceof Error)
      assert(new Agent({publicKey: ''}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: ''}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: '', appName: ''}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: '', appName: {}, proc: {}}) instanceof Error)
      assert(new Agent({publicKey: '', secretKey: '', appName: {}, proc: ''}) instanceof Error)
      return done()
    })
    it('should fail check credentials', (done) => {
      let tmp = Agent.prototype.checkCredentials
      Agent.prototype.checkCredentials = (config, cb) => cb(new Error('Test error'))
      let agent = new Agent({publicKey: 'public', secretKey: 'secret', appName: 'app'}, {})
      assert(!(agent instanceof Error))
      agent.start().then(e => {
        agent.destruct()
        done()
      }).catch(err => {
        agent.destruct()
        done(err)
      })
      Agent.prototype.checkCredentials = tmp
    })
    it('should fail transport connect', (done) => {
      transport.prototype.connect = (cb) => cb(new Error('Test error'))
      module.exports = transport
      let tmp = Agent.prototype.checkCredentials
      Agent.prototype.checkCredentials = (config, cb) => cb(null, {ws: 'endpoint'})
      let agent = new Agent({publicKey: 'public', secretKey: 'secret', appName: 'app'}, {})
      assert(!(agent instanceof Error))
      agent.start().then(_ => {
        agent.destruct()
        done()
      }).catch(err => {
        agent.destruct()
        done(err)
      })
      Agent.prototype.checkCredentials = tmp
    })
    it('should save config', (done) => {
      transport.prototype.connect = (cb) => cb()
      module.exports = transport
      let tmp = Agent.prototype.checkCredentials
      Agent.prototype.checkCredentials = (config, cb) => cb(null, {ws: 'endpoint'})
      let config = {publicKey: 'public', secretKey: 'secret', appName: 'app'}
      let agent = new Agent(config, {})
      assert(!(agent instanceof Error))
      agent.start().then(_ => {
        assert(agent.transport instanceof transport)
        assert(agent.config.publicKey === config.publicKey)
        assert(agent.config.secretKey === config.secretKey)
        assert(agent.config.appName === config.appName)
        assert(typeof agent.config.internalIp === 'string')
        assert(typeof agent.process.unique_id === 'string')
        clearInterval(agent.statusInterval)
        Agent.prototype.checkCredentials = tmp
        agent.destruct()
        done()
      }).catch(err => {
        done(err)
      })
    })
  })
  describe('generateUniqueId', _ => {
    it('should return unique id', (done) => {
      let ids = []
      for (let i = 0; i < 100; i++) {
        let id = Agent.prototype.generateUniqueId()
        assert(!ids.includes(id))
        ids.push(id)
      }
      return done()
    })
  })
  describe('generateProcess', _ => {
    it('should add created at', (done) => {
      createAgent((agent, next) => {
        let proc = agent.generateProcess(agent.process)
        assert(proc.pid === process.pid)
        assert(proc.name === agent.config.appName)
        assert(proc.interpreter === 'node')
        assert(proc.restart_time === 0)
        assert(typeof proc.created_at === 'number')
        assert(proc.exec_mode === 'fork_mode')
        assert(proc.watching === false)
        assert(typeof proc.pm_uptime === 'number')
        assert(proc.status === 'online')
        assert(proc.pm_id === 0)
        assert(proc.unique_id === agent.process.unique_id)
        assert(typeof proc.cpu === 'number')
        assert(typeof proc.memory === 'number')
        assert(proc.versioning === null)
        assert(proc.node_env === 'test')
        assert(Array.isArray(proc.axm_actions))
        assert(typeof proc.axm_monitor === 'object')
        assert(typeof proc.axm_options === 'object')
        assert(typeof proc.axm_dynamic === 'object')
        return next(done)
      })
    })
    it('should return process with new axm action', (done) => {
      let configProc = {
        axm_actions: [{action_type: 'pm2', action_name: 'test'}]
      }
      createAgent(configProc, (agent, next) => {
        let proc = agent.generateProcess(agent.process)
        assert(proc.axm_actions[0].action_name === 'test')
        return next(done)
      })
    })
  })
  describe('listenForLogs', _ => {
    const config = {publicKey: 'public', secretKey: 'secret', appName: 'app'}
    it('should send stdout logs (stdout)', (done) => {
      const agent = new Agent(config, {})
      agent.sendLogs = true
      agent.send = (channel, data) => {
        assert(channel === 'logs')
        assert(data.data === 'log line\n')
        agent.destruct()
        return done()
      }
      agent.listenForLogs()
      console.log('log line')
    })
    it('should send stderr logs (stderr)', (done) => {
      const agent = new Agent(config, {})
      agent.sendLogs = true
      agent.send = (channel, data) => {
        assert(channel === 'logs')
        assert(data.data === 'log line\n')
        agent.destruct()
        return done()
      }
      agent.listenForLogs()
      console.error('log line')
    })
    it("shouldn't send logs (stdout)", (done) => {
      const agent = new Agent(config, {})
      agent.sendLogs = false
      agent.send = (channel, data) => {
        assert(false)
      }
      agent.listenForLogs()
      console.log('log line')
      setTimeout(_ => {
        agent.destruct()
        return done()
      }, 1000)
    })
    it("shouldn't send unmatched logs (stdout)", (done) => {
      const agent = new Agent(Object.assign({logFilter: 'unmatch'}, config), {})
      agent.sendLogs = true
      agent.send = (channel, data) => {
        assert(false)
      }
      agent.listenForLogs()
      console.log('log line')
      setTimeout(_ => {
        agent.destruct()
        return done()
      }, 1000)
    })
    it("shouldn't send unmatched logs (stderr)", (done) => {
      const agent = new Agent(Object.assign({logFilter: 'unmatch'}, config), {})
      agent.sendLogs = true
      agent.send = (channel, data) => {
        assert(false)
      }
      agent.listenForLogs()
      console.error('log line')
      setTimeout(_ => {
        agent.destruct()
        return done()
      }, 1000)
    })
    it('should send matched logs (stdout)', (done) => {
      const agent = new Agent(Object.assign({logFilter: 'log'}, config), {})
      agent.sendLogs = true
      agent.send = (channel, data) => {
        assert(channel === 'logs')
        assert(data.data === 'log line\n')
        agent.destruct()
        return done()
      }
      agent.listenForLogs()
      console.log('log line')
    })
    it('should send matched logs (stderr)', (done) => {
      const agent = new Agent(Object.assign({logFilter: 'log'}, config), {})
      agent.sendLogs = true
      agent.send = (channel, data) => {
        assert(channel === 'logs')
        assert(data.data === 'log line\n')
        agent.destruct()
        return done()
      }
      agent.listenForLogs()
      console.error('log line')
    })

    it('should send logs with reverse action (stdout)', (done) => {
      const agent = new Agent(config, {})
      agent.send = (channel, data) => {
        assert(channel === 'logs')
        assert(data.data === 'log line\n')
        agent.destruct()
        return done()
      }
      agent.listenForLogs()
      agent.transport.emit('trigger:pm2:action', {
        method_name: 'startLogging'
      })
      console.log('log line')
    })

    it('should send logs with reverse action (stderr)', (done) => {
      const agent = new Agent(config, {})
      agent.send = (channel, data) => {
        assert(channel === 'logs')
        assert(data.data === 'log line\n')
        agent.destruct()
        return done()
      }
      agent.listenForLogs()
      agent.transport.emit('trigger:pm2:action', {
        method_name: 'startLogging'
      })
      console.error('log line')
    })
  })
})
