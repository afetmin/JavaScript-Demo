;
(function () {
  let elements = []
  class Snake {
    constructor(width = 20, height = 20, direction = 'right') {
      this.width = width
      this.height = height
      this.direction = direction

      this.body = [{
          x: 3,
          y: 2,
          color: 'red'
        }, // 头
        {
          x: 2,
          y: 2,
          color: 'orange'
        }, // 身体
        {
          x: 1,
          y: 2,
          color: 'orange'
        }, // 身体
      ]

    }
    init(map) {
      Snake.remove()
      for (let i = 0; i < this.body.length; i++) {
        let obj = this.body[i]
        let div = document.createElement('div')
        map.appendChild(div)
        div.style.position = 'absolute'
        div.style.width = this.width + 'px'
        div.style.height = this.height + 'px'
        div.style.left = obj.x * this.width + 'px'
        div.style.top = obj.y * this.height + 'px'
        div.style.backgroundColor = obj.color
        elements.push(div)
      }
    }

    move(food, map) {
      //改变小蛇的身体的坐标位置
      let i = this.body.length - 1; //2
      for (; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
      //判断方向---改变小蛇的头的坐标位置
      switch (this.direction) {
        case "right":
          this.body[0].x += 1;
          break;
        case "left":
          this.body[0].x -= 1;
          break;
        case "top":
          this.body[0].y -= 1;
          break;
        case "bottom":
          this.body[0].y += 1;
          break;
      }

      //判断有没有吃到食物
      //小蛇的头的坐标和食物的坐标一致
      var headX = this.body[0].x * this.width;
      var headY = this.body[0].y * this.height;
      //判断小蛇的头的坐标和食物的坐标是否相同
      if (headX === food.x && headY === food.y) {
        //获取小蛇的最后的尾巴
        var last = this.body[this.body.length - 1];
        //把最后的蛇尾复制一个,重新的加入到小蛇的body中
        this.body.push({
          x: last.x,
          y: last.y,
          color: last.color
        });
        //把食物删除,重新初始化食物
        food.init(map);
      }
    }
    static remove() {
      let i = elements.length - 1
      for (; i >= 0; i--) {
        let ele = elements[i]
        ele.parentNode.removeChild(ele)
        elements.splice(i, 1)
      }
    }
  }
  window.Snake = Snake
})()