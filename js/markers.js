import { buildMarkerImageMarkup } from './markerImages.js';

export function createMarker(marker, imageWidth = 1, imageHeight = 1) {

    const width = imageWidth || 1;
    const height = imageHeight || 1;

    const div = document.createElement('div');

    div.className = 'marker';

    // Position as percentage of actual image size
    div.style.left = `${(marker.x / width * 100)}%`;
    div.style.top = `${(marker.y / height * 100)}%`;

    // Size
    const size = marker.size || 20;

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;

    // Color
    div.style.backgroundColor =
        marker.color || '#ffffff';

    // Text label for securitylevel value on security doors and airlocks
    if ((marker.type === 'securityDoor' || marker.type === 'airlock') && marker.securityLevel != null) {
        const secLabel = document.createElement('span');
        secLabel.className = 'markersecurityLevel';
        secLabel.textContent = String(marker.securityLevel);
        div.appendChild(secLabel);
    }

    // Text label for "i" on hint markers
    if (marker.type === 'hint' ) {
        const hintLabel = document.createElement('span');
        hintLabel.className = 'markerInfo';
        hintLabel.textContent = "i";
        div.appendChild(hintLabel);
    }


   
   
    // Border
    switch (marker.z) {
        case 0:
            div.style.border = '4px solid #00000000';
            break;
        case 1:
            div.style.border = '4px solid #ffffff';
            break;
        case 2:
            div.style.border = '4px solid rgb(253, 0, 0)';
            break;    
        default:
            div.style.border = '0px solid rgba(0, 0, 0, 0)';
    }

    // Shape
    applyShape(div, marker);

    // Accessibility
    div.title = marker.label || '';

    // Click / Touch
    div.addEventListener('click', event => {

        event.stopPropagation();

        if (marker.url) {
            window.open(marker.url, '_blank', 'noopener');
            return;
        }

        showInfo(marker);
    });

    return div;
}

export function createLabel(label, imageWidth = 1, imageHeight = 1) {

    const width = imageWidth || 1;
    const height = imageHeight || 1;

    const div = document.createElement('div');

    div.className = 'label';

    div.style.position = 'absolute';

    div.style.left = `${(label.x / width * 100)}%`;

    div.style.top = `${(label.y / height * 100)}%`;

    div.style.color = label.color || 'white';

    div.style.fontWeight = 'bold';

    div.style.backgroundColor = 'transparent';

    div.style.zIndex = '600';

    if (label.size) {
        div.style.fontSize = `${label.size}px`;
    }

    // Ensure clicks work when the label contains links (overrides CSS pointer-events:none)
    if (label.url) {
        div.style.pointerEvents = 'auto';
    }

    // If a URL is provided for the label, make the specified portion clickable.
    if (label.url) {
        const text = label.text || '';
        const urlText = label.urlText || text;

        const idx = text.indexOf(urlText);

        if (idx !== -1) {
            if (idx > 0) {
                div.appendChild(document.createTextNode(text.slice(0, idx)));
            }

            const a = document.createElement('a');
            a.href = label.url;
            a.textContent = urlText;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.color = 'inherit';
            a.style.textDecoration = 'underline';
            div.appendChild(a);

            const rest = text.slice(idx + urlText.length);
            if (rest) {
                div.appendChild(document.createTextNode(rest));
            }
        } else {
            // urlText not found in text — append whole text and a link
            div.textContent = text + ' ';
            const a = document.createElement('a');
            a.href = label.url;
            a.textContent = label.urlText || label.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.style.color = 'inherit';
            a.style.textDecoration = 'underline';
            div.appendChild(a);
        }
    } else {
        div.textContent = label.text;
    }

    return div;
}

function applyShape(div, marker) {

    // Use circles for all markers for simplicity.
    div.style.borderRadius = '50%';
}


function showInfo(marker) {

    let popup =
        document.getElementById('infoPopup');

    // Create popup if missing
    if (!popup) {

        popup = document.createElement('div');

        popup.id = 'infoPopup';

        const viewer = document.getElementById('viewer');
        viewer.appendChild(popup);
    }

    popup.innerHTML = `

        <h2>
            ${marker.label || 'Marker'}
        </h2>

        ${
            marker.description
                ? `<p>${marker.description}</p>`
                : ''
        }

        ${
            marker.url
                ? `<p><a href="${marker.url}" target="_blank" rel="noopener noreferrer">${marker.urlText || marker.url}</a></p>`
                : ''
        }

       
        ${buildMarkerImageMarkup(marker)}
    `;

    // Show popup
    popup.style.display = 'block';

    // Position popup
    popup.style.position = 'absolute';
    popup.style.right = 'auto';
    if (marker.popupX != null && marker.popupY != null) {
        popup.style.left = `${marker.popupX}px`;
        popup.style.top = `${marker.popupY}px`;
        popup.style.transform = 'none';
    } else {
        popup.style.left = '50%';
        popup.style.top = '20px';
        popup.style.transform = 'translateX(-50%)';
    }
}

// Hide popup when clicking map background
document.addEventListener('click', event => {

    const popup =
        document.getElementById('infoPopup');

    if (!popup) {
        return;
    }

    if (
        !event.target.classList.contains('marker')
    ) {
        popup.style.display = 'none';
    }
});