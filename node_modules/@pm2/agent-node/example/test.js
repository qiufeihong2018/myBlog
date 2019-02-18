'use strict'

process.env.DEBUG = '*'

const Agent = require('..')
const proc = {
  axm_actions: [{action_name: 'test', action_type: 'pm2'}]
}
const agent = new Agent({ // eslint-disable-line
  publicKey: 'zftc3kf0ehy12bo',
  secretKey: 'ptcsyi1n6chf9qs',
  appName: 'agent-node'
}, proc)

const init = async _ => {
  await agent.start()
  // Add some custom actions
  setTimeout(_ => proc.axm_actions.push({action_name: 'lol', action_type: 'pm2'}), 10000)
  // Listen
  let listener = payload => console.log(payload)
  agent.transport.on('trigger:pm2:action', listener)
  // Stop listening
  setTimeout(_ => agent.transport.removeListener('trigger:pm2:action', listener), 10000)
  // Send packet
  agent.transport.send('exception', {key: 'value'})
  console.log('done.')
}
init()
