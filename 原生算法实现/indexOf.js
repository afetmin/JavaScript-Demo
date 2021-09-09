String.prototype._indexof = function (s) {
  for (var i = 0; i < this.length - s.length; i++) {
    if (
      this.charAt(i) === s.charAt(0) &&
      this.substring(i, i + s.length) === s
    ) {
      return i
    }
  }
  return -1
}

const s = "hello"
console.log(s._indexof("ll"))
