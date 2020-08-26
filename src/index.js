let Keyboard = window.SimpleKeyboard.default;

let commonKeyboardOptions = {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default myTheme1",
    physicalKeyboardHighlight: false,
    syncInstanceInputs: true,
    mergeDisplay: true,
    debug: false
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

document.querySelector(".input").addEventListener("input", event => {
    let input = document.querySelector(".input").value;
    keyboard.setInput(input);
});


function onChange(input) {
    document.querySelector(".input").value = input;
    keyboard.setInput(input);

    console.log("Input changed", input);
}

function onKeyPress(button) {
    console.log(button);
}

document.addEventListener("keydown", event => {
    // console.log(event);
    // event.preventDefault();
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
                .map(e => e.replace('0x', '')) // remove hex part
                .forEach(byte => bytes.push(byte));
        }
    }

    const elementsByKeys = pcks;
    Object.keys(keyEnums)
        .forEach(key => {
            let keyEnum = keyEnums[key];
            let color = packages[keyEnum.rg][keyEnum.rv] + packages[keyEnum.bg][keyEnum.bv] + packages[keyEnum.gg][keyEnum.gv]
            // console.log(key + ': ' + color);
            const element = elementsByKeys[keyEnum.key];
            setKeyColor(element, color, keyEnum);
        });
}

function setKeyColor(element, color, keyEnum) {
    if (!element) {
        console.log('cannot find key');
        console.log(keyEnum);
    } else {
        element.style['color'] = `#${color}`;
        const defaultBoxShadow = defaultBoxShadows[element.attributes['data-skbtn'].nodeValue] || '0 0 3px';
        element.style['box-shadow'] = `${defaultBoxShadow} #${color}`;
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

const defaultBoxShadows = {
    '{pipeleft}': '10px 0 10px',
    '{piperight}': '-10px 0 10px',
}


let profileElements = document.getElementById('profiles');
Object.keys(profiles)
    .forEach(e => profileElements.add(new Option(e, profiles[e])));
