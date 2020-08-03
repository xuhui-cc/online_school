// pages/vip_detail/vip_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/vip2.png',
      '../../images/vip2.png',
      '../../images/vip3.png',
      '../../images/vip1.png',
      '../../images/vip2.png',
      '../../images/vip3.png',
    ],
    pay:false,
    exchange:false,
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
    let that = this
    that.v4_viplist()
  },

  //获取会员卡列表
  v4_viplist:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    // console.log(params, "会员列表参数")
    app.ols.v4_viplist(params).then(d => {
      console.log(d, "会员列表数据")
      if (d.data.code == 0) {
        if(d.data.data.lists[0].course){
          d.data.data.lists[0].course_num = d.data.data.lists[0].course.length
        }
        
        that.setData({
          vip_list:d.data.data.lists
        })
        console.log("会员列表成功")
      } else {
        console.log("会员列表失败==============" + d.data.msg)
      }
    })
  },

  vip_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var course = that.data.vip_list[0].course[xb]
    if(course.type == 0){
        wx.navigateTo({
          url: '../../pages/course_detail/course_detail?kid=' + course.kid,
        })
    }else if(course.type == 1){
      wx.navigateTo({
        url: '../../pages/groupBuy/groupBuy?kid=' + course.kid,
      })
    }else if(course.type == 2){
      wx.navigateTo({
        url: '../../pages/course_seckill/course_seckill?kid=' + course.kid,
      })
    }
  },

  vip_buy:function(){
    let that = this
    wx.showLoading({
      title: '请稍后...',
    })
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.vip_list[0].id,
       
      }
    console.log(params,"会员卡预支付接口")
      app.ols.v4_vipPreorder(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          var ob = JSON.parse(d.data.data.paystr)
          // that.setData({
          //   orderid:d.data.data.orderid
          // })
          console.log(ob)
          var timeStamp = ob.timeStamp
          var nonceStr = ob.nonceStr
          var pack = ob.package
          var paySign = ob.paySign
          that.laqizhifu(timeStamp, nonceStr, pack, paySign)
          console.log("会员卡预支付接口成功")
        } else {
          console.log("预支付接口失败", d)
        }
      })
    
    
  },

  //拉起微信支付
  laqizhifu: function (timeStamp, nonceStr, pack, paySign) {
    let that = this
    wx.hideLoading()
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: pack,
      signType: 'MD5',
      paySign: paySign,
      success(res) {
        console.log("支付成功")
        wx.showToast({
          title: '支付成功',
          duration:3000
        })
        that.setData({
          pay:true
        })
        // wx.navigateBack({
        //   delta: 1  // 返回上一级页面。
        // })
      },
      fail(res) {
       
        console.log("支付失败",res)
        // wx.showToast({
        //   title: '支付失败',
        //   duration:3000
        // })
        // wx.navigateBack({
        //   delta: 1  // 返回上一级页面。
        // })
      }
    })
  },

  //打开兑换码弹框
  exchange:function(){
    let that = this
    that.setData({
      exchange:!that.data.exchange
    })
  },

  //查看会员权益
  success_yes:function(){
    let that = this 
    that.onLoad()
    that.setData({
      pay:false
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