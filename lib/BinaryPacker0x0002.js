(function(global) {
"use strict";

// --- dependency modules ----------------------------------
var BinaryPacker = global["BinaryPacker"];

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
function BinaryPacker0x0002() {
}

//{@dev
BinaryPacker0x0002["repository"] = "https://github.com/uupaa/BinaryPacker0x0002.js"; // GitHub repository URL. http://git.io/Help
//}@dev

BinaryPacker0x0002["getSize"] = BinaryPacker0x0002_getSize; // BinaryPacker0x0002.getSize(source:Any):Integer
BinaryPacker0x0002["pack"]    = BinaryPacker0x0002_pack;    // BinaryPacker0x0002.pack(source:Any):Uint8Array
BinaryPacker0x0002["unpack"]  = BinaryPacker0x0002_unpack;  // BinaryPacker0x0002.unpack(source:Uint8Array, header:Object = null):Any

// --- implements ------------------------------------------
function BinaryPacker0x0002_getSize(source) { // @arg Object - { x, y, w, h, delay, blend, dispose, pixels }
                                              // @ret Integer
// header
//  | size | keyword    | value                               |
//  |------|------------|-------------------------------------|
//  | 2    | signature  | "BP"       [0x42, 0x50]             |
//  | 2    | formatID   | 0x0002     [0x00, 0x02]             |
//  | 4    | bodyLength | 0xaabbccdd [0xaa, 0xbb, 0xcc, 0xdd] |
//
// body
//  | size | keyword    |                                     |
//  |------|------------|-------------------------------------|
//  | 2    | x          | 0 ~ 65535                           | --+
//  | 2    | y          | 0 ~ 65535                           |   |
//  | 2    | w          | 0 ~ 65535                           |   |
//  | 2    | h          | 0 ~ 65535                           |   +-- 14 bytes
//  | 4    | delay      | 16.5678ms -> 16567                  |   |
//  | 1    | blend      | blend mode                          |   |
//  | 1    | dispose    | dispose mode                        | --+
//  | ?    | pixels     | pixel data                          |
//
    var headerSize = 8; // signature + formatID + bodyLength
    var bodyLength = 14 + source["pixels"].length;

    return headerSize + bodyLength;
}

function BinaryPacker0x0002_pack(source) { // @arg Object - { x, y, w, h, delay, blend, dispose, pixels }
                                           // @ret Uint8Array
//{@dev
    $valid($type(source, "Object"), BinaryPacker0x0002_pack, "source");
//}@dev

    var bodyLength = 14 + source["pixels"].length;
    var result = new Uint8Array(BinaryPacker0x0002_getSize(source));
    var x = source["x"];
    var y = source["y"];
    var w = source["w"];
    var h = source["h"];
    var delay   = (source["delay"] * 1000) | 0; // 16.5678ms -> 16567
    var blend   = source["blend"];
    var dispose = source["dispose"];

    var data = [
            // --- header ---
            0x42, 0x50,             // signature
            0x00, 0x02,             // formatID
            (bodyLength >>> 24) & 0xff,
            (bodyLength >>  16) & 0xff,
            (bodyLength >>   8) & 0xff,
             bodyLength         & 0xff,
            // --- body ---
            (x >> 8) & 0xff, x & 0xff,
            (y >> 8) & 0xff, y & 0xff,
            (w >> 8) & 0xff, w & 0xff,
            (h >> 8) & 0xff, h & 0xff,
            (delay >>> 24) & 0xff,
            (delay >>  16) & 0xff,
            (delay >>   8) & 0xff,
             delay         & 0xff,
             blend,
             dispose
        ];
    result.set(data);
    result.set(source["pixels"], data.length);

    return result;
}

function BinaryPacker0x0002_unpack(source,   // @arg Uint8Array
                                   header) { // @arg Object = null
                                             // @ret Object - { x, y, w, h, delay, blend, dispose, pixels }
//{@dev
    $valid($type(source, "Uint8Array"),  BinaryPacker0x0002_unpack, "source");
    $valid($type(header, "Object|null"), BinaryPacker0x0002_unpack, "header");
//}@dev

    header = header || BinaryPacker["readHeader"](source);
    if (header && header["formatID"] === 0x0002) {

        var cursor = header["cursor"];
        var x = source[cursor++] << 8 | source[cursor++];
        var y = source[cursor++] << 8 | source[cursor++];
        var w = source[cursor++] << 8 | source[cursor++];
        var h = source[cursor++] << 8 | source[cursor++];
        var delay = ((source[cursor++] << 24 | source[cursor++] << 16 |
                      source[cursor++] <<  8 | source[cursor++]) >>> 0) / 1000; // 16567 -> 16.567
        var blend   = source[cursor++];
        var dispose = source[cursor++];
        var pixels  = source.subarray(cursor);

        return { "x": x, "y": y, "w": w, "h": h,
                 "delay": delay, "blend": blend, "dispose": dispose,
                 "pixels": pixels };
    }
    throw new TypeError("unsupported format");
}

// --- validate / assertions -------------------------------
//{@dev
function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = BinaryPacker0x0002;
}
global["BinaryPacker0x0002" in global ? "BinaryPacker0x0002_" : "BinaryPacker0x0002"] = BinaryPacker0x0002; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule


