import {
    loadIndex,
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
        airlock: true,
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

    const currentIndex = await loadIndex();

    state.layout = await loadLayout(
        className,
        mapId
    );

    if (!state.layout) {
        console.error('Failed to load layout');
        return;
    }
    updateHeading();

    createToolbar(
        state.filters,
        onFilterChanged,
        className,
        mapId,
        currentIndex
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
    } else if (position === 'left-vertical') {
        toolbar.style.left = '20px';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.right = 'auto';
        toolbar.style.transform = 'none';
        toolbar.style.flexDirection = 'column';
    } else if (position === 'right-vertical') {
        toolbar.style.right = '20px';
        toolbar.style.bottom = '20px';
        toolbar.style.top = 'auto';
        toolbar.style.left = 'auto';
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

    positionMarkerKey(state.layout.keyPosition || 'top-right');

    render();
}

function positionMarkerKey(position) {
    const key = document.getElementById('markerKey');
    if (!key) {
        return;
    }

    key.style.top = 'auto';
    key.style.bottom = 'auto';
    key.style.left = 'auto';
    key.style.right = 'auto';
    key.style.transform = 'none';

    switch (position) {
        case 'top-left':
            key.style.top = '20px';
            key.style.left = '20px';
            break;
        case 'top-right':
            key.style.top = '20px';
            key.style.right = '20px';
            break;
        case 'bottom-left':
            key.style.bottom = '20px';
            key.style.left = '20px';
            break;
        case 'bottom-center':
            key.style.bottom = '20px';
            key.style.left = '50%';
            key.style.transform = 'translateX(-50%)';
            break;
        case 'bottom-right':
            key.style.bottom = '20px';
            key.style.right = '20px';
            break;
        case 'left-vertical':
            key.style.bottom = '20px';
            key.style.left = '20px';
            break;
        case 'right-vertical':
            key.style.bottom = '20px';
            key.style.right = '20px';
            break;
        default:
            key.style.top = '20px';
            key.style.right = '20px';
    }
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