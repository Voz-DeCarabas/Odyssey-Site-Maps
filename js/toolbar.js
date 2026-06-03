const BUTTONS = [

   
   
    {
        type: 'airlock',
        label: '● Airlock',
        color: '#0f02fa'
    },
    
    {
        type: 'securityDoor',
        label: '● Inner Doors',
        color: '#02c2f7'
    },

    {
        type: 'dataPort',
        label: '● Data Ports',
        color: '#8400ff'
    },

    {
        type: 'terminal',
        label: '● Terminals',
        color: '#00ff66'
    },

    {
        type: 'alarmPanel',
        label: '● Alarm Panel',
        color: '#f0fc05'
    },

    {
        type: 'container',
        label: '● PP Containers',
        color: '#dd8ef5'
    },

    {
        type: 'hint',
        label: '● Hints',
        color: '#16ac09'
    }
];

export function createToolbar(
    filters,
    callback,
    currentClass,
    currentMapId,
    index
) {

    const toolbar =
        document.getElementById('toolbar');

    // Clear existing toolbar
    toolbar.innerHTML = '';

    BUTTONS.forEach(buttonData => {

        const button =
            document.createElement('button');

        button.className =
            'toolbarButton';

        // Start active if enabled
        if (filters[buttonData.type]) {

            button.classList.add('active');
        }

        // Label
        button.innerHTML = `

            <span
                class="toolbarIcon"
                style="color:${buttonData.color}"
            >
                ${buttonData.label.charAt(0)}
            </span>

            <span>
                ${buttonData.label.substring(2)}
            </span>
        `;

        // Toggle filter
        button.addEventListener('click', () => {

           
            button.classList.toggle('active');

            callback(buttonData.type);
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
