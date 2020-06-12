// pages/homework_report/homework_report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // iknow: false
  },

  //我知道了
  iknow: function () {
    let that = this
    that.setData({
      iknow: true
    })
  },
  

  //时间戳转换为标准时间
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
    var s = date.getSeconds();
    return Y + M + D + h + m;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var iknow = wx.getStorageSync("iknow")
    if (iknow) {
      that.setData({
        iknow: true
      })
    }
    // var mid = options.mid
    that.setData({
      mid: options.mid
    })

    //获取课后作业报告
    var params = {
      "token": wx.getStorageSync("token"),
      "mid": that.data.mid
    }
    app.ols.test_report(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        d.data.data.dateline = that.timestampToTime(d.data.data.dateline)
        that.setData({
          report: d.data.data
        })
        for (var i = 0; i < that.data.report.option.length; i++) {
          if (that.data.report.option[i].type == 1) {

            that.setData({
              ques_type1: 1,

            })
          } else if (that.data.report.option[i].type == 2) {

            that.setData({
              ques_type2: 2,

            })
          } else if (that.data.report.option[i].type == 3) {

            that.setData({
              ques_type3: 3,

            })
          } else if (that.data.report.option[i].type == 4) {

            that.setData({
              ques_type4: 4,

            })
          } else if (that.data.report.option[i].type == 5) {

            that.setData({
              ques_type5: 5,

            })
          }
        }
      } else {
        console.log("课后作业报告接口==============" + d.data.msg)
      }
    })

  },

  to_analysis:function(e){
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
      url: '../../pages/analysis/analysis?index=' + index + "&id=" + that.data.report.option[index].pid + "&eid=" + that.data.report.eid + "&mid=" + that.data.mid,
    })
  },

  //返回按钮延伸弹框
  back: function (e) {
    let that = this
    
    
    wx.navigateBack({
      delta: 1  // 返回上一级页面。
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
  onShareAppMessage: function () {

  }
})