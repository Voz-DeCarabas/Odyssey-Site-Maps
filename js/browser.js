import {
    loadIndex
} from './maps.js';

let selectedType = 'all';
let currentIndex = null;

async function initialize() {

    currentIndex = await loadIndex();

    renderSiteTypeSelector(currentIndex);
    renderSections(currentIndex);
}

function renderSiteTypeSelector(index) {

    const selector =
        document.getElementById('siteTypeSelector');

    selector.innerHTML = '';

    const types = ['all',
        ...Object.keys(index)
    ];

    types.forEach(type => {

        const button =
            document.createElement('button');

        button.className = 'siteTypeButton';

        if (selectedType === type) {
            button.classList.add('active');
        }

        button.textContent =
            type === 'all'
                ? 'All Sites'
                : formatName(type);

        button.addEventListener('click', () => {

            if (selectedType === type) {
                return;
            }

            selectedType = type;
            renderSiteTypeSelector(index);
            renderSections(index);
        });

        selector.appendChild(button);
    });
}

function renderSections(index) {

    const content =
        document.getElementById('content');

    content.innerHTML = '';

    const entries =
        selectedType === 'all'
            ? Object.entries(index)
            : [[selectedType,
                index[selectedType] || []]];

    entries.forEach(([className,
        layouts]) => {

        if (!layouts || layouts.length === 0) {
            return;
        }

        const section =
            document.createElement('section');

        section.className = 'section';

        const title =
            document.createElement('h2');

        title.className = 'sectionTitle';

        title.textContent = formatName(className);

        section.appendChild(title);

        const grid =
            document.createElement('div');

        grid.className = 'thumbnailGrid';

        layouts.forEach(layout => {

            const thumb =
                createThumbnail(layout, className);

            grid.appendChild(thumb);
        });

        section.appendChild(grid);

        content.appendChild(section);
    });
}

function createThumbnail(layout, className) {

    const div = document.createElement('div');

    div.className = 'thumbnail';

    div.innerHTML = `

        <img src="${layout.thumbnail}">

        <div class="thumbnailLabel">
            ${layout.name}
        </div>
    `;

    div.addEventListener('click', () => {

        window.location.href =
            `viewer.html?class=${className}&map=${layout.id}`;
    });

    return div;
}

function formatName(name) {

    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g,
            letter => letter.toUpperCase());
}

initialize();