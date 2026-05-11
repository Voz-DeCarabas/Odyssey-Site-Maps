export function createMarker(marker) {

    const div = document.createElement('div');

    div.className = 'marker';

    // Position
    div.style.left = `${marker.x}px`;
    div.style.top = `${marker.y}px`;

    // Size
    const size = marker.size || 24;

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;

    // Color
    div.style.backgroundColor =
        marker.color || '#ffffff';

    // Text label for securitylevel value only on security doors
    if (marker.type === 'securityDoor' && marker.securityLevel != null) {
        const secLabel = document.createElement('span');
        secLabel.className = 'markersecurityLevel';
        secLabel.textContent = String(marker.securityLevel);
        div.appendChild(secLabel);
    }

    // Shape
    applyShape(div, marker);
   
    // Border
    switch (marker.z) {
        case 0:
            div.style.border = '0px solid #000000';
            break;
        case 1:
            div.style.border = '4px solid #000000';
            break;
        case 2:
            div.style.border = '4px solid rgb(253, 0, 0)';
            break;    
        default:
            div.style.border = '0px solid rgb(0, 0, 0)';
    }

    // Accessibility
    div.title = marker.label || '';

    // Click / Touch
    div.addEventListener('click', event => {

        event.stopPropagation();

        showInfo(marker);
    });

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

        document.body.appendChild(popup);
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
            marker.image
                ? `
                    <div class="markerImage">
                        <img src="${marker.image}" alt="${marker.label || 'Marker image'}">
                    </div>
                  `
                : ''
        }
    `;

    // Show popup
    popup.style.display = 'block';
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