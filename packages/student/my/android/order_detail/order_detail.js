// pages/order_detail/order_detail.js
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
    var id = options.id
    console.log(id)
    that.setData({
      id:id
    })
    that.order_detail()       //获取订单详情
    
    
    
    
  },

  order_detail:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":that.data.id
    }
    app.ols.order_detail(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          order: d.data.data
        })
        var dateline = "order.dateline"
        that.setData({
          [dateline]: that.timestampToTime(d.data.data.dateline)
        })
       
        // 调用方法
        that.setData({
          timer: that.timer(that.data.order.dateline, 30)
        })
        
        console.log(that.data.timer, "timer"); // 28:00
        
      }
    })
  },

  timer: function(val, timeInterval) {
    var nowTime = new Date();
    var createdTime = new Date(val);
    var TIME = 1000 * 60 * timeInterval;
    // 目标时间和当前时间的毫秒数
    var differ = nowTime - createdTime;
    console.log(val)
    console.log(TIME)
    console.log(differ)
    // 目标时间超过当前时间，或目标时间与当前时间的差超过30分钟则返回0
    if(differ < 0 || differ > TIME) {
      return 0;
    };
    // 剩余时间的秒数
    differ = TIME - differ;
    // 计算分钟数
    // that.setData({
    //   differ:differ
    // })
    var minute = Math.floor(differ / (60 * 1000));
    minute = minute < 10 ? '0' + minute : minute;
    // 计算秒数
    var second = Math.floor((differ - minute * (60 * 1000)) / 1000);
    second = second < 10 ? '0' + second : second;
    // 返回结果格式 29:59
    return minute + '分' + second + '秒';
  },

  // 调用方法
  // var time1 = timer("2018-12-20 09:20:00", 30); // 我需要做30分钟的倒计时
  // console.log(time1); // 28:00
  // var time2 = timer("2018-12-20 09:20:00", 60);
  // console.log(time2); // 58:00


  //时间戳转换为标准时间
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'; 
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  to_pay: function (e) {
    let that = this
    var kid = e.currentTarget.dataset.kid
    console.log(kid)
    that.setData({
      timer: that.timer(that.data.order.dateline, 30)
    })
    if(that.data.timer != 0){
      wx.navigateTo({
        url: app.getPagePath('pay') + '?kid=' + kid,
      })
    }else{
      wx.showToast({
        title: '订单超时了哦',
        icon:"none",
        duration:2000
      })
      that.onShow()
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.order_detail()       //获取订单详情



    

    
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