Function.prototype.call = function (context, ...args) {
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this

  let result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.apply = function (context, args) {
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this

  let result = context[fn](...args)
  delete context[fn]
  return result
}

Function.prototype.bind = function (context, ...args) {
  context = context || window
  const fn = Symbol('fn')
  context[fn] = this

  return (..._args) => {
    args = args.concat(_args)
    let result = context[fn](...args)
    delete context[fn]
    return result
  }
}