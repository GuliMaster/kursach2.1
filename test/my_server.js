const http = require('http');

const server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Hello!');
});

exports.listen = function(port) {
    console.log('Listening on: ' + port);
    server.listen(port);
};

exports.close = function() {
    server.close();
};
