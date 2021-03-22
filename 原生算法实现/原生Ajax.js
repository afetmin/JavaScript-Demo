/*
 * @Author: your name
 * @Date: 2021-03-13 08:15:27
 * @LastEditTime: 2021-03-13 09:06:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JavaScript-Demo\原生Ajax.js
 */

const ajax = {
  get(url, callback) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          console.log(xhr.responseText);
          callback(xhr.responseText);
        }
      }
    }
    xhr.send();
  },
  post(url, data, callback) {
    xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          console.log(xhr.responseText);
          callback(xhr.responseText);
        }
      }
    }
    xhr.send(data)
  }
}
