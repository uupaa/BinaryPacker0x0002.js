# BinaryPacker0x0002.js [![Build Status](https://travis-ci.org/uupaa/BinaryPacker0x0002.js.png)](http://travis-ci.org/uupaa/BinaryPacker0x0002.js)

[![npm](https://nodei.co/npm/uupaa.binarypacker0x0002.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.binarypacker0x0002.js/)

APNGFrameData pack/unpack for BinaryPacker.js

## Document

- [BinaryPacker0x0002.js wiki](https://github.com/uupaa/BinaryPacker0x0002.js/wiki/BinaryPacker0x0002)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)

## How to use

### Browser

```js
<script src="lib/BinaryPacker.js"></script>
<script src="lib/BinaryPacker0x0002.js"></script>
<script>

var formatID = 0x0002; // APNGFrameData
var source = {
        x: 1, y: 2, w: 101, h: 102,
        delay: 16.666, blend: 4, dispose: 5,
        pixels: new Uint8Array([1,2,3,4,5])
    };

var packed = BinaryPacker.pack(source, formatID);
var result = BinaryPacker.unpack(packed);

if ( source.x === result.x &&
     source.y === result.y &&
     source.w === result.w &&
     source.h === result.h) {
    console.log("OK");
} else {
    console.log("ERROR");
}
</script>
```

### WebWorkers

```js
importScripts("lib/BinaryPacker.js");
importScripts("lib/BinaryPacker0x0002.js");

...
```

### Node.js

```js
var BinaryPacker = require("lib/BinaryPacker.js");
var BinaryPacker0x0002 = require("lib/BinaryPacker0x0002.js");

...
```
