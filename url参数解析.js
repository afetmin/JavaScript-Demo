var url =
  "http://www.baidu.com?url=www.baidu.com&a=1&a=2&obj=%7B%22a%22%3A%22b%22%7D"

function parseUrl(url) {
  // url = decodeURIComponent(url).split('?')[1]
  // let params = url.split('&')
  // let res = {}
  // for (let each of params) {
  //     let [key, value] = each.split('=')
  //     res[key] = value
  // }
  // return res

  url = new URL(url)
  return url.searchParams
}

console.log(parseUrl(url))

function parseParam(url) {
  const paramsStr = /.+?(.+)$/.exec(url)[1]
  const paramsArr = paramsStr.split("&")
  let paramsObj = {}
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      let [key, val] = param.split("=")
      val = decodeURIComponent(val)
      val = /^\d+$/.test(val) ? parseFloat(val) : val
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val)
      } else {
        paramsObj[key] = true
      }
    }
  })
  return paramsObj
}
console.log(parseParam(url))
