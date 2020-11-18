// packages/common/rightCardDetail/rightCardDetail.js
let app = getApp()
Page({

  // 会员卡id
  id: null,

  /**
   * 页面的初始数据
   */
  data: {
    // 权益包基础信息
    baseInfo: null,

    // 优惠券权益列表
    couponList: [],

    // 优惠券总数
    couponTotalCount: 0,

    // 优惠券样式列表
    couponColorList: [
      {
        color: '#FF4E20',
        image: './resource/couponBg1.png'
      },
      {
        color: '#1BB059',
        image: './resource/couponBg2.png'
      },
      {
        color: '#20BAFF',
        image: './resource/couponBg3.png'
      }
    ],

    // 课程权益列表
    courseList: [],

    // 课程总数
    courseTotalCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.setData({
      login: wx.getStorageSync('login')
    })
    this.getSystemSize()
    this.getRightDetail()
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

  },

  //----------------------------------------私有方法--------------------------------------------------
  getSystemSize: function() {
    let systeminfo = wx.getSystemInfoSync()
    let safeAreaBottom = systeminfo.screenHeight - systeminfo.safeArea.bottom
    this.setData({
      safeAreaBottom: safeAreaBottom,
      screenWidth: systeminfo.screenWidth
    })
  },

  //------------------------------------------接口-----------------------------------------------------
  /**
   * 获取权益包详情
  */
  getRightDetail: function() {
    let params = {
      token: wx.getStorageSync('token'),
      id: this.id
    }
    let that = this
    app.ols.getRightDetail(params).then(d=>{
      if (d.data.code ==0) {

      }
    })
  },

  /**
   * 获取权益包
  */
  getRight: function() {
    let params = {
      token: wx.getStorageSync('token'),
      id: this.id
    }
    let that = this
    app.ols.getRightCard(params).then(d=>{
      if (d.data.code == 0) {
        wx.redirectTo({
          url: app.getPagePath('vip_detail'),
        })
      }
    })
  },

  //--------------------------------------------交互事件------------------------------------------
  /**
   * 领取按钮 点击事件
  */
  catchButtonClciked: function() {
    this.getVip()
  },

  /**
   * 立即领取 按钮 点击事件
  */
  catchButtonClciked: function() {
    this.getRight()
  },

  /**
   * 获取手机号 button  点击事件
  */
  getPhoneNumber: function(e) {
    let gid = wx.getStorageSync('gid')
    if (!gid) {
      gid = 0
    }
    let that = this
    app.loginTool.getPhoneNumber(e, gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.catchButtonClciked()
      }
    })
  }
})