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

    const setViewerSize = () => {
        const originalWidth = image.naturalWidth || layout.image.width || 1;
        const originalHeight = image.naturalHeight || layout.image.height || 1;

        viewer.style.width = `${image.offsetWidth}px`;
        viewer.style.height = `${image.offsetHeight}px`;

        overlay.innerHTML = '';

        layout.markers.forEach(marker => {
            if (!filters[marker.type]) {
                return;
            }

            const element = createMarker(marker, originalWidth, originalHeight);
            overlay.appendChild(element);
        });

        if (layout.labels) {
            layout.labels.forEach(label => {
                const element = createLabel(label, originalWidth, originalHeight);
                overlay.appendChild(element);
            });
        }
    };

    let hasRendered = false;
    const onLoad = () => {
        if (hasRendered) {
            return;
        }

        hasRendered = true;
        setViewerSize();
        image.onload = null;
    };

    image.onload = onLoad;
    image.src = layout.image.full;

    if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
        onLoad();
    }
}