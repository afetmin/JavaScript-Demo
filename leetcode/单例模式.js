
// class Create {
//   constructor(name) {
//     this.name = name
//   }
//   getName() {
//     return this.name
//   }
// }
// function Singleton() {
//   let instance
//   return (name) => {
//     if (!instance) instance = new Create(name)
//     return instance
//   }
// }
// let single = Singleton()
// console.log(single('jack').getName())
// console.log(single('tom').getName())



// function unique(arr) {
//   // 编写代码
//   let p1 = 0;
//   let p2 = 0;
//   while (p2 < arr.length) {
//     if (arr[p1] != arr[p2]) {
//       p1++
//       arr[p1] = arr[p2]
//     }
//     p2++
//   }
//   return arr.splice(0, p1 + 1)
// }


function unique(arr) {
  // 编写代码
  let res = arr.reduce((acc, cur) => {
    if (acc.indexOf(cur) === -1) acc.push(cur)
    return acc
  }, [])
  return res
}
let arr = [1, 1, 2, 2, 3, 3, 3, 4, 7, 7, 7]
console.log(unique(arr));