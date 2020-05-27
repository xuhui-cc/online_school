// pages/test_report/test_report.js
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
    var mid = options.mid
    console.log(mid)
    that.get_report(mid)
  },

  //获取结课考试报告
  get_report:function(mid){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "mid": mid,
    }
    app.ols.test_report(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)

        console.log("结课考试报告接口调取成功")
      } else {
        console.log("结课考试报告接口==============" + d.data.msg)
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