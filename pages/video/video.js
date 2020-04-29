// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // getvideo_info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var id = options.id
    console.log(id)
    //课程视频接口
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.getvideo(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo: d.data.data
        })
        
      } else {
        console.log("课程视频接口==============" + d.data.msg)
      }
    })
    //获取视频断点时间
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.getvideo_info(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo_info: d.data.data
        })

      } else if (d.data.code == 5) {
        that.setData({
          getvideo_info: 0
        })
        console.log("课程视频未学习")
      } else {
        console.log("课程视频断点时间接口==============" + d.data.msg)
      }
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