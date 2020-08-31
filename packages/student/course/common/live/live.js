// pages/live/live.js
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
      id:id,
      kid:options.kid
    })
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.get_live(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          get_live: d.data.data
        })
        console.log("课程目录接口调取成功")
      } else {
        console.log("课程目录==============" + d.data.msg)
      }
    })


  },

  //更新视频开始状态
  update_start: function () {
    let that = this
    var timestamp = (Date.parse(new Date()))/1000
    console.log(timestamp,"timestamp")
    that.setData({
      start_time: timestamp
    })
    var params = {
      "token": wx.getStorageSync("token"),
      "oid": that.data.id,
      "kid": that.data.kid,
      "type":3
    }
    console.log(params, "视频开始状态更新参数")
    app.ols.video_start(params).then(d => {
      console.log(d, "视频开始状态更新数据")
      that.setData({
        hid:d.data.data.hid
      })
      if (d.data.code == 0) {
        console.log("视频开始状态更新成功")
      } else {
        console.log("视频开始状态更新失败==============" + d.data.msg)
      }
    })
  },

  // //更新视频结束状态
  // update_leave:function(){
  //   let that = this
  //   var timestamp = (Date.parse(new Date())) / 1000
  //   console.log(timestamp, "timestamp")
  //   var answerline = timestamp - that.data.start_time
  //   console.log(answerline, "answerline")
  //   var params = {
  //     "token": wx.getStorageSync("token"),
  //     "hid": that.data.hid,
  //     "duration": answerline,
  //     // "percent": precent
  //   }
  //   console.log(params,"视频结束状态更新参数")
  //   app.ols.video_end(params).then(d => {
  //     console.log(d,"视频结束状态更新数据")
  //     if (d.data.code == 0) {
  //       console.log("视频结束状态更新成功")
  //     } else {
  //       console.log("视频结束状态更新失败==============" + d.data.msg)
  //     }
  //   })
  // },

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
    that.update_start()    //更新直播学习状态
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