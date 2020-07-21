// pages/share_analysis/share_analysis.js
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
      // kid: options.kid,
      id: options.pid,
      gid: options.gid,
      login: wx.getStorageSync("login")
    })
    // wx.setStorageSync("gid", options.gid)
    // console.log(that.data.kid,that.data.tid,that.data.gid,that.data.login)
    
  },

  getquestion:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "url": "questionanalysis",
      "id": that.data.id,
      // "id": 491,
    }
    console.log(params, "分享参数")
    app.ols.group_share3(params).then(d => {
      console.log(d, "分享数据")
      if(d.data.code == 0){
        that.setData({
          analysis: d.data.data.question,
          mark:d.data.data.mark
        })
      }else{
        console.log("code==",d.data.code,"msg",d.data.msg)
      }
    })
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
    if(wx.getStorageSync("login")){
      this.getquestion()
    }
    
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
                  that.getquestion()
                  // that.share()
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