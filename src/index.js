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

    let lines = value.split('\n')
        .filter(e => !e.endsWith('.'));

    const packages = [];
    let bytes = [];
    for (const line of lines) {
        if (line === '') {
            if (bytes.length > 0) {
                packages.push(bytes);
                bytes = [];
            }
        } else {
            line.split(' ')
                .filter(e => e !== '')
                .forEach(byte => bytes.push(byte));
        }
    }

    const elementsByKeys = pcks;
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            let color = packages[keyEnum.rg][keyEnum.rv] + packages[keyEnum.bg][keyEnum.bv] + packages[keyEnum.gg][keyEnum.gv]
            let allColors = all_colors[keyEnum.key];
            if (allColors) {
                allColors.color = color;
                allColors.inverse = invertColor(color);
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
    const defaultBoxShadow = defaultBoxShadows[element.attributes['data-skbtn'].nodeValue] || '0 0 3px';
    element.style['box-shadow'] = `${defaultBoxShadow} #${color}`;
    if (element.classList.contains('selected')) {
        selectElement(element);
    }
}

function precomputePackages() {
    const elementsByKeys = {};
    let element1 = document.querySelectorAll(`[data-skbtn]`);
    let map = [...element1]
        .forEach(e => {
            elementsByKeys[e.attributes['data-skbtn'].nodeValue] = e;
        });
    return elementsByKeys;
}

function colors() {
    const elementsByKeys = {};
    let element1 = document.querySelectorAll(`[data-skbtn]`);
    let map = [...element1]
        .forEach(e => {
            elementsByKeys[e.attributes['data-skbtn'].nodeValue] = {
                color: 'ffffff',
                inverse: '000000'
            };
        });
    return elementsByKeys;
}

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
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

