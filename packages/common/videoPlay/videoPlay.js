// packages/common/videoPlay/videoPlay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频播放地址
    url: '',
    // 播放器高度
    playerHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          playerHeight: result.windowHeight
        })
      },
    })

    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('videoPlay', function(data){
      console.log('视频播放地址:', data.url)
      that.setData({
        url: data.url
      })
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