import { cp, rm } from 'node:fs/promises';
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

async function build() {
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
