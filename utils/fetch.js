let pagePath = require('./pagePath.js')
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
    wx.showLoading({
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
            // 参数不合法
          }
          case 2: {
            // 无效请求方式
          }
          case 5: {
            // 数据查询返回空数据组
            resolve(res)
            if (showToast) {
              wx.showToast({
                title: "暂无数据",
                icon: 'none'
              })
            }
            break
          }
          case 20: {
            // token过期
            let gid = wx.getStorageSync('gid')
            wx.clearStorageSync()
            wx.setStorageSync('gid', gid)
            wx.reLaunch({
              url: pagePath.getPagePath('first_page'),
            })
            wx.showToast({
              title: '登录已失效',
              icon: 'none'
            })
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

function olsfetchUpload(api, path, filePath, log, showToast, loadingMsg) {
  if (showToast) {
    wx.showLoading({
      title: loadingMsg && loadingMsg != '' ? loadingMsg : '上传中',
    })
  }
  if (log) {
    console.log(log, '\n', path, "\n文件路径：\n", filePath)
  }
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${api}${path}`,
      filePath: filePath,
      name: 'file',
      method: 'POST',
      timeout: 1000*60*60,
      formData: {
        'file': filePath,
        "token": wx.getStorageSync("token"),
      },
      success(r) {
        if (showToast) {
          wx.hideLoading({
            success: (res) => {},
          })
        }
        if (log) {
          console.log(log, "\n返回数据：\n", r)
        }
        if (r.statusCode == 200) {
          let result = JSON.parse(r.data);
          if (result.code == 0) {
            resolve(result)
          } else {
            debugger
            if (showToast) {
              wx.showToast({
                title: result.msg && result.msg != '' ? result.msg : '上传失败',
                icon: 'none'
              })
            }
            resolve(result)
          }
        } else {
          if (showToast) {
            wx.showToast({
              title: '服务器数据错误',
              icon: 'none'
            })
          }
          resolve(r)
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


module.exports = { olsfetch, olsfetchpost, olsfetchUpload}
