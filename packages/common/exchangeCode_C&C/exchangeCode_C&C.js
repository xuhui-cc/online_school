// packages/common/exchangeCode_C&C/exchangeCode_C&C.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_rightBag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.setData({
      id:options.id
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

  },

  /*--------------------------------------------------------方法--------------------------------------- */
  to_vipDetail:function(){
    let that = this 
    wx.redirectTo({
      url: app.getPagePath('vip_detail') ,
    })
  },

  sign_rightBag:function(){
    let that = this 
    that.setData({
      open_rightBag:true
    })
  },

  back:function(){
    wx.navigateBack({
      delta: 0,
    })
  }
})