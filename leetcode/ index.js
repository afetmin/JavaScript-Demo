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

/** 只卖一次利润最大 */
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

/** 卖多次利润最大 */
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
/** 原地删除重复元素 */
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

function bfs(node) {
  const nodes = []
  const queue = []
  if (node) {
    queue.push(node)
    while (queue.length) {
      const item = queue.shift()
      nodes.push(item)
      for (const v of item.children) {
        queue.push(v)
      }
    }
  }
  return nodes
}

function dfs(node) {
  const nodes = []
  const stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      const item = stack.pop()
      nodes.push(item)
      const len = item.children.length
      for (let i = len - 1; i >= 0; i--) {
        stack.push(item.children[i])
      }
    }
  }
  return nodes
}

/**
 *
 * @param {*} arr
 * @returns
 * @example
 * [1,4,7,3,2] => ["1->4","7"]
 */
function encodeArray(arr) {
  const sortedArr = Array.from(new Set(arr.sort((a, b) => a - b)))
  let pos = 0
  for (let i = 1; i < sortedArr.length; i++) {
    if (sortedArr[i] - sortedArr[i - 1] !== 1) {
      pos = i
    }
  }
  return [sortedArr[0] + "->" + sortedArr[pos - 1], "" + sortedArr.slice(pos)]
}

const arr = [1, 4, 7, 3, 2, 2]
console.log(encodeArray(arr))

/** 判断合法括号 */
function isValid(s) {
  let stack = []
  let len = s.length
  if (len % 2 === 1) return false
  for (let cur of s) {
    if (cur === "(" || cur === "{" || cur === "[") {
      stack.push(cur)
    }
    switch (cur) {
      case ")":
        if (stack.pop() !== "(") return false
        break
      case "]":
        if (stack.pop() !== "[") return false
        break
      case "}":
        if (stack.pop() !== "{") return false
        break
    }
  }
  return !stack.length
}
