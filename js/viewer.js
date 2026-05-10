import {
    loadLayout
} from './maps.js';

import {
    renderMap
} from './renderer.js';

import {
    createToolbar
} from './toolbar.js';

const state = {

    filters: {
        securityDoor: true,
        dataPort: true,
        terminal: true,
        elevator: true,
        alarmPanel: true,
        loot: true
    },

    layout: null
};

async function initialize() {

    const params =
        new URLSearchParams(window.location.search);

    const className = params.get('class');

    const mapId = params.get('map');

    state.layout = await loadLayout(
        className,
        mapId
    );
    updateHeading();

    createToolbar(
        state.filters,
        onFilterChanged
    );

    render();
}

function render() {

    renderMap(
        state.layout,
        state.filters
    );
}

function updateHeading() {

    const heading =
        document.getElementById('layoutHeading');

    if (!heading) {
        return;
    }

    const layoutName =
        state.layout?.name || 'Settlement Viewer';

    heading.textContent =
        layoutName;

    document.title =
        `${layoutName} - Settlement Viewer`;
}

function onFilterChanged(type) {

    state.filters[type] =
        !state.filters[type];

    render();
}

initialize();