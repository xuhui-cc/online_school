// packages/common/exchangeCode_C&C/exchangeCode_C&C.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_rightBag:false,
    // exchangeSucceed:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.setData({
      id:options.id,
      ewm:options.ewm
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
    that.rightBagInfo()   
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

  //会员详情页跳转
  to_vipDetail:function(){
    let that = this 
    wx.redirectTo({
      url: app.getPagePath('vip_detail') ,
    })
  },

  //自定义返回
  back:function(){
    if(that.data.ewm == 1){
      wx.switchTab({
        url: app.getPagePath('logs'),
      })
    }else{
      wx.navigateBack({
        delta: 0,
      })
    }
    
  },

  /*-------------------------------------------------------接口---------------------------------------- */
  //获取权益包信息
  rightBagInfo:function(){
    let that = this 
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.rightBagInfo(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          rightBagInfo:d.data.data
        })
        
      } 
    })
  },

  //兑换权益包
  exchangeRightBag:function(){
    let that = this 
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.exchangeRightBag(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          open_rightBag:true
        })
      } 
    })
  },

})