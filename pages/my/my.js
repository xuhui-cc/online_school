// pages/my/my.js
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