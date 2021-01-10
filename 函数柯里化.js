// function add() {
//   let args = [...arguments] || [].slice.call(arguments)
//   // 递归把所有的参数存到args里面
//   let _adder = (...newArgs) => {
//     return add(...[...args, ...newArgs])
//   }
//   _adder.toString = () => {
//     return args.reduce((a, b) => {
//       return a + b
//     })
//   }

//   return _adder
// }

function currying(fn) {
  var allArgs = [];

  return function next() {
    var args = [].slice.call(arguments);

    if (args.length > 0) {
      allArgs = allArgs.concat(args);
      return next;
    } else {
      return fn.apply(null, allArgs);
    }
  }
}
let add = currying(function () {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
});

add(1)(2,3)()