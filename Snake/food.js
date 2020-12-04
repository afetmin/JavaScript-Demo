;
(function () {
  let elements = []
  class Food {
    constructor(x = 0, y = 0, width = 20, height = 20, color = 'blue') {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = color
    }

    init(map) {
      // 生成食物前需要先将屏幕食物删除
      Food.remove()

      let div = document.createElement('div')
      map.appendChild(div)
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      div.style.backgroundColor = this.color
      div.style.position = 'absolute'
      this.x = Math.floor(Math.random() * (map.offsetWidth / this.width)) * this.width
      this.y = Math.floor(Math.random() * (map.offsetHeight / this.height)) * this.height
      div.style.top = this.y + 'px'
      div.style.left = this.x + 'px'

      elements.push(div)
    }
    // 将所有食物删除
    static remove() {
      for (let i = 0; i < elements.length; i++) {
        let ele = elements[i]
        ele.parentNode.removeChild(ele)
        elements.splice(i, 1)
      }
    }
  }
  window.Food = Food
})()