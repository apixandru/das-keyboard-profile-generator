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

function flipByte(byte) {
    return 255 - byte;
}

function extractByte(hex, start, end) {
    const hexByte = hex.slice(start, end);
    return parseInt(hexByte, 16);
}

function invertRgbHex(hex) {
    const bytes = extractRgb(hex);
    return rgbToHex(
        flipByte(bytes.red),
        flipByte(bytes.green),
        flipByte(bytes.blue)
    );
}

function extractRgb(hex) {
    return {
        red: extractByte(hex, 0, 2),
        green: extractByte(hex, 2, 4),
        blue: extractByte(hex, 4, 6)
    };
}

function padHex(str) {
    return ('0' + str.toString(16))
        .slice(-2);
}

