let Keyboard = window.SimpleKeyboard.default;

let commonKeyboardOptions = {
    onChange: input => onChange(input),
    onKeyPress: button => onKeyPress(button),
    theme: "simple-keyboard hg-theme-default hg-layout-default myTheme1",
    physicalKeyboardHighlight: true,
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

function shoes(value) {
    let lines = value.split('\n')
        .filter(e => !e.endsWith('.'));
    for (const line of lines) {
        console.log(line)
    }
}
