// pages/my_order/my_order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finish: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.order_all(params).then(d => {
      
      if (d.data.code == 0) {
        console.log(d.data.msg)
        that.setData({
          order:d.data.data
        })
      }
      else if (d.data.code == 5){
        console.log(d.data.msg)
      
          that.setData({
            order: ''
          })
        
      }else {
        console.log(d.data.code, "code", d.data.msg)
      }
    })
  },

  finish_select: function (e) {
    let that = this
    var finish = e.currentTarget.dataset.finish
    that.setData({
      finish: finish
    })

  },

  to_order_detail: function () {
    let that = this
    wx.navigateTo({
      url: '../../pages/order_detail/order_detail',
    })
  },

  to_pay: function () {
    let that = this
    wx.navigateTo({
      url: '../../pages/pay/pay',
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