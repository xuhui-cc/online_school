// pages/open_course/open_course.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    special:["全部","6月20日","6月20日","6月20日","6月20日","6月20日","6月20日","6月20日","6月20日"],
    current_special:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //公开课
  swichNav_special: function (e) {
    var that = this
    var cur = e.target.dataset.current;
    if (cur == that.data.current_special){
      // console.log("专题当前选择项")
      that.setData({
        current_special: -1
      })
      
    }else{
      that.setData({
        current_special: cur
      })
     
    }
    
      
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
  }
})