// pages/teacherList/teacherList.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_bg:"https://onlineschool-1256006778.cos.ap-beijing.myqcloud.com/teacher_hade1.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if(options.type){
      that.setData({
        type:options.type
      })
    }
    if(options.gid){
      that.setData({
        gid:options.gid
      })
      wx.setStorageSync('gid', options.gid)
    }
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
    let paramStr = 'isshare=1'+ '&gid=' + wx.getStorageSync('gid') 
    return app.shareTool.getShareReturnInfo('0,1', 'teacherList', paramStr, this.shareImagePath ? this.shareImagePath : '', '名师介绍')
  },


  /**---------------------------------------------------功能----------------------------------------------- */

  //名师介绍页跳转
  to_teacherIntro:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: app.getPagePath('teacherIntro') + '?id=' + that.data.teacherList[xb].id,
    })
  },

  //返回
  back:function(){
    let that = this
    if(that.data.type == 1){
      wx.reLaunch({
        url: app.getPagePath('logs'),
      })
    }else{
      wx.reLaunch({
        url: app.getPagePath('index'),
      })
    }
    
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