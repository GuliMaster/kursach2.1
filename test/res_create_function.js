const http = require('http');
const fs = require('fs');
const test = require('./test.json');

const server = http.createServer(function(req, res) {
    let client = req.query.info;
    let fileDat = test;
    console.log(fileDat);
    fileDat.idMax++;
    fileDat.dat[fileDat.idMax] = client;
    fs.writeFileSync('./test.json', JSON.stringify(fileDat));
    console.log(fileDat);
    res.writeHead(200);
    res.end(fileDat);
});
exports.listen = function(port) {
    console.log('Listening on: ' + port);
    server.listen(port);
};

exports.close = function() {
    server.close();
};
