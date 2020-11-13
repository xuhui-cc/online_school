// packages/common/exchangeCode_C&C/exchangeCode_C&C.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_rightBag:false,
    // exchangeSucceed:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    wx.setStorageSync('gid', 1)
      that.setData({
        login:wx.getStorageSync('login'),
        id:options.id,
        ewm:options.ewm,
        // id:'61',
        // ewm:'1'
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
    that.rightBagInfo()   
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

  // },

  /*--------------------------------------------------------方法--------------------------------------- */

  //会员详情页跳转
  to_vipDetail:function(){
    let that = this 
    if(that.data.ewm_1vn == 1){
      wx.redirectTo({
        url: app.getPagePath('vip_detail') + '?ewm_exchange=1',
      })
    }
    else{
      wx.redirectTo({
        url: app.getPagePath('vip_detail') ,
      })
    }
    
  },

  //自定义返回
  back:function(){
    let that = this
    console.log("back")
    if(that.data.ewm == 1){
      wx.switchTab({
        url: app.getPagePath('logs'),
      })
    }else{
      wx.navigateBack({
        delta: 0,
      })
    }
    
  },

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this

    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.check_1Vn()
      }
    })
  },

  /*-------------------------------------------------------接口---------------------------------------- */
  //获取权益包信息
  rightBagInfo:function(){
    let that = this 
    if(that.data.ewm  == 1){
      var params = {
        // "token": wx.getStorageSync("token"),
        "code_id": that.data.id
      }
    }else{
      var params = {
        // "token": wx.getStorageSync("token"),
        "id": that.data.id
      }
    }
    app.ols.rightBagInfo(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          rightBagInfo:d.data.data
        })
        
      } 
    })
  },

  //兑换权益包
  exchangeRightBag:function(id){
    let that = this 
      
      var params = {
        "token": wx.getStorageSync("token"),
        "id": id
      }
      app.ols.exchange_code5(params).then(d => {
        if (d.data.code == 0) {
          that.setData({
            open_rightBag:true
          })
        } 
      })
      
   
    
  },

  exchange_1Vn:function(ex_id){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":ex_id
    }
    app.ols.exchange_1Vn_v5(params).then(d => {
      
      if (d.data.code == 0) {
        that.setData({
          open_rightBag:true,
          ewm_1vn:1
        })
        // wx.redirectTo({
        //   url: app.getPagePath('vip_detail') + '?ewm_exchange=1',
        // })
      } 
      else{
        wx.showToast({
          title: d.data.msg,
          icon: "none",
          duration: 2950
        })
        setTimeout(function () {
          wx.switchTab({
            url: app.getPagePath('logs'),
          })
        }, 3000)
      }
    })
  },

  /**
   * 权益包兑换前验证
   */
  check_1Vn:function(){
    let that = this
    if(that.data.ewm == 1){
      var params = {
        "token": wx.getStorageSync("token"),
        "id":that.data.id
      }
      app.ols.check_1Vn_v5(params).then(d => {
        if (d.data.code == 0) {
          
          that.exchange_1Vn(d.data.data.id)   //兑换权益包
        } 
        else if(d.data.code == 5){
          console.log(d.data.msg.indexOf("重复"),"重复")
          if(d.data.msg.indexOf("重复") >= 0){
            wx.showToast({
              title: d.data.msg,
              icon: "none",
              duration: 950
            })
            setTimeout(function () {
              console.log("跳转")
              wx.redirectTo({
                url: app.getPagePath('vip_detail') + '?ewm_exchange=1',
              })
            }, 1000) 
          }else{
            wx.showToast({
              title: d.data.msg,
              icon: "none",
              duration: 950
            })
            setTimeout(function () {
              console.log("跳转")
              wx.switchTab({
                url: app.getPagePath('logs'),
              })
            }, 1000)
          }
        }
      })
    }else{
      that.exchangeRightBag(that.data.id)   //兑换权益包
    }
  },

})