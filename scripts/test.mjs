import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

async function walkFiles(dirPath, extension, results = []) {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            await walkFiles(fullPath, extension, results);
            continue;
        }

        if (entry.isFile() && fullPath.endsWith(extension)) {
            results.push(fullPath);
        }
    }

    return results;
}

function checkJavaScriptSyntax(files) {
    const errors = [];

    for (const filePath of files) {
        const result = spawnSync(
            process.execPath,
            ['--check', filePath],
            { encoding: 'utf8' }
        );

        if (result.status !== 0) {
            const output = (result.stderr || result.stdout || '').trim();
            errors.push(
                `Syntax error in ${path.relative(rootDir, filePath)}\n${output}`
            );
        }
    }

    return errors;
}

async function checkJsonFiles(files) {
    const errors = [];

    for (const filePath of files) {
        try {
            const content = await readFile(filePath, 'utf8');
            JSON.parse(content);
        } catch (error) {
            errors.push(
                `Invalid JSON in ${path.relative(rootDir, filePath)}\n${error.message}`
            );
        }
    }

    return errors;
}

async function validateIndexShape(indexPath) {
    const errors = [];
    const content = await readFile(indexPath, 'utf8');
    const parsed = JSON.parse(content);

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        return ['maps/index.json must be an object keyed by settlement class.'];
    }

    for (const [className, layouts] of Object.entries(parsed)) {
        if (!Array.isArray(layouts)) {
            errors.push(`maps/index.json: "${className}" must be an array.`);
            continue;
        }

        layouts.forEach((layout, index) => {
            if (typeof layout !== 'object' || layout === null) {
                errors.push(
                    `maps/index.json: "${className}" entry ${index} must be an object.`
                );
                return;
            }

            const requiredKeys = ['id', 'name', 'thumbnail'];
            for (const key of requiredKeys) {
                if (typeof layout[key] !== 'string' || layout[key].trim() === '') {
                    errors.push(
                        `maps/index.json: "${className}" entry ${index} missing valid "${key}".`
                    );
                }
            }
        });
    }

    return errors;
}

async function main() {
    const jsDir = path.join(rootDir, 'js');
    const mapsDir = path.join(rootDir, 'maps');
    const indexPath = path.join(mapsDir, 'index.json');

    const [jsFiles, jsonFiles] = await Promise.all([
        walkFiles(jsDir, '.js'),
        walkFiles(mapsDir, '.json')
    ]);

    const failures = [];
    failures.push(...checkJavaScriptSyntax(jsFiles));
    failures.push(...await checkJsonFiles(jsonFiles));
    failures.push(...await validateIndexShape(indexPath));

    if (failures.length > 0) {
        console.error('Validation failed:\n');
        console.error(failures.join('\n\n'));
        process.exitCode = 1;
        return;
    }

    console.log(`Validation passed for ${jsFiles.length} JS files and ${jsonFiles.length} JSON files.`);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
