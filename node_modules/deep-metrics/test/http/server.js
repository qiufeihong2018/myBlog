var port = process.env.PORT || 3000
    , http = require('http').createServer(function(req, res) {
  res.writeHead(200);
  res.end('ok');
});

// export the server so it can be easily called for testing
exports.server = http.listen(port);
