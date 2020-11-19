// packages/common/couponDetail/couponDetail.js
let app = getApp()
Page({

  // 优惠券ID
  id: null,
  /**
   * 页面的初始数据
   */
  data: {
    // 是否已登录
    login: false,

    // 优惠券详情
    detailInfo: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.setData({
      login: wx.getStorageSync('login')
    })
    this.getCouponDetail()
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
  // onShareAppMessage: function () {

  // },

  //------------------------------------------接口-----------------------------------------
  /**
   * 领取优惠券 接口
  */
  getCoupon: function() {
    let params = {
      token: wx.getStorageSync('token'),
      id: this.id
    }
    let that = this
    app.ols.getCoupon(params).then(d=>{
      if (d.data.code == 0) {
        wx.redirectTo({
          url: app.getPagePath('my_coupon'),
        })
      }
    })
  },

  /**
   * 获取优惠券详情
  */
  getCouponDetail: function() {
    let params = {
      token: wx.getStorageSync('token'),
      id: this.id
    }
    let that = this
    app.ols.getCouponDetail(params).then(d=>{
      if (d.data.code == 0) {
        let detailInfo = d.data.data
        that.setData({
          detailInfo: detailInfo
        })
      }
    })
  },

  //------------------------------------------  交互事件--------------------------------------
  /**
   * 获取手机号button 点击事件
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
        that.getButtonClciked()
      }
    })
  },

  /**
   * 立即领取按钮 点击事件
  */
  getButtonClciked: function() {
    this.getCoupon()
  }
})