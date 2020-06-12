const http = require('http');
const test = require('./test.json');

const server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(test.idMax);
});
exports.listen = function(port) {
    console.log('Listening on: ' + port);
    server.listen(port);
};
exports.close = function() {
    server.close();
};


