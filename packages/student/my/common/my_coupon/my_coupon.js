// packages/student/my/common/my_coupon/my_coupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon_use:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.setData({
      couponUseTip:wx.getStorageSync('couponUseTip')
    })
    
    if (options.isshare == 1){
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare:options.isshare,
        gid:options.gid,
        login:wx.getStorageSync('login')
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
    let that = this 
    
    if(wx.getStorageSync('login')){
      that.couponList()   //获取会员卡列表
      // that.couponTea()   //优惠券相关老师
    }
    
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
    let paramStr = 'isshare=1&gid=' + wx.getStorageSync('gid') 
    return app.shareTool.getShareReturnInfo('0,1', 'my_coupon', paramStr, '/images/other/share1.png')
  
  },

  /*------------------------------------------------------交互---------------------------------------------------*/

  //优惠券使用提示
  couponUes:function(){
    let that = this 
    wx.showToast({
      title: wx.getStorageSync('couponUseTip').msg,
      icon:"none"
    })
  },

  copy:function(){
    var that = this;
    wx.setClipboardData({
    data: that.data.couponTea.phone,
    success: function(res) {
      wx.showToast({
        title: '复制成功',
      })
    }
  });
  },

  //获取微信绑定手机号登录
getPhoneNumber: function (e) {
  var that = this
  app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
    if (success) {
      that.setData({
        login: true
      })
      that.onShow()
    }
  })
},

//试听课详情页
to_auditionVideo:function(){
  let that = this 
  wx.navigateTo({
    url: app.getPagePath('auditionVideo') 
  })
},

  //展开使用须知详情
  fold:function(e){
    let that = this
    console.log(e.currentTarget.dataset.xb)
    var fold = "couponList[" + e.currentTarget.dataset.xb + "].fold"
    that.setData({
      [fold]:!that.data.couponList[e.currentTarget.dataset.xb].fold
    })
  },


  //------------------------------------------------------接口---------------------------------------------------//
  /**
   * 优惠券列表接口
   */
  couponList:function(){
    let that = this 
    
    var params = {
      "token":wx.getStorageSync('token')
    }
    app.ols.couponList(params).then(d => {
      if (d.data.code == 0) {
        for(var i = 0;i<d.data.data.length;i++ ){
          d.data.data[i].fold = false
        }
        that.setData({
          couponList:d.data.data
        })
      }else{
        that.setData({
          couponList:''
        })
      }
    })
    
  },
  
})