var assert = require('assert');
var Promise = require('es6-promise').Promise;
var baseball = require('../lib');

describe("baseball", function () {
    it("should be a factory", function () {
        assert.equal(typeof(baseball), "function");
        assert.equal(typeof(baseball()), "function");
    });
    
    it("should support options", function () {
        
        var mockLoggerCallCount = 0;
        var mockLogger = function () {
            mockLoggerCallCount++;
            assert.equal(arguments[0], this);
        };
        
        var testPrefix = baseball("TEST: ");
        var testLogger = baseball(mockLogger.bind("Error: test"));
        var testBoth = baseball({
            messagePrefix: "TEST: ",
            logger: mockLogger.bind("TEST: Error: test")
        });
        
        // patch the underlying system so that we can
        // verify testPrefix works - we unpatch after
        var oldStderrW = process.stderr.write;
        process.stderr.write = function (chunk) {
            assert.equal(chunk, "TEST: Error: test\n");
        };
        
        testPrefix(new Error("test"));
        
        process.stderr.write = oldStderrW;
        
        testLogger(new Error("test"));
        testBoth(new Error("test"));
    });
    
    it("should work with Promises", function (done) {
        var mockLoggerCallCount = 0;
        var mockLogger = function () {
            mockLoggerCallCount++;
            assert.equal(arguments[0], this);
        };
        var finCallCount = 0;
        var fin = function () {
            finCallCount++;
            if (finCallCount === 3) {
                done();
            }
        }
        
        new Promise(function (resolve, reject) {
            reject(new Error("test"));
        }).catch(baseball(mockLogger.bind("Error: test"))).then(fin);
        
        new Promise(function (resolve, reject) {
            reject("test");
        }).catch(baseball(mockLogger.bind("test"))).then(fin);
        
        new Promise(function (resolve, reject) {
            reject(1);
        }).catch(baseball(mockLogger.bind("1"))).then(fin);
    })
});