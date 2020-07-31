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

function olsfetchpost(api, path, params, log, showToast, loadingMsg) {
  if (showToast) {
    wx.showToast({
      title: loadingMsg && loadingMsg != '' ? loadingMsg : '加载中',
    })
  }
  if (log) {
    console.log(log, '\n', path, "\n参数：\n", params)
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}${path}`,
      data: Object.assign({}, params),
      method: 'POST',
      // header: { 'Content-Type': 'json' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success (res) {
        if (showToast) {
          wx.hideLoading({
            success: (res) => {},
          })
        }
        if (log) {
          console.log(log, "\n返回数据：\n", res)
        }
        let code = res.data.code*1
        switch(code){
          case 0: {
            // 请求成功
            resolve(res)
            break
          }
          case 1: {
            // 参数无效
            resolve(res)
            if (showToast) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
            break
          }
          case 2: {
            // token过期
            let gid = wx.getStorageSync('gid')
            wx.clearStorageSync()
            wx.setStorageSync('gid', gid)
            wx.reLaunch({
              url: '../pages/first_page/first_page',
            })
            break
          }
          case 3: {
            // 数据验证失败
          }
          case 4: {
            // 无请求数据
          }
          case 5: {
            resolve(res)
            if (showToast) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
            break
          }
          default: {
            resolve(res)
            if (showToast) {
              wx.showToast({
                title: '数据有误',
                icon: 'none'
              })
            }
          }
        }
      },
      fail (res) {
        if (showToast) {
          wx.hideLoading({
            success: (res) => {},
          })
        }
        if (log) {
          console.log(log, '请求失败：\n', res)
        }
        if (showToast){
          wx.showToast({
            title: '请求失败',
            icon: "none"
          })
        }
      }
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
