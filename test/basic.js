var baseball = require('../');
var assert = require('assert');

describe("baseball", function () {
    it("supports overriding defaults", function () {
        var preOverride = baseball._defaults;
        
        baseball.defaults({
            immediate: true,
            delayMs: 40000
        });
        
        assert.deepEqual(baseball.defaults(), preOverride);
    });
    
    it("supports overriding for a single call", function () {
        baseball.defaults({
            immediate: false
        });
        
        assert.throws(function () {
            baseball({}, "test", {
                immediate: true
            });
        }, /Missing test/);
    });
    
    it("supports using default env", function () {
        delete process.env.test;
        
        assert.throws(function () {
            baseball("test", {
                immediate: true
            });
        }, /Missing test/);
        
        process.env.test = true;
        
        baseball("test", {
            immediate: true
        });
    });
    
    it("supports delayed", function (done) {
        delete process.env.test;
        
        baseball.handle(function (errors) {
            assert(errors.length > 0);
            done();
        });
        
        baseball("test", {
            immediate: false,
            delayMs: 500
        });
    });
});