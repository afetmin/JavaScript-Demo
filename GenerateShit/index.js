import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import moment from 'moment';

import { createRandomPicker } from './lib/random.js';
import { generate } from './lib/generator.js';

const _dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
    const path = resolve(_dirname, src);
    const data = readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(data);
};

const corpus = loadCorpus('./corpus/data.json');
const pickTitle = createRandomPicker(corpus['title']);
const title = pickTitle();
const article = generate(title, { corpus });

saveArticle(title, article);
function saveArticle(title, article) {
    const outputDir = resolve(_dirname, './output');
    const time = moment().format('-YYYY-MM-DD-HH-mm-ss');
    const outputFile = resolve(outputDir, `${title}${time}.txt`);

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir);
    }

    const text = `${title}\n\n    ${article.join('\n    ')}`;
    writeFileSync(outputFile, text);
    return outputFile;
}