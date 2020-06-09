const assert = require('assert');
const script = require('./feature_2.js');
const queue = require('../queue.json');

describe('Test Feature_2', function(){
    it('should return amount of Elements in the table, which one is equal number of elements in the json file', function() {
        assert.equal(script.amount(), queue.idMax);
    });
});
