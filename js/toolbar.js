const BUTTONS = [

   
   
    {
        type: 'airlock',
        label: '● Airlock',
        color: '#f56200'
    },
    
    {
        type: 'securityDoor',
        label: '● Inner Doors',
        color: '#0f02fa'
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
        label: '● Alarm Panel',
        color: '#f0fc05'
    },

    {
        type: 'container',
        label: '● PP Containers',
        color: '#cc66ff'
    },

    {
        type: 'hint',
        label: '● Hints',
        color: '#16ac09'
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

    backButton.innerHTML = '← Map Browser';

    backButton.addEventListener('click', () => {

        window.location.href =
            'browser.html';
    });

    toolbar.appendChild(backButton);
}
