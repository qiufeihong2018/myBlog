var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['a.js']);
console.log(process.pid, p.pid);

process.exit(0);