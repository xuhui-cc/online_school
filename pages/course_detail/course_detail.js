// pages/course_detail/course_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //course_info.pay_status : 1 未购买；2已购买
    currentData: 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var login = wx.getStorageSync("login")
    if(login){
      that.setData({
        login: true
      })
    }else{
      that.setData({
        login: false
      })
    }
    
    var kid = options.kid
    that.setData({
      kid:kid
    })

    //课程详情介绍接口
    var params = {
      "token": wx.getStorageSync("token"),
      "kid":kid
    }
    app.ols.course_info(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          course_info: d.data.data
        })
        var cs = "course_info.content"
        that.setData({
          [cs]: that.data.course_info.content.replace(/<img/gi, '<img style="max-width:375px;height:auto;display:block"')
        })
      }else{
        console.log("课程详情介绍接口==============" + d.data.msg)
      }
    })

    
  },

  //看视频
  to_video:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var id = that.data.course_cata.lists[xb].id
    wx.navigateTo({
      url: '../../pages/video/video?id=' + id,
    })
  },

  //查看报告
  to_end_report:function(){
    let that = this
    wx.navigateTo({
      url: '../../pages/end_report/end_report',
    })
  },


  //课后作业
  to_homework: function () {
    let that = this
    wx.navigateTo({
      url: '../../pages/homework/homework',
    })
  },

  //去支付
  to_pay:function(){
    let that = this
    wx.navigateTo({
      url: '../../pages/pay/pay',
    })
  },


  //课程讲义跳转
  to_course_file:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    // console.log(that.data.course_cata.lists[xb].id)
    var id = that.data.course_cata.lists[xb].id
    wx.navigateTo({
      url: '../../pages/course_file/course_file?id=' + id,
    })
  },

  checkCurrent: function (e) {
    const that = this
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    if (e.target.dataset.current == 1){
      //课程详情介绍接口
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
      app.ols.course_cata(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course_cata: d.data.data
          })
          console.log("课程目录接口调取成功")
        } else {
          console.log("课程目录==============" + d.data.msg)
        }
      })

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
                "encryptedData": encryptedData
              }
              console.log(params)
              app.ols.login(params).then(d => {

                if (d.data.code == 0 ) {
                  console.log("登陆成功")
                  wx.hideLoading()
                  
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  that.onLoad()


                } else {
                  wx.showToast({
                    title: "登陆失败",
                    icon: 'none',
                    duration: 2000
                  })
                  console.log(d.data.msg)
                  // that.setData({
                  //   login: false
                  // })

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