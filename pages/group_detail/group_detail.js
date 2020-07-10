// pages/group_detail/group_detail.js
const app = getApp()
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
      tid:options.tid
    })
    that.group_detail3()
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
        that.setData({
          group:d.data.data
        })
        console.log("团详情接口调取成功")
      } else {
        console.log("团详情==============" + d.data.msg)
      }
      
    })
  },

  //去拼团付款
  to_groupPay:function(){
    let that = this
    // var tid = e.currentTarget.dataset.tid
    wx.navigateTo({
      url: '../../pages/groupPay/groupPay?tid=' + that.data.group.id + "&kid=" + that.data.group.kid, 
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

  }
})