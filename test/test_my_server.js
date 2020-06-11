const http = require('http');
const assert = require('assert');

const server = require('./my_server.js');

describe('HTTP Server Test', function() {
    before(function() {
        server.listen(8080);
    });
    after(function() {
        server.close();
    });
    describe('/', function() {
        it('should be Hello, Mocha!', function(done) {
            http.get('http://95.217.210.154:8080', function(response) {
                // Assert the status code.
                assert.equal(response.statusCode, 200);

                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    // Let's wait until we read the response, and then assert the body
                    // is 'Hello, Mocha!'.
                    assert.equal(body, 'Hello, Mocha!');
                    done();
                });
            });
        });
    });
});
