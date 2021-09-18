const app = {
  fns: [],
  callback(ctx) {
    console.log(ctx)
  },
  use(fn) {
    this.fns.push(fn)
  },
  go(ctx) {
    let index = 0
    const next = () => {
      index++
    }
    this.fns.forEach((fn, idx) => {
      if (index === idx) fn(ctx, next)
    })
    index === this.fns.length && this.callback(ctx)
  },
}

app.use((ctx, next) => {
  ctx.name = "ranxiu"
  next()
})

app.use((ctx, next) => {
  ctx.gender = "girl"
  next()
})

app.go({})
