self.onmessage = (e) => {
  let [a, b] = e.data
  a = parseInt(a)
  b = parseInt(b)
  const c = a + b
  self.postMessage(c)
}
