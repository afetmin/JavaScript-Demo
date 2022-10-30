import { createRandomPicker, randomInt } from "./random.js";

function sentence(pick, replacer) {
    let ret = pick();
    for (const key in replacer) {
        ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
    }
    return ret;
}


export function generate(title, { corpus, min = 6000, max = 10000 } = {}) {
    const articleLength = randomInt(min, max);
    const { famous, bosh_before, bosh, said, conclude } = corpus;
    const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map(item => {
        return createRandomPicker(item);
    });

    const article = [];
    let totalLength = 0;

    while (totalLength < articleLength) {
        let section = '';
        const sectionLength = randomInt(200, 500); // 段落长度
        // 如果当前字数不够或者不是以句号问号结尾
        while (section.length < sectionLength || !/[。？]$/.test(section)) {
            const n = randomInt(0, 100);
            if (n < 20) { // 小于20， 生成一条名人名言，也就是文章中有百分之二十的名句
                section += sentence(pickFamous, { said: pickSaid, conclude: pickConclude });
            } else if (n < 50) {
                section += sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title });
            } else {
                section += sentence(pickBosh, { title });
            }
        }
        totalLength += section.length;
        article.push(section);
    }
    return article;
}

