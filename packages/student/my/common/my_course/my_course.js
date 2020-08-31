// pages/my_course/my_course.js
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
    that.get_courselist()
  },

  //获取课程列表
  get_courselist:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.my_course_all4(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          course: d.data.data
        })
        for(var i=0;i<that.data.course.length;i++){
        }
      } else if (d.data.code == 5){
        that.setData({
          course: ''
        })
      }else{
        console.log(d.data.code, "code", d.data.msg)
        wx.showToast({
          title: d.data.msg,
          icon:"none",
          duration:2000
        })
      }
    })
  },

  //课程详情跳转
  to_course_detail: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: app.getPagePath('course_detail') + '?kid=' + that.data.course[xb].kid,
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
    let that = this
    that.get_courselist()
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

  //   let that = this;
  //   return {
  //     title: '领军网校', // 转发后 所显示的title
  //     path: '/packages/firstpage/first_page/first_page', // 相对的路径
  //     imageUrl: '/images/other/share1.png',  //用户分享出去的自定义图片大小为5:4,
  //     success: (res) => {    // 成功后要做的事情
  //       console.log("成功")

  //     },
  //     fail: function (res) {
  //       // 分享失败
  //       console.log(res, "分享失败")
  //     }
  //   }
  // }
})