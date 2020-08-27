function deselectAll(selected, inst) {
    for (const el of selected) {
        el.classList.remove('selected');
        inst.removeFromSelection(el);
    }
    inst.clearSelection();
}

Selection.create({
    class: 'selection',
    selectables: ['.hg-button', '.pipeLeft', '.pipeRight'],
    boundaries: ['.keyboard']
}).on('start', ({inst, selected, oe}) => {
    // Remove class if the user isn't pressing the control key or ⌘ key
    if (!oe.ctrlKey && !oe.metaKey) {
        deselectAll(selected, inst);
    }
}).on('move', ({changed: {removed, added}}) => {
    // Add a custom class to the elements that where selected.
    for (const el of added) {
        el.classList.add('selected');
    }

    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
        el.classList.remove('selected');
    }

}).on('stop', ({inst}) => {
    inst.keepSelection();
}).on('beforestart', ({inst, selected}) => {
    deselectAll(selected, inst);
});
