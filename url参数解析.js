var url = 'http://www.baidu.com?url=www.baidu.com&a=1&a=2&obj=%7B%22a%22%3A%22b%22%7D'

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