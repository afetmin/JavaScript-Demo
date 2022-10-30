import { readFileSync } from 'fs';
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const url = import.meta.url;
const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json');
const data = readFileSync(path, { encoding: 'utf-8' });

console.log(data)