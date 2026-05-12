import {
    createMarker,
    createLabel
} from './markers.js';

export function renderMap(layout, filters) {

    const image =
        document.getElementById('mapImage');

    const overlay =
        document.getElementById('overlay');

    const viewer =
        document.getElementById('viewer');

    image.src = layout.image.full;

    // Set viewer size to match image
    viewer.style.width = `${layout.image.width}px`;
    viewer.style.height = `${layout.image.height}px`;

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