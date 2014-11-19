var ModuleTestBinaryPacker0x0002 = (function(global) {

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;

return new Test("BinaryPacker0x0002", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true, // test the primary module and secondary module
    }).add([
        testBinaryPacker0x0002,
    ]).run().clone();

function testBinaryPacker0x0002(test, pass, miss) {

    var formatID = 0x0002; // APNGFrameData
    var source = {
            x: 1, y: 2, w: 101, h: 102,
            delay: 16.666, blend: 4, dispose: 5,
            pixels: new Uint8Array([1,2,3,4,5])
        };

    var packed = BinaryPacker.pack(source, formatID);
    var result = BinaryPacker.unpack(packed);
    var bytes  = BinaryPacker.getBytes(source, formatID);

    if (source.x === result.x &&
        source.y === result.y &&
        source.w === result.w &&
        source.h === result.h &&
        source.delay.toFixed(2) === result.delay.toFixed(2) &&
        source.blend === result.blend &&
        source.dispose === result.dispose &&
        source.pixels[0] === result.pixels[0] &&
        source.pixels[1] === result.pixels[1] &&
        source.pixels[2] === result.pixels[2] &&
        source.pixels[3] === result.pixels[3] &&
        source.pixels[4] === result.pixels[4]) {

        if (bytes === 22 + source.pixels.length) {
            test.done(pass());
            return;
        }
    }
    test.done(miss());
}

})((this || 0).self || global);


