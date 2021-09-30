const nums = Array(54)
  .fill(undefined)
  .map((_, index) => index)

/**
 * 洗牌算法
 * @param nums 数组
 */
function FYSufffle(nums) {
  const randNums = Array.from(nums)
  let len = nums.length
  while (len > 1) {
    const rand = Math.floor(Math.random() * len)
    len--
    // 交换
    ;[randNums[rand], randNums[len]] = [randNums[len], randNums[rand]]
  }
  return randNums
}

console.log(FYSufffle(nums))
