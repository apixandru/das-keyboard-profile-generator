function deselectAll(selected, inst) {
    for (const el of selected) {
        deselectElement(el);
        inst.removeFromSelection(el);
    }
    inst.clearSelection();
}

function deselectElement(el) {
    let allColor = all_colors[extractKey(el)];
    el.style['color'] = allColor.color;
    el.style['background-color'] = 'rgba(0, 0, 0, 0.5)';
    el.classList.remove('selected');
}

function selectElement(el) {
    let allColor = all_colors[extractKey(el)];
    el.style['background-color'] = allColor.color;
    el.style['color'] = allColor.inverse;
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
});
