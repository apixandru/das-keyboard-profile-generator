let Keyboard = window.SimpleKeyboard.default;

let commonKeyboardOptions = {
    theme: "simple-keyboard hg-theme-default",
    mergeDisplay: true
};

let keyboard = new Keyboard(".simple-keyboard-main", {
    ...commonKeyboardOptions,
    /**
     * Layout by:
     * Sterling Butters (https://github.com/SterlingButters)
     */
    layout: {
        default: [
            "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
            "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
            "{tab} q w e r t y u i o p [ ] \\",
            "{capslock} a s d f g h j k l ; ' {enter}",
            "{shiftleft} z x c v b n m , . / {shiftright}",
            "{controlleft} {metaleft} {altleft} {space} {altright} {fn} {contextmenu} {controlright}"
        ]
    },
    display: {
        "{escape}": "esc",
        "{tab}": "⇥",
        "{backspace}": "⌫",
        "{enter}": "enter ↵",
        "{capslock}": "caps ⇪",
        "{shiftleft}": "shift ⇧",
        "{shiftright}": "shift ⇧",
        "{controlleft}": "ctrl",
        "{controlright}": "ctrl",
        "{altleft}": "alt",
        "{altright}": "alt",
        "{metaleft}": "win",
        "{fn}": "fn",
        "{metaright}": "alt",
        "{contextmenu}": "menu"
    }
});

let keyboardControlPad = new Keyboard(".simple-keyboard-control", {
    ...commonKeyboardOptions,
    layout: {
        default: [
            "{prtscr} {scrolllock} {pause}",
            "{insert} {home} {pageup}",
            "{delete} {end} {pagedown}"
        ]
    }
});

let keyboardArrows = new Keyboard(".simple-keyboard-arrows", {
    ...commonKeyboardOptions,
    layout: {
        default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
    }
});

let keyboardNumPad = new Keyboard(".simple-keyboard-numpad", {
    ...commonKeyboardOptions,
    layout: {
        default: [
            "{light} {mediaplaypause} {mediatracknext}",
            "{numlock} {numpaddivide} {numpadmultiply}",
            "{numpad7} {numpad8} {numpad9}",
            "{numpad4} {numpad5} {numpad6}",
            "{numpad1} {numpad2} {numpad3}",
            "{numpad0} {numpaddecimal}"
        ]
    },
    display: {
        "{light}": "☆",
        "{mediaplaypause}": "⏯",
        "{mediatracknext}": "⏭",
        "{volume-wheel}": "◌"
    }
});

let keyboardNumPadEnd = new Keyboard(".simple-keyboard-numpadEnd", {
    ...commonKeyboardOptions,
    layout: {
        default: ["{volume-wheel}", "{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
    },
    display: {
        "{volume-wheel}": "◌"
    }
});

function profileSelected(elem) {
    let selectedElement = elem[elem.selectedIndex].value;
    document.querySelector('textarea').value = selectedElement;
    shoes(selectedElement);
}

function shoes(value) {

    let pcks = precomputePackages();
    Object.keys(pcks)
        .forEach(pck => setKeyColor(pcks[pck], '000'));

    let packages = base64ToArrayBuffer(value);

    const elementsByKeys = pcks;
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            let color = rgbToHex(
                packages[keyEnum.rg * 64 + keyEnum.rv],
                packages[keyEnum.bg * 64 + keyEnum.bv],
                packages[keyEnum.gg * 64 + keyEnum.gv]);

            console.log(keyEnum.key + '  ' + color)
            let allColors = all_colors[keyEnum.key];
            if (allColors) {
                allColors.color = color;
                allColors.inverse = invertRgbHex(color);
            }
            const element = elementsByKeys[keyEnum.key];
            setKeyColor(element, color, keyEnum);
        });
}

function setKeyColor(element, color, keyEnum) {
    if (!element) {
        console.log('cannot find key');
        console.log(keyEnum);
        return;
    }
    element.style['color'] = `#${color}`;
    const defaultBoxShadow = defaultBoxShadows[extractKey(element)] || '0 0 3px';
    element.style['box-shadow'] = `${defaultBoxShadow} #${color}`;
    if (element.classList.contains('selected')) {
        selectElement(element);
    }
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
    let map = [...element1]
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
Object.keys(profiles)
    .forEach(e => profileElements.add(new Option(e, profiles[e])));

all_colors = colors();

let pcks = precomputePackages();
Object.keys(pcks)
    .forEach(pck => setKeyColor(pcks[pck], 'fff'));

function colorChanged(what) {
    let newColor = removeHash(what.value);
    console.log(newColor);
    let elementNodeListOf = document.querySelectorAll('.selected');
    [...elementNodeListOf]
        .forEach(element => {
            const keyEnum = extractKey(element);
            let allColors = all_colors[keyEnum];
            if (allColors) {
                allColors.color = newColor;
                allColors.inverse = invertRgbHex(newColor);
            }
            setKeyColor(element, newColor, keyEnum);
        });


}
