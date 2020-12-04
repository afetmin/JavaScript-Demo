;
(function () {
  class Game {
    constructor(map) {
      this.map = map
      this.food = new Food()
      this.snake = new Snake()
    }

    init() {
      this.food.init(this.map)
      this.snake.init(this.map)
      this.runSnake(this.food, this.map)
      this.bindKey()
    }

    runSnake(food, map) {
      let timer = setInterval(() => {
        this.snake.move(food, map)
        this.snake.init(map)

        const maxX = map.offsetWidth / this.snake.width
        const maxY = map.offsetHeight / this.snake.height

        let headX = this.snake.body[0].x
        let headY = this.snake.body[0].y

        if (headX < 0 || headX >= maxX) {
          clearInterval(timer)
          alert('游戏结束')
        }
        if (headY < 0 || headY >= maxY) {
          clearInterval(timer)
          alert('游戏结束')
        }

      }, 150);
    }
    bindKey() {
      document.addEventListener('keydown', e => {
        switch (e.key) {
          case 'ArrowDown':
            this.snake.direction = 'bottom'
            break
          case 'ArrowUp':
            this.snake.direction = 'top'
            break
          case 'ArrowRight':
            this.snake.direction = 'right'
            break
          case 'ArrowLeft':
            this.snake.direction = 'left'
            break
        }
      }, false)
    }
  }
  window.Game = Game
})()