baseball
===========
provides simplified promise error handling

# How?

## Install

> Note: this isn't production ready yet!

Just `npm install baseball`

## Use

```
var baseball = require('baseball');

new baseball.promise(function (resolve, reject) {
  reject(new Error("everything is awful"));
});

// automatically catches and logs to console.error
// ERR: everything is awful
// and then rethrows (optionally)
```

# Why?

Why not - sometimes even the simple things could be simplier. Ya know, for lazy people.

# License?

MIT LICENSE
