(function () {
function loadIndex() {
    return globalThis.ODYSSEY_MAP_DATA.index;
}

function loadLayout(
    className,
    layoutId
) {

    return globalThis.ODYSSEY_MAP_DATA.layouts[`${className}/${layoutId}`] || null;
}

globalThis.OdysseyMaps = globalThis.OdysseyMaps || {};
Object.assign(globalThis.OdysseyMaps, { loadIndex, loadLayout });
})();