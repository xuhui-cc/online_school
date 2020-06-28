// pages/my/my.js
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
    that.judge_login()    //登陆判断
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
    let that = this
    that.judge_login()  //登录判断
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

    let that = this;
    return {
      title: '领军网校', // 转发后 所显示的title
      path: '/pages/first_page/first_page', // 相对的路径
      imageUrl: '../../images/share1.png',  //用户分享出去的自定义图片大小为5:4,
      success: (res) => {    // 成功后要做的事情
        console.log("成功")

      },
      fail: function (res) {
        // 分享失败
        console.log(res, "分享失败")
      }
    }
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
              }
              console.log(params, "登录参数")
              app.ols.login(params).then(d => {
                console.log(d, "登录接口")
                if (d.data.code == 0) {
                  console.log("登陆成功")
                  wx.hideLoading()
                  // that.setData({
                  //   testlogin: true
                  // })
                  // wx.setStorageSync("testlogin", true)
                  that.setData({
                    login: true
                  })
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  // if (d.data.data.gid != null && d.data.data.gid != 0) {
                  //   console.log(d.data.data.gid, "d.data.data.gid")
                  //   wx.setStorageSync("gid", d.data.data.gid)
                    
                  // } else {
                  //   wx.setStorageSync("gid", that.data.gid)
                  // }
                } else {
                  console.log(d, "登录失败")
                  wx.showToast({
                    title: "登陆失败",
                    icon: 'none',
                    duration: 2000
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
  // 跳转到关于我们
  gourlabout: function () {
    wx.navigateTo({
      url: '../my_about/my_about',
    })   
  },

  // 跳转我的课程
  gourlCourse: function () {
    wx.navigateTo({
      url: '../my_course/my_course',
    })
  },
  // 跳转我的错题本
  gourlError: function () {
    wx.navigateTo({
      url: '../my_wrongbook/my_wrongbook',
    })
  },
  // 跳转我的订单
  gourlOrder: function () {
    wx.navigateTo({
      url: '../my_order/my_order',
    })
  },
})