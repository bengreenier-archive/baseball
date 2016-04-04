baseball
===========

[![Build Status](https://travis-ci.org/bengreenier/baseball.svg?branch=master)](https://travis-ci.org/bengreenier/baseball)

provides simplified promise error handling

# How?

## Install

> Note: this isn't production ready yet!

Just `npm install baseball`

## Use

With Promises:
```
var baseball = require('baseball')();

var throwAPitch = new Promise(function (resolve, reject) {
  reject(new Error("sports are hard"));
});

// automatically catches and logs to console.error
// Error: sports are hard
//
throwAPitch.catch(baseball);
```

With options (messagePrefix):
```
var baseball = require('baseball')("PREPEND ME: ");

var throwAPitch = new Promise(function (resolve, reject) {
  reject(new Error("everything is awful"));
});

// automatically catches and logs to console.error
// PREPEND ME: Error: everything is awful
//
throwAPitch.catch(baseball);
```

With options (logger):
```
var baseball = require('baseball')(bunyan.error);

var throwAPitch = new Promise(function (resolve, reject) {
  reject(new Error("everything is awful"));
});

// automatically catches and logs to bunyan
// Error: everything is awful
//
throwAPitch.catch(baseball);
```

With explicit options:
```
var baseball = require('baseball')({messagePrefix: "PREPEND ME: ", logger: bunyan.error});

var throwAPitch = new Promise(function (resolve, reject) {
  reject(new Error("everything is awful"));
});

// automatically catches and logs to bunyan
// PREPEND ME: Error: everything is awful
//
throwAPitch.catch(baseball);
```

# Why?

Why not - sometimes even the simple things could be simplier. Ya know, for lazy people.

# License?

MIT LICENSE
