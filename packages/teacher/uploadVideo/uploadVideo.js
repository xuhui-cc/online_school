// pages/uploadVideo/uploadVideo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // h5地址
    url: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    this.setData({
      url: app.ols.getRecordUploadPath_h5()
    })
    // console.log(this.data.url)
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
    return app.shareTool.getShareReturnInfo('all', 'first_page')
  },

  // -------------------------------------------------交互事件-----------------------------------------
  /**
   * 获取h5发送的数据
  */
  bindmessage: function (e) {
    console.log("h5发送的数据：\n", e)
    let url = e.detail.data[0].url
    let naviPages = getCurrentPages();
    if (naviPages.length >= 2) {
      let lastPage = naviPages[naviPages.length -2]
      lastPage.appendFile(url)
    }

  },

  loadSuccess: function(e) {
    // wx.hideLoading({
    //   success: (res) => {},
    // })
  },

  loadError: function(e) {
    // wx.hideLoading({
    //   success: (res) => {},
    // })
    console.log(e)
  }
})