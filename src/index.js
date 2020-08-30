setupKeyboard();
setupKeySelection(selectElement, deselectElement);

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
    parseProfileText(profileText);
}

function setRawProfile(bytes) {
    document.querySelector('textarea').value = arrayBufferToBase64(bytes);
    setProfileBytes(bytes);
}

function profileSelected(elem) {
    let selectedElement = elem[elem.selectedIndex].value;
    setProfileText(selectedElement);
}

function parseProfileText(value) {
    setProfileBytes(base64ToArrayBuffer(value));
}

function setProfileBytes(packages) {
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            let color = rgbToHex(
                packages[keyEnum.red],
                packages[keyEnum.green],
                packages[keyEnum.blue]);

            let allColors = all_colors[keyEnum.key];
            if (allColors) {
                allColors.color = color;
                allColors.inverse = invertRgbHex(color);
            }
        });
    redraw();
}

function setKeyColor(element, keyEnum, allColor) {
    if (!element) {
        console.log('cannot find ' + keyEnum.key);
        return;
    }
    const defaultBoxShadow = defaultBoxShadows[extractKey(element)] || '0 0 3px';
    if (isSelected(element)) {
        element.style['box-shadow'] = `${defaultBoxShadow} #${allColor.inverse}`;
        element.style['color'] = allColor.inverse;
        element.style['background-color'] = allColor.color;
    } else {
        element.style['box-shadow'] = `${defaultBoxShadow} #${allColor.color}`;
        element.style['color'] = allColor.color;
        element.style['background-color'] = 'rgba(0, 0, 0, 0.5)';
    }
}

function redraw() {
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            let allColors = all_colors[keyEnum.key];
            const element = elements_by_keys[keyEnum.key];
            setKeyColor(element, keyEnum, allColors);
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

const defaultBoxShadows = {
    '{pipeleft}': '10px 0 10px',
    '{piperight}': '-10px 0 10px',
}

let profileElements = document.getElementById('profiles');
Object.keys(builtinProfiles)
    .forEach(e => profileElements.add(new Option(e, builtinProfiles[e])));

all_colors = colors();
elements_by_keys = precomputePackages();

function colorChanged(hashedColor) {
    const newColor = removeHash(hashedColor);

    const profile = base64ToArrayBuffer(document.querySelector('textarea').value);

    const selectedKeys = [...document.querySelectorAll('.selected')]
        .map(e => extractKey(e));

    const rgb = extractRgb(newColor);

    Object.keys(keyEnums)
        .map(e => keyEnums[e])
        .filter(e => selectedKeys.includes(e.key))
        .forEach(e => {

            // active
            profile[e.red] = rgb.red;
            profile[e.green] = rgb.green;
            profile[e.blue] = rgb.blue;

            // passive
            profile[e.red + 704] = rgb.red;
            profile[e.green + 704] = rgb.green;
            profile[e.blue + 704] = rgb.blue;
        });

    setRawProfile(profile);
}

function setAllKeyColorsTo(color) {
    setRawProfile(buildProfileAllKeys(color));
}

setAllKeyColorsTo('ffffff');
