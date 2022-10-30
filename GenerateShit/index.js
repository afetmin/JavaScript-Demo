import { readFileSync } from 'fs';
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { createRandomPicker } from './lib/random.js';
import { generate } from './lib/generator.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCorpus(src) {
    const path = resolve(__dirname, src);
    const data = readFileSync(path, { encoding: 'utf-8' });
    return JSON.parse(data);
};

const corpus = loadCorpus('./corpus/data.json');
console.log(corpus.title);
const pickTitle = createRandomPicker(corpus.titie);
const title = pickTitle();
const article = generate(title, { corpus });

console.log(`${title}\n\n    ${article.join('\n    ')}`);