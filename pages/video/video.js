// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // getvideo_info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var id = options.id
    console.log(id)
    var kid = options.kid
    console.log(kid)
    that.setData({
      id:id,
      kid:kid
    })
    //课程视频接口
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.getvideo(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo: d.data.data
        })
        
      } else {
        console.log("课程视频接口==============" + d.data.msg)
      }
    })
    
  },

  
  //获取视频播放进度、总时长（初）
  bindtimeupdate(res) {
    let that = this
    console.log('bindtimeupdate', parseInt(res.detail.currentTime), '时间总时长-->', parseInt(res.detail.duration));
    that.setData({
      currentTime: parseInt(res.detail.currentTime),
      duration: parseInt(res.detail.duration)
    })
    
  },

  update_study:function(btn,timeline,precent){
    let that = this
    // var percent1
    //更新学习状态
    // if(percent == 100){
    //   percent1 
    // }
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id,
      "kid": that.data.kid,
      "btn": btn,
      "timeline": timeline,
      "percent": precent
    }
    app.ols.study_pro(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo_info: d.data.data
        })

        } else if (d.data.code == 5) {
          that.setData({
            getvideo_info: 0
          })
          console.log("课程视频未学习")
      } else {
        console.log("更新视频状态接口==============" + d.data.msg)
      }
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
    //获取视频断点时间
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.getvideo_info(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        
       
          that.setData({
            timeline: d.data.data.timeline,
            percent: d.data.data.percent,
            status: d.data.data.status,
          })
        
        
        that.update_study(1, that.data.timeline, that.data.percent)
      } else if (d.data.code == 5) {
        that.setData({
          timeline: 0,
          percent: 0,
          status: 0,
        })
        that.update_study(1, that.data.timeline, that.data.percent)
        console.log("课程视频未学习")
      } else {
        console.log("课程视频断点时间接口==============" + d.data.msg)
      }
    })
    
    
  },


  //播放进度数据判断
  comp:function(){
    let that = this
    if (that.data.percent == 100) {
      that.setData({
        timeline1: that.data.currentTime,
        percent: 100
      })
    } else {
      if (Math.ceil((that.data.currentTime / that.data.duration) * 100) > that.data.percent) {
        that.setData({
          timeline1: that.data.currentTime,
          percent: Math.ceil((that.data.currentTime / that.data.duration) * 100),
        })
      } else {
        that.setData({
          timeline1: that.data.currentTime,
          percent: that.data.percent,
        })
      }

    }
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let that = this
    that.comp()
    //更新学习状态
    that.update_study(2, that.data.timeline1, that.data.percent)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this
    that.comp()
    //更新学习状态
    that.update_study(2, that.data.timeline1, that.data.percent)
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