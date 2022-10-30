import { createRandomPicker } from './lib/random.js';
import { generate } from './lib/generator.js';
import { loadCorpus, saveArticle } from './lib/corpus.js';
import { options } from './lib/cmd.js';


const corpus = loadCorpus('./corpus/data.json');
const title = options.title || createRandomPicker(corpus['title'])();
const article = generate(title, { corpus, ...options });
const output = saveArticle(title, article);
console.log(`success: ${output}`);
