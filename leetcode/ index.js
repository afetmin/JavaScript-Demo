/** 判断字母异位词 */
const isAnagram = (a, b) => {
  const aLen = a.length
  const bLen = b.length

  if (aLen !== bLen) return false
  const map = {}
  for (let i = 0; i < a.length; i++) {
    const curA = a[i]
    const curB = b[i]
    map[curA] ? map[curA]++ : (map[curA] = 1)
    map[curB] ? map[curB]-- : (map[curB] = -1)
  }
  return Object.values(map).every((_) => _ === 0)
}

const a = "anagram",
  b = "gramana"
console.log(isAnagram(a, b))

/** 最长公共前缀 */
function longgestCommonPrefix(strs) {
  if (strs.length === 0) return ""
  if (strs.length === 1) return strs[0]
  return strs.reduce(getSameStr, strs[0])
}

function getSameStr(a, b) {
  let res = ""
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      res += a[i]
    } else {
      return res
    }
  }
  return res
}
const strs = ["flower", "flow", "flight"]
console.log(longgestCommonPrefix(strs))

/** 找出b包含在a中的首字母位置 */
function strStr(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[0]) {
      if (a.substring(i, i + b.length) === b) return i
    }
  }
  return -1
}

const hasy = "hello",
  needle = "ll"
console.log(strStr(hasy, needle))

function maxProfit(prices) {
  let profit = 0
  let min = prices[0]

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i]
    } else {
      profit = Math.max(profit, prices[i] - min)
    }
  }
  return profit
}

function maxProfit2(prizes) {
  let profit = 0
  for (let i = 1; i < prizes.length; i++) {
    if (prizes[i] > prizes[i - 1]) {
      profit += prizes[i] - prizes[i - 1]
    }
  }
  return profit
}

function reverseList(head) {
  const [pre, node] = [null, head]
  while (node) {
    const temp = node.next
    node.next = pre
    pre = node
    node = temp
  }
  return pre
}
/** 删除重复元素 */
function removeDup(arr) {
  let i = 0
  for (let j = 1; j < arr.length; j++) {
    if (arr[j] !== arr[i]) {
      arr[++i] = arr[j]
    }
  }
  return i
}

const nums = [1, 1, 1, 2, 3, 3, 4, 5]
console.log(removeDup(nums))
