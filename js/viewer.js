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
        securityDoor: false,
        dataPort: true,
        terminal: false,
        power: false,
        alarmPanel: true,
        container: true,
        hint: false
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

    // Set toolbar position
    const toolbar = document.getElementById('toolbar');
    const position = state.layout.toolbarPosition || 'bottom-left';
    if (position === 'bottom-center') {
        toolbar.style.left = '50%';
        toolbar.style.transform = 'translateX(-50%)';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.right = 'auto';
        toolbar.style.flexDirection = 'row';
    } else if (position === 'bottom-right') {
        toolbar.style.right = '20px';
        toolbar.style.left = 'auto';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.flexDirection = 'row';
    } else if (position === 'left-vertical') {
        toolbar.style.left = '20px';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.right = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.flexDirection = 'column';
    } else if (position === 'right-vertical') {
        toolbar.style.right = '20px';
        toolbar.style.left = 'auto';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.flexDirection = 'column';
    } else {
        // bottom-left
        toolbar.style.left = '20px';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.right = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.flexDirection = 'row';
    }

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