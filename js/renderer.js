import {
    createMarker,
    createLabel
} from './markers.js';

export function renderMap(layout, filters) {

    const image =
        document.getElementById('mapImage');

    const overlay =
        document.getElementById('overlay');

    image.src = layout.image.full;

    overlay.innerHTML = '';

    layout.markers.forEach(marker => {

        if (!filters[marker.type]) {
            return;
        }

        const element = createMarker(marker);

        overlay.appendChild(element);
    });

    if (layout.labels) {
        layout.labels.forEach(label => {
            const element = createLabel(label);
            overlay.appendChild(element);
        });
    }
}