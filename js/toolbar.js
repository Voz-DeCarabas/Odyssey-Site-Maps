const BUTTONS = [

    {
        type: 'securityDoor',
        label: '■ Doors',
        color: '#ff3333'
    },

    {
        type: 'dataPort',
        label: '● Data Ports',
        color: '#00ffff'
    },

    {
        type: 'terminal',
        label: '● Terminals',
        color: '#00ff66'
    },

    {
        type: 'alarmPanel',
        label: '▲ Alarm',
        color: '#ffaa00'
    },

    {
        type: 'container',
        label: '◆ Powerplay Container',
        color: '#ffff00'
    },

    {
        type: 'power',
        label: '⬢ Power',
        color: '#cc66ff'
    }
];

export function createToolbar(
    filters,
    callback
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
    const backButton =
        document.createElement('button');

    backButton.className =
        'toolbarButton';

    backButton.innerHTML = '← Maps';

    backButton.addEventListener('click', () => {

        window.location.href =
            'browser.html';
    });

    toolbar.appendChild(backButton);
}
