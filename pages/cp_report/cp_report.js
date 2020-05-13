// pages/cp_report/cp_report.js
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
    that.setData({
      mid:mid
    })

    var params = {
      "token": wx.getStorageSync("token"),
      "mid": that.data.mid
    }
    app.ols.cp_report(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          report:d.data.data
        })
        console.log("测评报告接口调取成功")
      } else {
        console.log("测评报告接口==============" + d.data.msg)
      }
    })
  },


  to_cp_analysis:function(e){
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
      url: '../../pages/cp_analysis/cp_analysis?index=' + index + "&id=" + that.data.report.option[index].pid + "&eid=" + that.data.report.eid + "&mid=" + that.data.mid,
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