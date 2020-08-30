function buildBaseProfile() {
    var bytes = new Uint8Array(1600);
    var groups = [
        [15, 3], [14, 3], [10, 8], [13, 3], [9, 8]
    ];
    var total = 0;
    for (let groupsI = 0; groupsI < groups.length; groupsI++) {
        const group = groups[groupsI];
        for (let i = 0; i < group[1]; i++) {
            const startIndex = total++ * 64;
            bytes[startIndex] = 7;
            bytes[startIndex + 1] = group[0];
            bytes[startIndex + 2] = 6;
            bytes[startIndex + 3] = i;
        }
    }
    return bytes;
}

function buildProfileAllKeys(color) {
    let profile = buildBaseProfile();
    let rgb = extractRgb(color);
    Object.keys(keyEnums)
        .map(e => keyEnums[e])
        .forEach(e => {
            profile[e.red] = rgb.red;
            profile[e.green] = rgb.green;
            profile[e.blue] = rgb.blue;
        });
    return profile;
}
