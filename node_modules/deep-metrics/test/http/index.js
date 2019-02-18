module.exports = class {
  static init (cb) {
    const {server} = require('./server');
    cb(server);
  }
}
