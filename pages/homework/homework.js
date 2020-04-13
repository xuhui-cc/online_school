// pages/homework/homework.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cs: ["初三", "高三 文科", "高三 理科"],
    currentTab: 0,
    clientHeight:1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //手动滑页
  swiperchange: function (e) {
    var that = this
    var current = Number(e.detail.current)  // 当前的
    var currentTab = Number(this.data.currentTab); //上一个
    console.log(current)
    console.log(currentTab)
    //获取试题
    // var sl_list = this.data.sl_list;
    // var length = sl_list.length;
    
    that.setData({
      currentTab: current
    })
    
    // if (current < currentTab) {
    //   current = current - 1
      
    // }

   
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