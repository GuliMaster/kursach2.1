const http = require('http');
const assert = require('assert');
const server = require('./res_read_function.js');
const test = require('./test.json');

describe('HTTP Server Test', function() {
    before(function() {
        server.listen(8080);
    });
    after(function() {
        server.close();
    });
    describe('/', function() {
        it('should get json file by request.', function(done) {
            http.get('http://localhost:8080', function(response) {
                assert.equal(response.statusCode, 200);
                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    assert.equal(body, test.idMax);
                    console.log(test.idMax);
                    done();
                });
            });
        });
    });
});
