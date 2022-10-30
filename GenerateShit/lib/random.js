export function randomInt(min, max) {
    const p = Math.random();
    return Math.floor(min * (1 - p) + max * p);
}

export function createRandomPicker(arr) {
    const tmp = [...arr]; // 缓存数组
    function randomPick() {
        const len = tmp.length - 1;
        const index = randomInt(0, len);
        const picked = tmp[index];
        [tmp[index], tmp[len]] = [tmp[len], tmp[index]];
        return picked;
    }
    randomPick(); // 丢掉第一次的结果
    return randomPick;
}



Array.from(new Array(10).fill(0)).map(() => {
    console.log(randomInt(200, 500));
})