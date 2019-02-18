'use strict'

const exec = require('child_process').exec;
const path = require('path');
const agent = require('../..');
const assert = require('assert');
const http = require('http');

describe('Request', _ => {

  let server;

  describe('http', _ => {

    before('should install socket.io', done => {
      exec('npm install', {
        env: process.env,
        cwd: path.resolve(__dirname, './')
      }, done);
    });

    after(() => {
      if(server) {
        server.close();
      }
    });

    it('should start agent', () => {
      agent.start();
    });

    it('should get http request', done => {
      require('./index').init(function(serv) {
        server = serv;
        const url = 'http://localhost:3000/toto';

        agent.ee.once('http', (data) => {
          data = JSON.parse(data);
          assert.equal(data.method, 'GET');
          assert.equal(data.url, '/toto');
          done();
        });

        http.get(url);
      });
    });

    it('should get http-outbound request', done => {
      const url = 'http://keymetrics.io';

      agent.ee.once('http-outbound', (data) => {
        data = JSON.parse(data);
        assert.equal(data.method, 'GET');
        assert.equal(data.url, url);
        done();
      });

      http.get(url);
    });
  });
});
