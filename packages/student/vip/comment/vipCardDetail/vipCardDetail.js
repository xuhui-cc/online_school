// packages/student/vip/comment/vipCardDetail/vipCardDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  coursePage:1,
  pageNum:10,

  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      vipId:options.id
    })
    that.getVipInfo()
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
  onReachBottom: function() {
    let that = this 
    console.log("触底")
    if(that.data.courseList.length < that.data.vipInfo.count){
      that.coursePage += 1
      that.getVipInfo()
    }
    else{
      // wx.showToast({
      //   title: '没有更多咯',
      // })
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  
  /*---------------------------------------------------------接口------------------------------------------- */
  //获取会员卡详情
  getVipInfo:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":that.data.vipId,
      "num":that.pageNum,
      "page":that.coursePage
    }
    app.ols.getVipInfo(params).then(d => {
      if (d.data.code == 0) {
        if(that.coursePage == 1){
          that.setData({
            vipInfo:d.data.data,
            courseList:d.data.data.lists.course,
            // total:d.data.data.count
          })
        }else{
          var finalList = that.data.courseList.concat(d.data.data.lists.course)
          that.setData({
            courseList:finalList
          })
        }
        
      } 
      else{
        
      }
    })
  },
  /*----------------------------------------------------------方法------------------------------------------------- */
  couponUes:function(){
    let that = this 
    wx.showToast({
      title: wx.getStorageSync('couponUseTip').msg,
      icon:"none"
    })
  },

  //课程详情页跳转
  vip_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var course = that.data.courseList[xb]
    wx.navigateTo({
      url: app.getPagePath('course_detail') + '?kid=' + course.kid,
    })
    // if(course.type == 0){
    //     wx.navigateTo({
    //       url: app.getPagePath('course_detail') + '?kid=' + course.kid,
    //     })
    // }else if(course.type == 1){
    //   wx.navigateTo({
    //     url: app.getPagePath('groupBuy') + '?kid=' + course.kid,
    //   })
    // }else if(course.type == 2){
    //   wx.navigateTo({
    //     url: app.getPagePath('course_seckill') + '?kid=' + course.kid,
    //   })
    // }
  },
})