function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function rgbToHex(r, g, b) {
    return padHex(r) + padHex(g) + padHex(b);
}

function removeHash(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    return hex;
}

function flipByte(hex, start, end) {
    const hexByte = hex.slice(start, end);
    return 255 - parseInt(hexByte, 16);
}

function invertRgbHex(hex) {
    const r = flipByte(hex, 0, 2),
        g = flipByte(hex, 2, 4),
        b = flipByte(hex, 4, 6);
    return rgbToHex(r, g, b);
}

function padHex(str) {
    return ('0' + str.toString(16))
        .slice(-2);
}

