// pages/cp_report/cp_report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // iknow:false
    btn_buy:app.globalData.btn_buy
  },

  //我知道了
  iknow:function(){
    let that = this
    that.setData({
      iknow:true
    })
    wx.setStorageSync("iknow", true)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var mid = options.mid
    var iknow = wx.getStorageSync("iknow")
    if (iknow){
      that.setData({
        iknow: true
      })
    }
    that.setData({
      mid:mid
    })

    var params = {
      "token": wx.getStorageSync("token"),
      "mid": that.data.mid
    }
    console.log(params,"params")
    app.ols.cp_report(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          report:d.data.data
        })

        //获取推荐课
        var params = {
          "token": wx.getStorageSync("token"),
          "eid": d.data.data.eid,
        }
        console.log(params, "params")
        app.ols.getpushlist(params).then(d => {
          console.log(d)
          if (d.data.code == 0) {
            that.setData({
              course: d.data.data
            })
            console.log("推荐课获取成功")
          }else{
            console.log("推荐课获取失败" + d.data.msg)
          }

        })

        //获取点评
        var params = {
          "token": wx.getStorageSync("token"),
          "eid": d.data.data.eid,
          "percent": Math.ceil((d.data.data.chart.right_num / d.data.data.chart.all_num) * 100),
        }
        console.log(params, "params")
        app.ols.cp_comment(params).then(d => {
          console.log(d)
          if (d.data.code == 0) {
            that.setData({
              comment: d.data.data
            })
            for(var i=0;i<that.data.comment.length;i++){
              if (that.data.comment[i].second){
                var cs = "comment[" + i + "].fold"
                that.setData({
                  [cs]:true
                })
              }else{
                var cs = "comment[" + i + "].fold"
                that.setData({
                  [cs]: null
                })
              }
            }
            console.log("名师点评接口调取成功")
          } else {
            console.log("名师点评接口==============" + d.data.msg)
          }
        })
        console.log("测评报告接口调取成功")
      } else {
        console.log("测评报告接口==============" + d.data.msg)
      }
    })
  },

  to_course_detail: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: app.getPagePath('course_detail') + '?kid=' + that.data.course.res[xb].kid,
    })
  },

  to_cp_analysis:function(e){
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
      url: app.getPagePath('cp_analysis') + '?index=' + index + "&id=" + that.data.report.option[index].pid + "&eid=" + that.data.report.eid + "&mid=" + that.data.mid,
    })
  },

  fold:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var cs = "comment[" + xb + "].fold"
    that.setData({
      [cs] : !that.data.comment[xb].fold
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