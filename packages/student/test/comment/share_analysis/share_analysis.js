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
        var replace = '<img style="max-width:93%;height:auto;display: initial !important;"'
        d.data.data.question.title = d.data.data.question.title.replace(/<img/gi, replace).replace(/< </gi, "&lt; <").replace(/> >/gi, "&gt; >").replace(/<</gi, "&lt; <").replace(/>>/gi, "&gt; >")
        // if (d.data.data.question.mark.mark != null){
        //   d.data.data.question.mark.mark = d.data.data.question.mark.mark.replace(/<img/gi, replace)
        // }
        if (d.data.data.question.answer != null) {
          d.data.data.question.answer = d.data.data.question.answer.replace(/<img/gi, replace)
        }
        if (d.data.data.question.note != null) {
          d.data.data.question.note = d.data.data.question.note.replace(/<img/gi, replace)
        }
        if (d.data.data.question.a != null) {
          d.data.data.question.a = d.data.data.question.a.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")
        }

        if (d.data.data.question.b != null) {
          d.data.data.question.b = d.data.data.question.b.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")
        }

        if (d.data.data.question.c != null) {
          d.data.data.question.c = d.data.data.question.c.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")

        }
        if (d.data.data.question.d != null) {
          d.data.data.question.d = d.data.data.question.d.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")

        }
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
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.getquestion()
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
    return app.shareTool.getShareReturnInfo('all', 'first_page')
  }
})