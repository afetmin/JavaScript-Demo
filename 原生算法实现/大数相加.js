function add(a, b) {
  let len = Math.max(a.length, b.length)
  a = a.padStart(len, 0)
  b = b.padStart(len, 0)
  console.log(a, b);
  let addone = 0
  let temp = 0
  let sum = ''
  for (let i = len - 1; i >= 0; i--) {
    temp = parseInt(a[i]) + parseInt(b[i]) + addone
    addone = Math.floor(temp / 10)
    sum = temp % 10 + sum
  }
  if (addone === 1) {
    sum = '1' + sum
  }
  return sum
}

let a = "9007199254740991"
let b = "1234567899999999999"
console.log(add(a, b));