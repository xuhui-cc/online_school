//app.js

const ols = require('./utils/ols.js')
const loginTool = require('./utils/loginTool.js')
const util = require('./utils/util.js')
const shareTool = require('./utils/shareTool.js')
const notificationCenter = require('./utils/WxNotificationCenter.js')
const pagePath = require('./utils/pagePath.js')

const notiNameDic = {
  userinfoChange: "userinfoChange"
}

App({

  ols: ols,
  loginTool: loginTool,
  util: util,
  shareTool: shareTool,
  notificationCenter: notificationCenter,
  notiNameDic: notiNameDic,
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow: function() {
    this.refreshUserInfo()
  },

  /**
   * 刷新用户信息
  */
  refreshUserInfo: function() {
    let login = wx.getStorageSync('login')
    if (!login) {
      return
    }
    let oldUserInfo = wx.getStorageSync('userinfo')
    let params = {
      token: oldUserInfo.token
    }
    let that = this
    ols.refreshUserInfo(params).then(d=>{
      if (d.data.code == 0) {
        // 角色更改后清空登录信息
        let info = d.data.data
        if (info) {
          let newRole = info.role_id
          // 角色变更 清空登录信息 跳转至first_page重新分发页面
          if (newRole != oldUserInfo.role) {
            that.clearLocalInfo()
          }

          let avatar = info.avatar
          let nick = info.nick
          let oldAvatar = oldUserInfo.avatar
          let oldNick = oldUserInfo.nick
          oldUserInfo.avatar = avatar
          oldUserInfo.nick = nick
          wx.setStorageSync('userinfo', oldUserInfo)
          if (avatar != oldAvatar || nick != oldNick) {
            // 名字/头像更改了 发送通知
            notificationCenter.postNotificationName(notiNameDic.userinfoChange, oldUserInfo)
          }
        }
      }
    })
  },

   /**
   * 清除本地数据
  */
  clearLocalInfo () {
    wx.clearStorage({
      fail:function(res) {
        console.log('清除本地信息失败', res)
      },
      complete: (res) => {
        console.log('清空数据完成，即将跳转至first_page')
        wx.reLaunch({
          url: pagePath.getPagePath('first_page'),
        })
      },
    })
  },

  /**
   * 获取页面路径
  */
  getPagePath(pageName) {
    return pagePath.getPagePath(pageName)
  },

  globalData: {
    userInfo: null,
    btn_buy:true
  }
})