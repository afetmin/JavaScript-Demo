String.prototype._indexof = function (s) {
  for (var i = 0; i < this.length - s.length; i++) {
    console.log(this.charAt(i), this.substring(i))
    if (this.charAt(i) === s.charAt(0) && this.substring(i, s.length) === s) {
      return i
    }
  }
  return -1
}
