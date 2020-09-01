// pages/group_share/group_share.js
const app = getApp()
var timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    full:false,
    close:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      kid: options.kid,
      tid: options.tid,
      gid: options.gid,
      login: wx.getStorageSync("login")
    })
    wx.setStorageSync("gid", options.gid)
    console.log(that.data.kid,that.data.tid,that.data.gid,that.data.login)
    
    
  },

   //去拼团付款
   to_groupPay:function(){
    let that = this
    // var tid = e.currentTarget.dataset.tid
    wx.redirectTo({
      url: app.getPagePath('groupPay') + '?tid=' + that.data.tid + "&kid=" + that.data.kid, 
    })
  },

  //分享判断
  share:function(){
    let that = this 
    var params = {
      "token": wx.getStorageSync("token"),
      "url": "lessongroup",
      "id": that.data.tid,
      
    }
    // "token": "b8bf2a0c1497a24393363005d88901c4e3b8a990",
    //   "url": "lessongroup",
    //   "id": 8,
      
    // }
    // console.log(params, "分享参数")
    app.ols.judge_share4(params).then(d => {
      // console.log(d, "分享数据")
      var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      // if(d.data.data.is_buy == 0)
      
      if (d.data.code == 0) {
        that.setData({
          buy:d.data.data.buy
        })
        d.data.data.group.addtime =  d.data.data.group.addtime + (24*60*60) - timestamp
        for(var j=0;j<d.data.data.group.member.length;j++){
          if(d.data.data.group.member[j].avatar.indexOf("/") == 0){
            // d.data.data.group.member[j].avatar = 'http://os.lingjun.net' + d.data.data.group.member[j].avatar
            d.data.data.group.member[j].avatar = app.ols.dummy() + d.data.data.group.member[j].avatar
            console.log("假人头像")
            //表示strCode是以ssss开头；
          }else if(d.data.data.group.member[j].avatar.indexOf("/") == -1){
            //表示strCode不是以ssss开头
          }
        }
        that.setData({
          group:d.data.data.group,
        })
        that.cs1()
        if(d.data.data.status == 1){
          if(d.data.data.buy >0 &&  d.data.data.buy <6){
               wx.redirectTo({
              url: app.getPagePath('groupBuy') + '?kid=' + that.data.kid,
            })
          
          }
          // else if(d.data.data.buy == 2){
          //   wx.redirectTo({
          //     url: '../../pages/groupBuy/groupBuy?kid=' + that.data.kid,
          //   })
          // }
        }
        else if(d.data.data.status == 2){
          console.log("d.data.data.status == 2")
          that.setData({
            full:true,
            tip:"该团人数已满！",
            full1:1
          })
        }
        else if(d.data.data.status == 0){
          console.log("d.data.data.status == 0")
          that.setData({
            full:true,
            tip:"活动已结束！",
            full1:0
          })
        }
        
        console.log("分享成功")
      } else {
        console.log("分享失败==============" + d.data.msg)
      }
    })
  },

  // //好的按钮
  // yes:function(){
  //   let that = this
  //   wx.redirectTo({
  //     url: '../../pages/groupBuy/groupBuy?kid=' + that.data.kid,
  //   })
  // },

  to_groupBuy:function(){
    let that = this
    if(that.data.full1 == 0){
      wx.navigateTo({
        url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
      })
    }else{
        wx.redirectTo({
          url: app.getPagePath('groupBuy') + '?kid=' + that.data.kid,
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
        that.share()
      }
    })
  },

  //倒计时
  cs1:function(){
    let that = this
    // let len=that.data.hot1.lists.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      // for (var i = 0; i < that.data.hot1.lists.length; i++) { 
        var intDiff = that.data.group.addtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.group.addtime--; 
          var str=hour +''+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        // that.data.group.difftime = str;//在数据中添加difftime参数名，把时间放进去 

      // } 
      that.setData({ 
        hour: hour,
        min: minute,
        sec: second,

      }) 
      // console.log(that)
    } 
    nowTime(); 
    // var timer = setInterval(nowTime, 1000); 
    timer = setInterval(nowTime, 1000); 
  },



  //登录判断
  judge_login: function () {
    let that = this
    that.setData({
      // testlogin: wx.getStorageSync("testlogin"),
      login: wx.getStorageSync("login"),
      gid: wx.getStorageSync("gid")
    })
    // console.log(that.data.testlogin, "that.data.testlogin")
    console.log(that.data.login, "that.data.login")
    console.log(that.data.gid, "that.data.gid")
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
    if(that.data.login){
      that.share()
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
    clearInterval(timer);   
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
    return app.ols.getShareReturnInfo('all', 'first_page')
  }
})