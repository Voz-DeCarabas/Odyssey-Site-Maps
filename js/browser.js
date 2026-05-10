import {
    loadIndex
} from './maps.js';

async function initialize() {

    const index = await loadIndex();

    renderSections(index);
}

function renderSections(index) {

    const content =
        document.getElementById('content');

    Object.entries(index).forEach(
        ([className, layouts]) => {

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
        }
    );
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