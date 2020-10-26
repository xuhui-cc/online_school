// packages/student/vip/comment/exchang_vip/exchang_vip.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exchange_page:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    var vip_id
    // if(options.q){
    //   var csid = decodeURIComponent(options.q).match(/\d+/g)
    // // console.log(decodeURIComponent(options.q).match(/\d+/g))
    //   console.log(csid[1])
    //   vip_id = csid[1]
    // }
    // if(options.id){
    //   console.log(options.id)
    //   vip_id = options.id
    // }
    
    
    that.setData({
      // id:vip_id,
      id:"9",
      gid:"1",
      login:wx.getStorageSync('login')
    })
    wx.setStorageSync('gid', 1)
    
  },

  
  /**阻止页面滚动。模拟器中页面仍然可以滚动，真机上不能滚动。*/
  preventTouchMove: function (e) {
  
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
    // that.get_vipinfo()
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

  // }


  /*-------------------------------------------------------接口------------------------------------------------- */
  //获vip卡信息
  get_vipinfo:function(){
    let that = this
    var params = {
      "id":that.data.id
    }
    app.ols.info_1Vn(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          vip_info:d.data.data
        })
      } 
      
    })
  },

  //验证vip
  check_1Vn:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":that.data.id
    }
    app.ols.check_1Vn(params).then(d => {
      
      if (d.data.code == 0) {
        that.setData({
          exchangeVip_info:d.data.data,
          exchange_page:true
        })
        // that.exchange_1Vn(d.data.data.id)
        
      } 
      else if(d.data.code == 5){
        console.log(d.data.msg.indexOf("重复"),"重复")
        if(d.data.msg.indexOf("重复") >= 0){
          wx.redirectTo({
            url: app.getPagePath('vip_detail') + '?ewm_exchange=1',
          })
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
  },

  //兑换vip
  exchange_1Vn:function(ex_id){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":ex_id
    }
    app.ols.exchange_1Vn(params).then(d => {
      
      if (d.data.code == 0) {
        wx.redirectTo({
          url: app.getPagePath('vip_detail') + '?ewm_exchange=1',
        })
       
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
        // console.log("会员列表失败==============" + d.data.msg)
      }
    })
  },

  /*----------------------------------------------------------方法-----------------------------------------------*/
  //左上角返回
  back:function(){
    wx.switchTab({
      url: app.getPagePath('logs'),
    })
  },

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.check_1Vn()     //vip验证
      }
    })
  },

  //立即兑换
  yes_exchange:function(){
    let that =this 
    that.exchange_1Vn(that.data.exchangeVip_info.id)    //兑换vip
  },
  
  //关闭兑换判断页面
  exchange_page:function(){
    let that = this
      that.setData({
        exchange_page:false,
        
      })
  },
  
})