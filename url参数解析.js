let url =
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

/**
 * 
 * @param {*} url
 * @example 
 * let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
 * parseParam(url)
* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
 */
function parseUrlParam(url) {
  const paramStr = url.split("?")[1]
  const paramArr = paramStr.split("&")
  let paramObj = {}
  paramArr.forEach((param) => {
    if (/=/.test(param)) {
      let [key, val] = param.split("=")
      val = decodeURIComponent(val) // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val // 转为数字
      if (paramObj.hasOwnProperty(key)) {
        paramObj[key] = [].concat(paramObj[key], val)
      } else {
        paramObj[key] = val
      }
    } else {
      paramObj[param] = true
    }
  })
  return paramObj
}

url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled"

console.log(parseUrlParam(url))
