/*
 * @Author: your name
 * @Date: 2021-03-16 15:25:59
 * @LastEditTime: 2021-03-16 15:31:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JavaScript-Demo\repeatFunc.js
 */

function repeatFunc(fn, times, wait) {
  return (...args) => {
    let i = 0
    let timer = setInterval(() => {
      if (i === times) {
        clearInterval(timer)
        return
      }
      fn.apply(this, args)
      i++
    }, wait)
  }
}

let repeatAlert = repeatFunc(console.log, 10, 500)
repeatAlert('hello world')