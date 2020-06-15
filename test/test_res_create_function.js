const http = require('http');
const assert = require('assert');
const server = require('./res_read_function.js');
const test = require('./test.json');

const info = 'CLIENT';
describe('HTTP Server Test', function() {
    before(function() {
        server.listen(8989);
    });
    after(function() {
        server.close();
    });
    describe('/', function() {
        it('should create new record in json file by request', function(done) {
            http.get(`http://95.217.210.154:8989?info=${info}`, function(response) {
                assert.equal(response.statusCode, 200);
                var body = '';
                response.on('data', function(d) {
                    console.log(d);
                    body += d;
                });
                response.on('end', function() {
                    assert.equal(body, test.idMax++);
                    done();
                });
            });
        });
    });
});

