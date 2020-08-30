function deselectAll(selected, inst) {
    for (const el of selected) {
        deselectElement(el);
        inst.removeFromSelection(el);
    }
    inst.clearSelection();
    redraw();
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
