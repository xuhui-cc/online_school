// pages/group_detail/group_detail.js
const app = getApp()
var timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rule:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    that.setData({
      tid:options.tid,
      kid:options.kid
    })
    // that.group_detail3()
  },

  //获取课程详情
  course_detail:function(){
    let that = this
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
    
      console.log(params, "课程详情接口参数")
      app.ols.course_info3(params).then(d => {
        if (d.data.code == 0) {
          that.setData({
            course_info:d.data.data
          })
        }
        
        
      })
  },

  //获取团详情
  group_detail3:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "tid": that.data.tid
    }
    console.log(params, "团详情接口参数")
    app.ols.group_detail3(params).then(d => {
      if (d.data.code == 0) {
        console.log(d.data.data)
        var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      d.data.data.addtime =  d.data.data.addtime + (24*60*60) - timestamp
      for(var j=0;j<d.data.data.member.length;j++){
        if(d.data.data.member[j].avatar.indexOf("/") == 0){
          // d.data.data.member[j].avatar = 'http://os.lingjun.net' + d.data.data.member[j].avatar
          d.data.data.member[j].avatar = app.ols.dummy() + d.data.data.member[j].avatar
          //表示strCode是以ssss开头；
        }else if(d.data.data.member[j].avatar.indexOf("/") == -1){
          //表示strCode不是以ssss开头
        }
      }
        that.setData({
          group:d.data.data
        })
        that.cs1()
        console.log("团详情接口调取成功")
      } else {
        console.log("团详情==============" + d.data.msg)
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


  //去拼团付款
  to_groupPay:function(){
    let that = this
    // var tid = e.currentTarget.dataset.tid
    wx.redirectTo({
      url: app.getPagePath('groupPay') + '?tid=' + that.data.group.id + "&kid=" + that.data.group.kid, 
    })
  },

  //查看拼团规则
  look_rule:function(){
    let that = this
    that.setData({
      rule:!that.data.rule
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
    that.group_detail3()
    that.course_detail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer);   
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
    let that = this;
    let paramsStr = 'isshare=1&gid=' + wx.getStorageSync("gid") + '&kid=' + that.data.group.kid + '&tid=' + that.data.tid
    return app.shareTool.getShareReturnInfo('0,1', 'group_share', paramsStr, '/images/other/share1.png', '领军网校')
  }
})