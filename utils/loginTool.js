
const ols = require('./ols')
const pagePath = require('./pagePath.js')

var openid = null
var session_key = null

function getPhoneNumber(e, gid, callback) {
  if (e.detail.errMsg != "getPhoneNumber:ok") {
    return
  }
  
  login(e, gid, callback)
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
function login(e, gid, callback) {
  let iv = encodeURIComponent(e.detail.iv);
  let encryptedData = encodeURIComponent(e.detail.encryptedData);
  var params = {
    session_key: session_key,
    openid: openid,
    "iv": iv,
    "encryptedData": encryptedData,
    "gid": gid
  }
  ols.login(params).then(d => {
    if (d.data.code == 0) {
      let userinfo = d.data.data
      wx.setStorageSync("login", true)
      wx.setStorageSync("token", userinfo.token)
      wx.setStorageSync('userinfo', userinfo)
      wx.setStorageSync('gid', userinfo.gid)

      let role = wx.getStorageSync('role')
      if (userinfo.role == 2) {
        role = 2
      }
      if (!role) {
        wx.setStorageSync('role', 1)
        role = 1
      }
      switch(role * 1) {
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
          // wx.reLaunch({
          //   url: pagePath.getPagePath('teacher_home'),
          // })
          typeof callback == "function" && callback(true, "登录成功")
          break
        }
      }
    } else {
      firstLaunch()
      typeof callback == "function" && callback(false, "登录成功, 请重试")
    }
  })
}

/**
 * 加载初始数据
*/
function firstLaunch(callback) {
  wx.login({
    success(res) {
      let code = res.code
      getOpenidAndSessionKey(code)
    },
    fail(res) {
      typeof callback == 'function' && callback(false)
    }
  })
}

/**
 * 通过code获取用户openid、session_key
*/
function getOpenidAndSessionKey(code, callback) {
  let params = {
    code: code
  }
  let that = this
  ols.getLoginUserIdentify(params).then(d=>{
    if (d.data.code == 0) {
      openid = d.data.data.openid
      session_key = d.data.data.session_key
      typeof callback == 'function' && callback(true)
    } else {
      typeof callback == 'function' && callback(false)
    }
  })
}

module.exports = {
  getPhoneNumber,
  firstLaunch,
}