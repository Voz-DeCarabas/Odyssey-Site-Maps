import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const distDir = path.join(rootDir, 'dist');

const filesToCopy = [
    'browser.html',
    'viewer.html',
    'README.md'
];

const directoriesToCopy = [
    'css',
    'icons',
    'images',
    'js',
    'maps'
];

async function generateOfflineData() {
    const mapsDir = path.join(rootDir, 'maps');
    const categories = await readdir(mapsDir, { withFileTypes: true });
    const data = {
        index: JSON.parse(await readFile(path.join(mapsDir, 'index.json'), 'utf8')),
        layouts: {},
        markerTypes: {}
    };

    for (const category of categories) {
        if (!category.isDirectory()) {
            continue;
        }

        const categoryDir = path.join(mapsDir, category.name);
        const files = await readdir(categoryDir, { withFileTypes: true });

        for (const file of files) {
            if (!file.isFile() || !file.name.endsWith('.json')) {
                continue;
            }

            const content = await readFile(path.join(categoryDir, file.name), 'utf8');
            if (file.name === 'markers.json') {
                data.markerTypes[category.name] = JSON.parse(content);
                continue;
            }

            const layoutId = path.basename(file.name, '.json');
            data.layouts[`${category.name}/${layoutId}`] = JSON.parse(content);
        }
    }

    const outputPath = path.join(rootDir, 'js', 'offlineData.js');
    await writeFile(
        outputPath,
        `globalThis.ODYSSEY_MAP_DATA = ${JSON.stringify(data)};\n`
    );
}

async function build() {
    await generateOfflineData();
    await rm(distDir, { recursive: true, force: true });

    for (const file of filesToCopy) {
        await cp(
            path.join(rootDir, file),
            path.join(distDir, file),
            { recursive: false }
        );
    }

    for (const directory of directoriesToCopy) {
        await cp(
            path.join(rootDir, directory),
            path.join(distDir, directory),
            { recursive: true }
        );
    }

    console.log(`Build complete: ${path.relative(rootDir, distDir)}`);
}

build().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
