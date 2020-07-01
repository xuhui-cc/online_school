// pages/my_order/my_order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finish: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.order_all(params).then(d => {
      
      if (d.data.code == 0) {
        console.log(d.data.msg)
        that.setData({
          order:d.data.data
        })
      }
      else if (d.data.code == 5){
        console.log(d.data.msg)
      
          that.setData({
            order: ''
          })
        
      }else {
        console.log(d.data.code, "code", d.data.msg)
      }
    })
  },

  order_all:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.order_all(params).then(d => {

      if (d.data.code == 0) {
        console.log(d.data.msg)
        that.setData({
          order: d.data.data
        })
      }
      else if (d.data.code == 5) {
        console.log(d.data.msg)

        that.setData({
          order: ''
        })

      } else {
        console.log(d.data.code, "code", d.data.msg)
      }
    })
  },

  order_wait: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.order_wait(params).then(d => {

      if (d.data.code == 0) {
        console.log(d.data.msg)
        that.setData({
          order: d.data.data
        })
      }
      else if (d.data.code == 5) {
        console.log(d.data.msg)

        that.setData({
          order: ''
        })

      } else {
        console.log(d.data.code, "code", d.data.msg)
      }
    })
  },

  order_ed: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.order_ed(params).then(d => {

      if (d.data.code == 0) {
        console.log(d.data.msg)
        that.setData({
          order: d.data.data
        })
      }
      else if (d.data.code == 5) {
        console.log(d.data.msg)

        that.setData({
          order: ''
        })

      } else {
        console.log(d.data.code, "code", d.data.msg)
      }
    })
  },

  order_close: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.order_close(params).then(d => {

      if (d.data.code == 0) {
        console.log(d.data.data)
        console.log(d.data.msg)
        that.setData({
          order: d.data.data
        })
      }
      else if (d.data.code == 5) {
        console.log(d.data.msg)

        that.setData({
          order: ''
        })

      } else {
        console.log(d.data.code, "code", d.data.msg)
      }
    })
  },

  finish_select: function (e) {
    let that = this
    var finish = e.currentTarget.dataset.finish
    that.setData({
      finish: finish
    })
    if (finish == 0){
      that.order_all()
    }else if(finish == 1){
      that.order_wait()
    }else if (finish == 2) {
      that.order_ed()
    }else if (finish == 3) {
      that.order_close()
    }
  },

  to_order_detail: function (e) {
    let that = this
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../../pages/order_detail/order_detail?id=' + id,
    })
  },

  to_pay: function (e) {
    let that = this
    var kid = e.currentTarget.dataset.kid
    wx.navigateTo({
      url: '../../pages/pay/pay?kid=' + kid,
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
    if (that.data.finish == 0) {
      that.order_all()                                  //全部订单
    } else if (that.data.finish == 1) {
      that.order_wait()                               //待支付
    } else if (that.data.finish == 2) {
      that.order_ed()                                  //已支付
    } else if (that.data.finish == 3) {
      that.order_close()                              //已关闭
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
  //     path: '/pages/first_page/first_page', // 相对的路径
  //     imageUrl: '../../images/share1.png',  //用户分享出去的自定义图片大小为5:4,
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