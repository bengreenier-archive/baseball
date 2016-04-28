baseball
===========

[![Build Status](https://travis-ci.org/bengreenier/baseball.svg?branch=master)](https://travis-ci.org/bengreenier/baseball)

simplified runtime requirements

# What?

A quick way to determine if values are set at runtime - think `assert()` but better.

# How?

Just `npm install baseball`

## Use

Quickly:
```
var baseball = require('baseball');

// require process.env.PORT to be set
baseball("PORT");

// will write "missing PORT" to stderr
```

With any object:
```
var baseball = require('baseball');

// requires {} to have property sports
baseball({}, "sports");
```

With immediate throwing:
```
var baseball = require('baseball');

// requires {} to have property sports, and throws when it doesn't
baseball({}, "sports", {immediate: true});
```

## API

+ baseball.defaults() - returns the default arguments
+ baseball.defaults({}) - overrides default argument(s)
+ baseball.handle(function(){}) - overrides default argument `handler`
+ baseball(rootObject, propertyName, options) - checks for `propertyName` on `rootObject` and overrides options


Default arguments
```
immediate: false, // do we check existence on function call and throw if not found?
message: "Missing %s", // error message sprintf format string
delayMs: 2000, // delay to use when checking for failures when immedate == false
returnCode: null, // return code to use when using default handler (will process.exit)
handler: function (errors) { // default handler that creates an error out of all errors and writes it to stderr
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
```

# License

MIT