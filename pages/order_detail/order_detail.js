// pages/order_detail/order_detail.js
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
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.getdefault(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        var adress = d.data.data.prov + d.data.data.city + d.data.data.area + d.data.data.title
        
        that.setData({
          name: d.data.data.name,
          phone: d.data.data.phone,
          adress: adress
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  to_pay: function () {
    let that = this
    wx.navigateTo({
      url: '../../pages/pay/pay',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.getdefault(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        var adress = d.data.data.prov + d.data.data.city + d.data.data.area + d.data.data.title
        that.setData({
          have_adr: true
        })
        that.setData({
          name: d.data.data.name,
          phone: d.data.data.phone,
          adress: adress
        })
      } else {
        that.setData({
          have_adr: false
        })
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