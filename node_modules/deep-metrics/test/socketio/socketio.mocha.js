'use strict'

const exec = require('child_process').exec;
const path = require('path');
const agent = require('../..');
const assert = require('assert');

describe('socket.io', _ => {
  describe('1.x', _ => {

    let receiver;
    let sender;
    let server;

    before('should install socket.io', done => {
      exec('npm install', {
        env: process.env,
        cwd: path.resolve(__dirname, './1.x/')
      }, done);
    });

    after(() => {
      sender.disconnect();
      receiver.disconnect();
      server.close();
    });

    it('should start agent', () => {
      agent.start();
    });

    it('should send message through socket', done => {
      require('./1.x/index').init(function(serv, s, r) {

        const testMsg = 'hello';

        sender = s;
        receiver = r;
        server = serv;

        sender.emit('message', testMsg);
        receiver.on('message', function(msg) {
          assert.equal(msg, testMsg);
        });

        agent.ee.once('socketio', (data) => {
          data = JSON.parse(data);
          if(data.event === "connect") {
            done();
          }
        });
      });
    });
  });

  describe('2.x', _ => {

    let receiver;
    let sender;
    let server;

    before('should install socket.io', done => {
      exec('npm install', {
        env: process.env,
        cwd: path.resolve(__dirname, './2.x/')
      }, done);
    });

    after(() => {
      sender.disconnect();
      receiver.disconnect();
      server.close();
    });

    it('should start agent', () => {
      agent.start();
    });

    it('should send message through socket', done => {
      require('./2.x/index').init(function(serv, s, r) {

        const testMsg = 'hello';

        sender = s;
        receiver = r;
        server = serv;

        sender.emit('message', testMsg);
        receiver.on('message', function(msg) {
          assert.equal(msg, testMsg);
        });

        agent.ee.once('socketio', (data) => {
          data = JSON.parse(data);

          if(data.event === "connect") {
            done();
          }
        });
      });
    });
  });
});
