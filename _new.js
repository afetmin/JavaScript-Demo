/*
 * @Author: your name
 * @Date: 2021-03-17 13:18:27
 * @LastEditTime: 2021-03-17 13:23:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JavaScript-Demo\_new.js
 */

function _new() {
  let target = {}
  let [constructor, ...args] = [...arguments]
  target.__proto__ = constructor.prototype
  let result = constructor.apply(target, args)
  if(result && (typeof result === 'object' || typeof result === 'function')) {
    return result
  }
  return target
}

