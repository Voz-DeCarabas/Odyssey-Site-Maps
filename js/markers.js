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

    // Border
    switch (marker.z) {
        case 0:
            div.style.border = '4px solid #000000';
            break;
        case 1:
            div.style.border = '4px solid #ff0000';
            break;
        case 2:
            div.style.border = '4px solid rgb(253, 0, 241)';
            break;    
        default:
            div.style.border = '4px solid rgb(0, 0, 0)';
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

function applyShape(div, marker) {

    const shape = marker.shape || 'circle';

    switch(shape) {

        case 'circle':

            div.style.borderRadius = '50%';

            break;

        case 'square':

            div.style.borderRadius = '4px';

            break;

        case 'diamond':

            div.style.borderRadius = '2px';

            div.style.transform =
                'translate(-50%, -50%) rotate(45deg)';

            break;

        case 'triangle':

            createTriangle(div, marker);

            break;

        case 'hexagon':

            createHexagon(div);

            break;

        default:

            div.style.borderRadius = '50%';
    }
}

function createTriangle(div, marker) {

    const size = marker.size || 24;

    div.style.width = '0';
    div.style.height = '0';

    div.style.background = 'transparent';

    div.style.borderLeft =
        `${size / 2}px solid transparent`;

    div.style.borderRight =
        `${size / 2}px solid transparent`;

    div.style.borderBottom =
        `${size}px solid ${marker.color}`;

    div.style.borderTop = '0';

    div.style.borderRadius = '0';
}

function createHexagon(div) {

    div.style.clipPath =
        'polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)';
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

        <p>
            <strong>Type:</strong>
            ${marker.type || 'unknown'}
        </p>

        ${
            marker.description
                ? `<p>${marker.description}</p>`
                : ''
        }

        ${
            marker.securityLevel
                ? `
                    <p>
                        <strong>Security Level:</strong>
                        ${marker.securityLevel}
                    </p>
                  `
                : ''
        }

        ${
            marker.building
                ? `
                    <p>
                        <strong>Building:</strong>
                        ${marker.building}
                    </p>
                  `
                : ''
        }

        ${
            marker.room
                ? `
                    <p>
                        <strong>Room:</strong>
                        ${marker.room}
                    </p>
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