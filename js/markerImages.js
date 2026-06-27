function normalizeImageValue(value) {
    if (typeof value !== 'string') {
        return '';
    }

    return value.trim();
}

export function getMarkerImages(marker = {}) {
    const images = [];

    const primaryImage = normalizeImageValue(marker.image);
    if (primaryImage) {
        images.push(primaryImage);
    }

    const secondaryImage = normalizeImageValue(marker.image2);
    if (secondaryImage) {
        images.push(secondaryImage);
    }

    return images;
}

export function buildMarkerImageMarkup(marker = {}) {
    const images = getMarkerImages(marker);

    if (images.length === 0) {
        return '';
    }

    return images.map((image, index) => `
        <div class="markerImage">
            <img src="${image}" alt="${marker.label || `Marker image ${index + 1}`}" loading="lazy">
        </div>
    `).join('');
}
