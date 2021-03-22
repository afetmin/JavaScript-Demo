/*
 * @Author: your name
 * @Date: 2021-03-16 15:25:59
 * @LastEditTime: 2021-03-17 13:37:24
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
      fn.apply(null, args)
      i++
    }, wait)
  }
}

function repeat(fn, times, wait) {
  return (...args) => {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        fn.apply(null, args)
      }, wait * i)
    }
  }
}

let repeatAlert = repeat(console.log, 10, 500)
repeatAlert('hello world')