/**
 * Toolbar for map marker filtering
 * Dynamically loads marker types from category configuration
 */

export function createToolbar(
    filters,
    callback,
    currentClass,
    currentMapId,
    index,
    markerTypes = []
) {

    const toolbar =
        document.getElementById('toolbar');

    // Clear existing toolbar
    toolbar.innerHTML = '';

    markerTypes.forEach(markerType => {

        const button =
            document.createElement('button');

        button.className =
            'toolbarButton';

        // Start active if enabled
        if (filters[markerType.id]) {

            button.classList.add('active');
        }

        // Label with color indicator
        button.innerHTML = `

            <span
                class="toolbarIcon"
                style="color:${markerType.color}"
            >
                ●
            </span>

            <span>
                ${markerType.label}
            </span>
        `;

        // Toggle filter
        button.addEventListener('click', () => {

           
            button.classList.toggle('active');

            callback(markerType.id);
        });

        toolbar.appendChild(button);
    });

    // Back button
    const buttonGroup =
        document.createElement('div');

    buttonGroup.className =
        'toolbarButtonGroup';

    const previousButton =
        document.createElement('button');
    previousButton.type = 'button';
    previousButton.className =
        'toolbarButton toolbarButtonSegment';
    previousButton.textContent = '←';
    previousButton.addEventListener('click', () => {
        navigateNeighbor(-1, currentClass, currentMapId, index);
    });

    const browserButton =
        document.createElement('button');
    browserButton.type = 'button';
    browserButton.className =
        'toolbarButton toolbarButtonSegment center';
    browserButton.textContent = 'Home';
    browserButton.addEventListener('click', () => {
        window.location.href =
            'browser.html';
    });

    const nextButton =
        document.createElement('button');
    nextButton.type = 'button';
    nextButton.className =
        'toolbarButton toolbarButtonSegment';
    nextButton.textContent = '→';
    nextButton.addEventListener('click', () => {
        navigateNeighbor(1, currentClass, currentMapId, index);
    });

    buttonGroup.appendChild(previousButton);
    buttonGroup.appendChild(browserButton);
    buttonGroup.appendChild(nextButton);

    toolbar.appendChild(buttonGroup);
}

function navigateNeighbor(direction, currentClass, currentMapId, index) {
    if (!index || !currentClass || !currentMapId) {
        window.location.href = 'browser.html';
        return;
    }

    const flatList = [];

    Object.entries(index).forEach(([category, layouts]) => {
        layouts.forEach(layout => {
            flatList.push({
                className: category,
                mapId: layout.id
            });
        });
    });

    const currentIndex = flatList.findIndex(entry =>
        entry.className === currentClass &&
        entry.mapId === currentMapId
    );

    if (currentIndex === -1) {
        window.location.href = 'browser.html';
        return;
    }

    const nextIndex =
        (currentIndex + direction + flatList.length) % flatList.length;

    const nextEntry = flatList[nextIndex];
    window.location.href =
        `viewer.html?class=${encodeURIComponent(nextEntry.className)}&map=${encodeURIComponent(nextEntry.mapId)}`;
}
