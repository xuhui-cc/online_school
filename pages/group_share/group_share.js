// pages/group_share/group_share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      kid: options.kid,
      tid: options.tid,
      gid: options.gid,
      login: wx.getStorageSync("login")
    })
    wx.setStorageSync("gid", options.gid)
    console.log(that.data.kid,that.data.tid,that.data.gid,that.data.login)
    if(that.data.login){
      that.share()
    }
    
  },

  //分享判断
  share:function(){
    let that = this 
    var params = {
      "token": wx.getStorageSync("token"),
      "url": "lessongroup",
      "id": that.data.tid,
      
    }
    // "token": "b8bf2a0c1497a24393363005d88901c4e3b8a990",
    //   "url": "lessongroup",
    //   "id": 8,
      
    // }
    console.log(params, "分享参数")
    app.ols.group_share3(params).then(d => {
      console.log(d, "分享数据")
      var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      if(d.data.data.is_buy == 0)
      that.setData({
        hid:d.data.data.group,
      })
      if (d.data.code == 0) {
        console.log("分享成功")
      } else {
        console.log("分享失败==============" + d.data.msg)
      }
    })
  },

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    wx.login({
      success: res => {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
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
                "gid": that.data.gid
                // "gid": 1
              }
              console.log(params, "登录参数")
              app.ols.login(params).then(d => {
                console.log(d, "登录接口")
                if (d.data.code == 0) {
                  console.log("登陆成功")
                  wx.hideLoading()

                  that.setData({
                    login: true
                  })
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  // that.onShow()
                  that.share()
                } else {
                  console.log(d, "登录失败")
                  wx.showToast({
                    title: d.data.msg,
                    icon: 'none',
                    duration: 3000
                  })
                  console.log(d.data.msg, "登录失败提示")


                  wx.hideLoading()
                }
              })
            }
          })
        }
      }
    })
  },


  //登录判断
  judge_login: function () {
    let that = this
    that.setData({
      // testlogin: wx.getStorageSync("testlogin"),
      login: wx.getStorageSync("login"),
      gid: wx.getStorageSync("gid")
    })
    // console.log(that.data.testlogin, "that.data.testlogin")
    console.log(that.data.login, "that.data.login")
    console.log(that.data.gid, "that.data.gid")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})