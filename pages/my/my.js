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
    if (options.isshare == 1) {
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare: options.isshare,
        gid: options.gid,
        login: wx.getStorageSync("login")
      })
     
      console.log("分享打开", that.data.isshare, that.data.gid)

    } else {
      that.judge_login()    //登陆判断
      
      console.log("非分享打开")
    }
  },

  my_vip: function () {
    let that = this
    if(that.data.login){
      var params = {
        "token": wx.getStorageSync("token"),
      }
    }else{
      var params = {
        // "token": wx.getStorageSync("token"),
      }
    }
    
    app.ols.v4_myVip(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          vip: d.data.data
        })
      }
      else {
        console.log(d.data.msg)
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
    let that = this
    that.judge_login()  //登录判断
    // that.my_vip()
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
      path: '/pages/my/my?isshare=1&gid=' + that.data.gid, // 相对的路径
      // path: '/pages/first_page/first_page', // 相对的路径
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
    if(that.data.login){
      that.my_vip()
    }
  },

  //vip详情页跳转
  to_vip:function(){
    let that = this
    wx.navigateTo({
      url: '../../pages/vip_detail/vip_detail',
    })
  },

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this

    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
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