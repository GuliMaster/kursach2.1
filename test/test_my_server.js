const http = require('http');
const assert = require('assert');
const server = require('./my_server.js');

describe('HTTP Server Test', function() {
    before(function() {
        server.listen();
    });
    after(function() {
        server.close();
    });
    describe('/', function() {
        it('should get response: Hello!', function(done) {
            http.get('http://localhost:8080', function(response) {
                assert.equal(response.statusCode, 200);
                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    assert.equal(body, 'Hello!');
                    done();
                });
            });
        });
    });
});
