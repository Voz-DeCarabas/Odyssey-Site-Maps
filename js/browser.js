import {
    loadIndex
} from './maps.js';

let selectedType = 'intro';
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

    const types = ['intro', 'all',
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
            type === 'all' ? 'All Sites'
            : type === 'intro' ? 'About'
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

    if (selectedType === 'intro') {
        renderIntro(index);
        return;
    }

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

function renderIntro(index) {

    const content = document.getElementById('content');

    const section = document.createElement('section');
    section.className = 'section';

   

    const p = document.createElement('p');
    p.textContent = 'This site provides layout maps for Odyssey surface sites. Use the category buttons above to browse site maps.';
    section.appendChild(p);

    const p2 = document.createElement('p');
    p2.textContent = 'Click any thumbnail to open the map in the viewer, and toggle the various options to customize the display. The viewer is designed to work well on mobile devices, so you can easily use it while exploring a site in-game.';
    section.appendChild(p2);

    const p3 = document.createElement('p');
    p3.textContent = 'Use the GitHub link above for the code or to contact me with any questions or suggestions. Enjoy exploring the sites! o7';
    section.appendChild(p3);

 
    content.appendChild(section);
}

function formatName(name) {

    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g,
            letter => letter.toUpperCase());
}

initialize();