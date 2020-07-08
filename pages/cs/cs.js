// pages/cs/cs.js
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
    var params = {
      "gid": wx.getStorageSync("gid"),
      "num": 30,
      "page": 1
    }
    // console.log(params, "params获取课程未登录")
    app.ols.group_list3(params).then(d => {
    // app.ols.grade_course2(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        var timestamp = (Date.parse(new Date()))/1000
        console.log(timestamp,"timestamp")
        for(var i=0;i<d.data.data.lists.length;i++){
          d.data.data.lists[i].endtime = d.data.data.lists[i].endtime - timestamp
        }
        that.setData({
          course: d.data.data
        })
        that.cs()
        // console.log(that.data.course, "获取课程未登录")
      } else {
        console.log(d.data.msg, "获取课程未登录msg，失败")
        that.setData({
          course: ''
        })
      }
    })
  },

  cs:function(){
    let that = this
    let len=that.data.course.lists.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.course.lists.length; i++) { 
        var intDiff = that.data.course.lists[i].endtime;//获取数据中的时间戳 
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
          that.data.course.lists[i].endtime--; 
          var str=day + "天" + hour+':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        that.data.course.lists[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        wearList: that.data.course.lists 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    var timer = setInterval(nowTime, 1000); 
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
    return {
      title: '领军网校', // 转发后 所显示的title
      path: '/pages/first_page/first_page', // 相对的路径
      imageUrl: '../../images/share1.png',  //用户分享出去的自定义图片大小为5:4,
      success: (res) => {    // 成功后要做的事情
        console.log("成功")

      },
      fail: function (res) {
        // 分享失败
        console.log(res, "分享失败")
      }
    }
  }
    
  
})