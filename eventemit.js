/*
 * @Author: your name
 * @Date: 2021-03-16 15:34:39
 * @LastEditTime: 2021-03-16 15:40:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JavaScript-Demo\eventemit.js
 */

class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(event, fn) {
    if (this.events[event]) {
      this.events[event].push(fn)
    }
    this.events[event] = [fn]
  }
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(fn => {
        fn.apply(this, args)
      })
    }
  }
  remove(event) {
    delete this.events[event]
  }
}

let emitter = new EventEmitter()

emitter.on('test', (data) => {
  console.log(data);
})

emitter.emit('test', 1,2)