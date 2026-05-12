export function createMarker(marker) {

    const div = document.createElement('div');

    div.className = 'marker';

    // Position
    div.style.left = `${marker.x}px`;
    div.style.top = `${marker.y}px`;

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

        showInfo(marker);
    });

    return div;
}

export function createLabel(label) {

    const div = document.createElement('div');

    div.className = 'label';

    div.style.position = 'absolute';

    div.style.left = `${label.x}px`;

    div.style.top = `${label.y}px`;

    div.style.color = 'white';

    div.style.fontWeight = 'bold';

    div.style.backgroundColor = 'transparent';

    div.style.zIndex = '600';

    div.textContent = label.text;

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