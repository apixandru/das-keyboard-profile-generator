function deselectAll(selected, inst) {
    for (const el of selected) {
        deselectElement(el);
        inst.removeFromSelection(el);
    }
    inst.clearSelection();
}

function deselectElement(el) {
    let allColor = all_colors[el.attributes['data-skbtn'].nodeValue];
    el.style['color'] = allColor.color;
    el.style['background-color'] = 'rgba(0, 0, 0, 0.5)';
    el.classList.remove('selected');
}

function selectElement(el) {
    let allColor = all_colors[el.attributes['data-skbtn'].nodeValue];
    el.style['background-color'] = allColor.color;
    el.style['color'] = allColor.inverse;
    el.classList.add('selected');
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
        selectElement(el);
    }

    // Remove the class from elements that where removed
    // since the last selection
    for (const el of removed) {
        deselectElement(el);
    }

}).on('stop', ({inst}) => {
    inst.keepSelection();
}).on('beforestart', ({inst, selected}) => {
    deselectAll(selected, inst);
});
