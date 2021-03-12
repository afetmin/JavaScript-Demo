/*
 * @Author: afetmin
 * @Date: 2021-03-12 19:52:30
 * @LastEditTime: 2021-03-12 20:04:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JavaScript-Demo\promise.js
 */

class myPromise {
  constructor(fn) {
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    this.state = 'PENDING'
    this.value = ''

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.state === 'PENDING') {
      this.state = 'RESOLVED'
      this.value = value

      this.resolvedCallbacks.map(cb => cb(value))
    }
  }

  reject(value) {
    if (this.state === 'PENDING') {
      this.state = 'REJECTED'
      this.value = value

      this.rejectedCallbacks.map(cb => cb(value))
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'PENDING') {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
    }

    if (this.state === 'RESOLVED') {
      onFulfilled(this.value)
    }

    if (this.state === 'REJECTED') {
      onRejected(this.value)
    }
  }
}

let p = new myPromise((resolve, reject) => {
  resolve('yes')
})

p.then(value => console.log(value))