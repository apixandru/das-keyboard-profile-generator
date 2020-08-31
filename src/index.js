setupKeyboard();
setupKeySelection(selectElement, deselectElement);

const defaultBoxShadows = {
    '{pipeleft}': '10px 0 10px',
    '{piperight}': '-10px 0 10px',
}

let profileElements = document.getElementById('profiles');
Object.keys(builtinProfiles)
    .forEach(e => profileElements.add(new Option(e, builtinProfiles[e])));

all_colors = colors();
elements_by_keys = precomputePackages();

function colors() {
    const elementsByKeys = {};
    let element1 = document.querySelectorAll(`[data-skbtn]`);
    [...element1]
        .forEach(e => elementsByKeys[extractKey(e)] = {
            color: 'ffffff',
            inverse: '000000'
        });
    return elementsByKeys;
}

function deselectElement(el) {
    el.classList.remove('selected');
}

function isSelected(element) {
    return element.classList.contains('selected');
}

function selectElement(el) {
    el.classList.add('selected');
}

function setProfileText(profileText) {
    document.querySelector('textarea').value = profileText;
    setProfileFromText(profileText);
}

function setProfileBytes(bytes) {
    document.querySelector('textarea').value = arrayBufferToBase64(bytes);
    interpretProfileBytes(bytes);
}

function profileSelected(elem) {
    let selectedElement = elem[elem.selectedIndex].value;
    setProfileText(selectedElement);
}

function setProfileFromText(value) {
    interpretProfileBytes(base64ToArrayBuffer(value));
}

function interpretProfileBytes(bytes) {
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            let color = rgbToHex(
                bytes[keyEnum.red],
                bytes[keyEnum.green],
                bytes[keyEnum.blue]);

            let colorsForKey = all_colors[keyEnum.key];
            if (colorsForKey) {
                colorsForKey.color = color;
                colorsForKey.inverse = invertRgbHex(color);
            }
        });
    redraw();
}

function setKeyColor(element, colorsForKey) {
    const defaultBoxShadow = defaultBoxShadows[extractKey(element)] || '0 0 5px';
    if (isSelected(element)) {
        element.style['background-color'] = 'rgba(255, 255, 255, 0.1)';
        element.style['border'] = `1px solid #${colorsForKey.color}`;
    } else {
        element.style['background-color'] = 'rgba(0, 0, 0, 0.5)';
        element.style['border'] = `1px solid #00000000`;
    }
    element.style['box-shadow'] = `${defaultBoxShadow} #${colorsForKey.color}`;
    element.style['color'] = colorsForKey.color;
}

function redraw() {
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            const element = elements_by_keys[keyEnum.key];
            if (element) {
                setKeyColor(element, all_colors[keyEnum.key]);
            } else {
                console.log('cannot find ' + keyEnum.key);
            }
        });
}

function precomputePackages() {
    const elementsByKeys = {};
    let colorable = document.querySelectorAll(`[data-skbtn]`);
    [...colorable]
        .forEach(e => {
            elementsByKeys[extractKey(e)] = e;
        });
    return elementsByKeys;
}

function extractKey(element) {
    return element.attributes['data-skbtn'].nodeValue;
}

function applyColorToProfile(currentKey, color, profile) {
    // active
    profile[currentKey.red] = color.red;
    profile[currentKey.green] = color.green;
    profile[currentKey.blue] = color.blue;

    // passive
    profile[currentKey.red + 704] = color.red;
    profile[currentKey.green + 704] = color.green;
    profile[currentKey.blue + 704] = color.blue;
}

function colorChanged(hashedColor) {
    const newColor = removeHash(hashedColor);

    // TODO store current profile in variable to prevent all this parsing
    const currentProfileAsText = document.querySelector('textarea').value;
    const profile = base64ToArrayBuffer(currentProfileAsText);

    const selectedKeys = [...document.querySelectorAll('.selected')]
        .map(e => extractKey(e));

    const color = extractRgb(newColor);

    Object.keys(keyEnums)
        .map(e => keyEnums[e])
        .filter(e => selectedKeys.includes(e.key))
        .forEach(currentKey => applyColorToProfile(currentKey, color, profile));

    setProfileBytes(profile);
}

function setAllKeyColorsTo(color) {
    setProfileBytes(buildProfileAllKeys(color));
}

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

function buildBaseProfile() {
    var bytes = new Uint8Array(1600);
    var total = 0;
    for (const group of [[15, 3], [14, 3], [10, 8], [13, 3], [9, 8]]) {
        for (let i = 0; i < group[1]; i++) {
            const startIndex = total++ * 64;
            bytes[startIndex] = 7;
            bytes[startIndex + 1] = group[0];
            bytes[startIndex + 2] = 6;
            bytes[startIndex + 3] = i;
        }
    }
    return bytes;
}

function buildProfileAllKeys(colorHex) {
    const profile = buildBaseProfile();
    const color = extractRgb(colorHex);
    Object.keys(keyEnums)
        .map(e => keyEnums[e])
        .forEach(currentKey => applyColorToProfile(currentKey, color, profile));
    return profile;
}

setAllKeyColorsTo('ffffff');
