// pages/teacherList/teacherList.js
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
    that.getTeacherList()   //获取名师列表
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


  /**---------------------------------------------------功能----------------------------------------------- */
  //名师介绍页跳转
  to_teacherIntro:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: '../../pages/teacherIntro/teacherIntro',
    })
  },



  /**---------------------------------------------------接口----------------------------------------------- */

  //获取名师列表
  getTeacherList:function(){
    let that = this
    var params = {}
    app.ols.v5_getTeacherList(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          teacherList: d.data.data.lists
        })
      } else {
        // console.log("结课考试试卷结束记录接口==============" + d.data.msg)
      }
    })
  },




})