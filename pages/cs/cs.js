// pages/cs/cs.js
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
    
      let that = this;
      // if(ops.from === 'button'){
      //   console.log(ops.target)
      // }
      return {
        title: '简直走别拐弯', // 转发后 所显示的title
        path: '/pages/first_page/first_page', // 相对的路径
        imageUrl: '../../images/first_bg.png',  //用户分享出去的自定义图片大小为5:4,
        success: (res) => {    // 成功后要做的事情
          console.log("成功")
          // console.log

          // wx.getShareInfo({
          //   shareTicket: res.shareTickets[0],
          //   success: (res) => {
          //     that.setData({
          //       isShow: true
          //     })
          //     console.log(that.setData.isShow)
          //   },
          //   fail: function (res) { console.log(res) },
          //   complete: function (res) { console.log(res) }
          // })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
    
  }
})