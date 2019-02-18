const ioClient = require('socket.io-client');
const options = {
  transports: ['websocket'],
  'force new connection': true
};

module.exports = class {
  static init (cb) {

    const {server} = require('./server');

    const sender = ioClient('http://localhost:3000/', options);
    const receiver = ioClient('http://localhost:3000/', options);

    cb(server, sender, receiver);
  }
}
