import { createRandomPicker } from './lib/random.js';
import { generate } from './lib/generator.js';
import { loadCorpus, saveArticle } from './lib/corpus.js';
import { options } from './lib/cmd.js';
import { interact } from './lib/interact.js';



const corpus = loadCorpus('./corpus/data.json');

let title = options.title || createRandomPicker(corpus['title'])();

const questions = [
    { text: '请输入文章主题', value: title },
    { text: '请输入最小字数', value: 6000 },
    { text: '请输入最大字数', value: 10000 },
];

const answers = await interact(questions);
title = answers[0]
options.min = answers[1];
options.max = answers[2];

const article = generate(title, { corpus, ...options });
const output = saveArticle(title, article);
console.log(`success: ${output}`);
