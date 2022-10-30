import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import moment from 'moment';

const _dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
    const path = resolve(_dirname, '..', src);
    const data = readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(data);
};

function saveArticle(title, article) {
    const outputDir = resolve(_dirname, '..', './output');
    const time = moment().format('-YYYY-MM-DD-HH-mm-ss');
    const outputFile = resolve(outputDir, `${title}${time}.txt`);

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }

    const text = `${title}\n\n    ${article.join('\n    ')}`;
    writeFileSync(outputFile, text);
    return outputFile;
}

export {
    saveArticle,
    loadCorpus
}