// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否是老师
    isTeacher: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options = app.shareTool.getShareOption()
    let that = this
    if (options.isshare == 1) {
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare: options.isshare,
      })     
      console.log("分享打开", that.data.isshare, that.data.gid)
    } else {    
      console.log("非分享打开")
    }
    app.shareTool.shareTarget()
  },

  // my_vip: function () {
  //   let that = this
  //   if(that.data.login){
  //     var params = {
  //       "token": wx.getStorageSync("token"),
  //     }
  //   }else{
  //     var params = {
  //       // "token": wx.getStorageSync("token"),
  //     }
  //   }
    
  //   app.ols.v4_myVip(params).then(d => {
  //     console.log(d)
  //     if (d.data.code == 0) {
  //       that.setData({
  //         vip: d.data.data
  //       })
  //     }
  //     else {
  //       console.log(d.data.msg)
  //     }
  //   })
  // },

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
    this.getUserRoles()
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
    let paramStr = 'isshare=1&gid=' + that.data.gid
    return app.shareTool.getShareReturnInfo('0,1', 'my', paramStr, '/images/other/share1.png', '领军网校')
  },

  /*------------------------------------------------------接口----------------------------------------------------- */

  //获取会员卡信息
  viplist:function(){
    let that = this
    if(that.data.login){
      var params = {
        "token": wx.getStorageSync("token"),
      }
      app.ols.v5_viplist(params).then(d => {
        if (d.data.code == 0) {
          that.setData({
            vip:d.data.data
          })
        } else{
          that.setData({
            vip:''
          })
        }
      })
    }else{
      console.log("未登录")
      that.setData({
        vip:''
      })
    }
    
  },

  /**
   * 获取用户角色列表
  */
  getUserRoles: function() {
    if (!this.data.login && this.data.isTeacher != null) {
      return
    }
    let params = {
      token: wx.getStorageSync('token')
    }
    let that = this
    app.ols.getRoles(params).then(d=>{
      if (d.data.code == 0) {
        let roleDic = d.data.data[0]
        if(roleDic[3]) {
          that.setData({
            isTeacher: true
          })
        } else {
          that.setData({
            isTeacher: false
          })
        }
      }
    })
  },

  //登录判断
  judge_login: function () {
    let that = this
    that.setData({
      login: wx.getStorageSync("login"),
      gid: wx.getStorageSync("gid")
    })
    console.log(that.data.login, "that.data.login")
    console.log(that.data.gid, "that.data.gid")
    if(that.data.login){
      // that.my_vip()
      
    }
    that.viplist()
  },

  //vip详情页跳转
  to_vipDetail:function(){
    let that = this
    wx.navigateTo({
      url: app.getPagePath('vip_detail'),
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
        that.onShow()
      }
    })
  },
  // 跳转到关于我们
  gourlabout: function () {
    wx.navigateTo({
      url: app.getPagePath('my_about'),
    })   
  },

    // 跳转到关于我们
    studyLog: function () {
      var userinfo = wx.getStorageSync('userinfo')
      wx.navigateTo({
        url: app.getPagePath('study_record') + '?sid=' + userinfo.id,
      })   
    },

  // 跳转我的课程
  gourlCourse: function () {
    wx.navigateTo({
      url: app.getPagePath('my_course'),
    })
  },
  // 跳转我的错题本
  gourlError: function () {
    wx.navigateTo({
      url: app.getPagePath('my_wrongbook'),
    })
  },
  // 跳转我的订单
  gourlOrder: function () {
    wx.navigateTo({
      url: app.getPagePath('my_order'),
    })
  },
  //跳转我的优惠券
  to_myCoupon:function(){
    wx.navigateTo({
      url: app.getPagePath('my_coupon'),
    })
  },

  //跳转我的学情
  to_learningSituation:function(){
    wx.navigateTo({
      url: app.getPagePath('learningSituation'),
    })
  },

  /**
   * 切换到老师角色
  */
  changeToTeacherRole: function() {
    wx.reLaunch({
      url: app.getPagePath('teacher_home'),
      success(res) {
        wx.setStorageSync('role', 3)
      }
    })
  },
})