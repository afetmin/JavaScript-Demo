function add() {
  let args = [...arguments] || [].slice.call(arguments)
  // 递归把所有的参数存到args里面
  let _adder = (...newArgs) => {
    return add(...[...args, ...newArgs])
  }
  _adder.toString = () => {
    return args.reduce((a, b) => {
      return a + b
    })
  }

  return _adder
}

console.log(add(1)(2)(3).toString())
console.log(add(1, 2, 3).toString())