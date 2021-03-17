/*
 * @Author: your name
 * @Date: 2021-03-17 08:52:00
 * @LastEditTime: 2021-03-17 13:15:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JavaScript-Demo\quickSort.js
 */


function quickSort(arr) {
  if (arr.length <= 1) return arr
  let povitIndex = Math.floor(arr.length / 2)
  let povit = arr.splice(povitIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < povit) { left.push(arr[i]) }
    else right.push(arr[i])
  }
  return quickSort(left).concat(povit, quickSort(right))
}

let arr = [3, 4, 6, 78, 2, 4, 9]
console.log(quickSort(arr));