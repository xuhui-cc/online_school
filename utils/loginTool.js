
const ols = require('./ols')
const pagePath = require('./pagePath.js')

function getPhoneNumber(e, gid, callback) {
  var that = this
  if (e.detail.errMsg != "getPhoneNumber:ok") {
    return
  }
  wx.showLoading({
    title: '登录中...',
  })
  wx.login({
    success(res) {
      console.log("cccs.code" + res.code)
      let iv = encodeURIComponent(e.detail.iv);
      let encryptedData = encodeURIComponent(e.detail.encryptedData);
      let code = res.code
      var params = {
        "code": code,
        "iv": iv,
        "encryptedData": encryptedData,
        "gid": gid
      }
      login(params, callback)
    },
    fail (res) {
      wx.hideLoading({
        success: (r) => {
          wx.showToast({
            title: '登录失败\n'+res.errMsg,
          })
        },
      })
    }
  })
}

/**
 * 登录接口
 * 参数：
 *    iv : 用户微信iv值
 *    code : 用户微信code值
 *    encryptedData : 用户微信登录返回的encryptedData值
 *    gid : 年级ID
 * 返回值：
 *    role：1-学生 2-家长 3-老师
*/
function login(params, callback) {
  console.log(params, "登录参数")
  ols.login(params).then(d => {
    wx.hideLoading()
    console.log(d, "登录接口")
    if (d.data.code == 0) {
      console.log("登陆成功")
      wx.setStorageSync("login", true)
      wx.setStorageSync("token", d.data.data.token)
      let userinfo = d.data.data
      wx.setStorageSync('userinfo', userinfo)
      switch(userinfo.role * 1) {
        case 1: {
          // 学生
          typeof callback == "function" && callback(true, "登录成功")
          break
        }
        case 2: {
          // 家长
          wx.reLaunch({
            url: pagePath.getPagePath('parent_childList'),
          })
          break
        }
        case 3: {
          // 老师
          wx.reLaunch({
            url: pagePath.getPagePath('teacher_studentList'),
          })
          break
        }
      }
    } else {
      console.log(d, "登录失败")
      wx.showToast({
        title: "登陆失败，请重新登录",
        icon: 'none',
        duration: 3000
      })
      typeof callback == "function" && callback(false, "登录失败")
    }
  })
}

module.exports = {
  getPhoneNumber,

}