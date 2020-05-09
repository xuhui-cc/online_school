// pages/my_wrongbook/my_wrongbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // subject: ["语文", "语文", "语文", "语文", "语文", "语文", "语文", "语文", "语文"],
    current_subject:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
   
    that.setData({
      gid: wx.getStorageSync("gid")
    })

    that.getsubject()   //获取科目

    var params = {
      "token": wx.getStorageSync("token"),
      "gid":10,
      "did":2
    }
    app.ols.wrong(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          wrong:d.data.data
        })

        for(var i=0;i<that.data.wrong.length;i++){
          if(that.data.wrong[i].children != ''){
            var cs1 = "wrong[" + i + "].fold1"
            that.setData({
              [cs1]: false
            })

          //   for (var j = 0; j < that.data.wrong[i].children.length; j++)
          }
        }
      }
    })
  },

  //获取科目接口
  getsubject: function () {
    let that = this
    //获取科目
    var params = {
      "gid": that.data.gid
    }
    app.ols.discipline(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        let arr2 = [];
        for (let i in d.data.data) {
          arr2.push(d.data.data[i]);
        }
        console.log(arr2)
        that.setData({
          subject: arr2
        })
        console.log("获取科目成功")
      } else {
        console.log(d.data.msg, "获取科目失败")
      }
    })
  },


  //第一层折叠
  fold1:function(e){
    let that = this
    var xb1 = e.currentTarget.dataset.xb1
    console.log(xb1)
    for(var i=0;i<that.data.wrong.length;i++){
      if(xb1 == i){
        var cs1 = "wrong[" + i + "].fold1"
        that.setData({
          [cs1]: !that.data.wrong[i].fold1
        }) 
      }
    }
  },

  swichNav_subject: function (e) {
    var that = this

    var cur = e.target.dataset.current;

    that.setData({
      current_subject: cur
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