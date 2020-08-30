function setupKeyboard() {
    let Keyboard = window.SimpleKeyboard.default;

    let commonKeyboardOptions = {
        theme: "simple-keyboard hg-theme-default",
        mergeDisplay: true
    };

    new Keyboard(".simple-keyboard-main", {
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

    new Keyboard(".simple-keyboard-control", {
        ...commonKeyboardOptions,
        layout: {
            default: [
                "{prtscr} {scrolllock} {pause}",
                "{insert} {home} {pageup}",
                "{delete} {end} {pagedown}"
            ]
        }
    });

    new Keyboard(".simple-keyboard-arrows", {
        ...commonKeyboardOptions,
        layout: {
            default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
        }
    });

    new Keyboard(".simple-keyboard-numpad", {
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

    new Keyboard(".simple-keyboard-numpadEnd", {
        ...commonKeyboardOptions,
        layout: {
            default: ["{volume-wheel}", "{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
        },
        display: {
            "{volume-wheel}": "◌"
        }
    });
}

function setupKeySelection(selectElement, deselectElement) {
    function deselectAll(selected, inst) {
        for (const el of selected) {
            deselectElement(el);
            inst.removeFromSelection(el);
        }
        inst.clearSelection();
        redraw();
    }

    function deselectAllUnlessCtrlPressed(inst, selected, oe) {
        if (!oe.ctrlKey && !oe.metaKey) {
            deselectAll(selected, inst);
        }
    }

    Selection.create({
        class: 'selection',
        selectables: ['.hg-button', '.pipeLeft', '.pipeRight'],
        boundaries: ['.keyboard']
    }).on('beforestart', ({inst, selected, oe}) => {
        deselectAllUnlessCtrlPressed(inst, selected, oe)
    }).on('stop', ({inst}) => {
        inst.keepSelection();
    }).on('move', ({changed: {removed, added}}) => {
        added.forEach(addedElement => selectElement(addedElement));
        removed.forEach(removedElement => deselectElement(removedElement));
        redraw();
    });
}
