// pages/vip_detail/vip_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/vip1.png',
      '../../images/vip2.png',
      '../../images/vip3.png',
      '../../images/vip1.png',
      '../../images/vip2.png',
      '../../images/vip3.png',
    ],
    
    interval: 3000, //停留时间间隔
    previousMargin: '35px', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: '35px', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引
  },

  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },

  //返回我的主页
  back:function(){
    wx.navigateBack({
      delta: 1,
    })
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

  /**阻止页面滚动。模拟器中页面仍然可以滚动，真机上不能滚动。*/
preventTouchMove: function (e) {
 
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