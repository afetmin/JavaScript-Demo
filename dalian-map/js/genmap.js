var result = [],
  points = [],
  all_paths = [],
  data,
  pls = [],
  markers = []

// var opts = {
//   width: 250, // 信息窗口宽度
//   height: 80, // 信息窗口高度
//   title: '信息窗口', // 信息窗口标题
//   enableMessage: true, //设置允许信息窗发送短息
// }

// 判断数组内是否含有字符串
Array.prototype.contains = function (obj) {
  var index = this.length
  while (index--) {
    if (this[index] === obj) {
      return true
    }
  }
  return false
}

var bmap = new BMap.Map('allmap')
bmap.centerAndZoom(new BMap.Point(121.62, 38.92), 13)
bmap.enableScrollWheelZoom(true)
bmap.addControl(new BMap.NavigationControl({
  anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
  type: BMAP_NAVIGATION_CONTROL_SMALL
}))

$.ajaxSettings.async = false
$.getJSON('json/dalian_track.json', (res) => {
  data = res
})

$('#clear').click(() => {
  pls.forEach((pl) => {
    bmap.removeOverlay(pl)
  })
})
getAllPath()
// 所有病例的路径
function getAllPath() {
  $.each(data, (item) => {
    $.each(data[item], (date) => {
      // 二维列表
      result = result.concat([data[item][date]])
      let path = []
      data[item][date].forEach((path_point) => {
        let pos = path_point.split(',')
        path.push(new BMap.Point(pos[0], pos[1]))
      })
      all_paths.push(path)
    })
  })
}
// console.log(result)
// 随机生成一种颜色
function getColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

// 添加一条路径
function addPolyline(path) {
  var pl = new BMap.Polyline(path, {
    strokeColor: getColor(),
    strokeWeight: 4,
    strokeOpacity: 0.8,
  })
  // 所有画的线
  pls.push(pl)
  bmap.addOverlay(pl)
}

// 添加marker和marker事件
function addMarker(point, title = '') {
  let marker = new BMap.Marker(point, { title: title })
  // 添加marker点击事件
  marker.addEventListener('click', function () {
    let paths = []
    let lnglat = this.point.lng + ',' + this.point.lat
    console.log(lnglat)
    result.forEach((path) => {
      if (path.contains(lnglat)) {
        paths = paths.concat([path])
      }
    })
    // 先清除其他线
    if ($('input:radio:checked').val() === '1') {
      pls.forEach((pl) => {
        bmap.removeOverlay(pl)
      })
    }
    // 所有经过这个点的路径画出来
    paths.forEach((path) => {
      let poly = []
      path.forEach((p) => {
        poly.push(new BMap.Point(p.split(',')[0], p.split(',')[1]))
      })
      // poly.forEach((p) => {
      //   let m = new BMap.Marker(p)
      //   addClickHandler('1', m)
      // })
      addPolyline(poly)
    })
  })
  markers.push(marker)
  bmap.addOverlay(marker)
}
// 展开
var topoints = _.flatten(result)
topoints.forEach((loc) => {
  let pos = loc.split(',')
  points.push(new BMap.Point(pos[0], pos[1]))
})

function addAllMarker() {
  points.forEach((point) => {
    addMarker(point)
  })
}
addAllMarker()
var markerClusterer = new BMapLib.MarkerClusterer(bmap, {
  markers: markers,
  minClusterSize: 3,
})

// function addClickHandler(content, marker) {
//   marker.addEventListener('dbclick', function (e) {
//     openInfo(content, e)
//   })
// }
// function openInfo(content, e) {
//   let p = e.target
//   let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
//   let infoWindow = new BMap.InfoWindow(content, opts) // 创建信息窗口对象
//   bmap.openInfoWindow(infoWindow, point) //开启信息窗口
// }
