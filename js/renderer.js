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

        const maxWidth = Math.max(1, window.innerWidth - 20);
        const maxHeight = Math.max(1, window.innerHeight - 20);
        const widthScale = originalWidth > 0 ? maxWidth / originalWidth : 1;
        const heightScale = originalHeight > 0 ? maxHeight / originalHeight : 1;
        const scale = Math.min(1, widthScale, heightScale);

        const renderedWidth = Math.max(1, Math.round(originalWidth * scale));
        const renderedHeight = Math.max(1, Math.round(originalHeight * scale));

        image.style.width = `${renderedWidth}px`;
        image.style.height = `${renderedHeight}px`;
        viewer.style.width = `${renderedWidth}px`;
        viewer.style.height = `${renderedHeight}px`;

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