function unique1(arr) {
  return [...new Set(arr)]
}

function unique2(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if(!res.includes(arr[i])) res.push(arr[i])

  }
  return res
}

function unique3(arr) {
  arr = arr.sort((a,b) => a-b)
  let p1 = 0,p2 = 0
  while(p2<arr.length) {
    if(arr[p1] !== arr[p2]) {
      p1++
      arr[p1] = arr[p2]
    }
    p2++
  }
  return arr
}

function unique4(arr) {
  let res = arr.reduce((acc,cur) => {
    if(!acc.includes(cur)) acc.push(cur)
    return acc
  },[])
  return res
}

// 利用Object的同key自动覆盖处理
function unique5(arr) {
  return Object.keys(arr.reduce((acc,cur) => {
    acc[cur] = null
    return acc
  },{}))
}

let arr = [1, 1, 1, 2, 3, 4, 5, 4, 5, 7, 6]
console.log(unique5(arr));
