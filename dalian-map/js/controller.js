function getTime() {
  let time = new Date()
  let year = time.getFullYear()
  let month =
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
  let date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
  let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
  let minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
  let seconds =
    time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
  let time_str = `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}`
  $('#time').html(time_str)
}
setInterval(getTime, 1000)

// 隐藏提示
function clearTips() {
  $('#option span').hide(300)
}

setTimeout(clearTips, 1000 * 12)
