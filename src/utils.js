function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

function arrayBufferToBase64(bytes) {
    let binary = '';
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function rgbToHex(r, g, b) {
    return padHex(r) + padHex(g) + padHex(b);
}

function removeHash(hex) {
    if (hex.indexOf('#') === 0) {
        return hex.slice(1);
    }
    return hex;
}

function extractByte(hex, start, end) {
    const hexByte = hex.slice(start, end);
    return parseInt(hexByte, 16);
}

function invertRgbHex(hex) {
    const bytes = extractRgb(hex);
    return rgbToHex(
        255 - bytes.red,
        255 - bytes.green,
        255 - bytes.blue
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
