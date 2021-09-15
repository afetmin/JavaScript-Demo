function fn(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fn(n - 1) + fn(n - 2)
}

console.log(fn(6))

function fibonacci(n) {
  let arr = [1, 1, 2]
  let len = arr.length
  if (n <= len) {
    return arr[n]
  }
  for (let i = len; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2])
  }
  return arr[n - 1]
}

console.log(fibonacci(6))
