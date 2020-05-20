/*
*api    根地址
*path   请求路径
*params 请求参数
*return 返回任务的Promise
*/

function olsfetch(api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}${path}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}

function olsfetchpost(api, path, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}${path}`,
      data: Object.assign({}, params),
      method: 'POST',
      // header: { 'Content-Type': 'json' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: resolve,
      fail: reject
    })
  })
}

// function olsfetchpostimg(api, path, params) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: `${api}${path}`,
//       data: Object.assign({}, params),
//       method: 'POST',
//       header: { 'content-type': 'multipart/form-data' },
//       success: resolve,
//       fail: reject
//     })
//   })
// }


module.exports = { olsfetch, olsfetchpost}
