// packages/student/vip/comment/myVipCard/myVipCard.js
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
    that.getVipList()   //会员卡列表
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
  // onShareAppMessage: function () {

  // },
  /*--------------------------------------------------------------接口------------------------------------------ */
  getVipList:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.getVipList(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          vipList:d.data.data
        })
        
      } 
      else{
        
      }
    })
  },
  /*-------------------------------------------------------方法------------------------------------------------ */
  to_rightDetail:function(e){
    let that = this

    wx.navigateTo({
      url: app.getPagePath('vipCardDetail') + '?id=' + e.currentTarget.dataset.id,
    })
  },
})