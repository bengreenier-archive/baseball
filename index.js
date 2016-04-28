var extend = require('extend');
var util = require('util');
var assert = require('assert');
var sprintf = require('sprintf-js').sprintf;

function baseball(root, validate, opts) {
    if (typeof(root) === "string") {
        opts = validate;
        validate = root;
        root = process.env;
    }
    
    opts = extend(baseball._defaults, opts);
    
    if (opts.immediate) {
        assert(typeof(root[validate]) !== "undefined", sprintf(opts.message, validate));
    } else {
        try
        {
            assert(typeof(root[validate]) !== "undefined", sprintf(opts.message, validate));
        }
        catch (ex)
        {
            baseball._errors.push(ex);
            if (baseball._timeout !== null) {
                clearTimeout(baseball._timeout);
            }
            
            baseball._timeout = setTimeout(function () {
                if (baseball._errors.length > 0) {
                    opts.handler(baseball._errors);
                }
            }, opts.delayMs);
        }
    }
}

baseball._errors = [];
baseball._timeout = null;

baseball._defaults = {
    immediate: false,
    message: "Missing %s",
    delayMs: 2000,
    returnCode: null,
    handler: function (errors) {
        var errStr = "";
        for (var i = 0 ; i < errors.length ; i++) {
            if (i > 0) {
                errStr += ", ";
            }
            errStr += errors[i].message;
        }
        
        console.error(new Error(errStr));
        
        var ret = baseball.defaults().returnCode;
        if (typeof(ret) === "number") {
            process.exit(ret);
        }
    }
};

baseball.defaults = function (opts) {
    if (typeof(opts) === "undefined") {
        return baseball._defaults;
    } else {
        baseball._defaults = extend(baseball._defaults, opts);
    }
};

baseball.handle = function (callback) {
    baseball.defaults({
        handler: callback
    });
};

module.exports = exports = baseball;