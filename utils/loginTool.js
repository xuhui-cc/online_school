
const ols = require('./ols')

function getPhoneNumber(e, gid, callback) {
  var that = this
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

function login(params, callback) {
  console.log(params, "登录参数")
  ols.login(params).then(d => {
    console.log(d, "登录接口")
    if (d.data.code == 0) {
      console.log("登陆成功")
      wx.hideLoading()
      wx.setStorageSync("login", true)
      wx.setStorageSync("token", d.data.data.token)
      typeof callback == "function" && callback(true, "登录成功")
    } else {
      console.log(d, "登录失败")
      wx.showToast({
        title: "登陆失败，请重新登录",
        icon: 'none',
        duration: 3000
      })
      console.log(d.data.msg, "登录失败提示")


      wx.hideLoading()
      typeof callback == "function" && callback(false, "登录失败")
    }
  })
}

module.exports = {
  getPhoneNumber,

}