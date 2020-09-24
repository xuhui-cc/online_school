// pages/pay/pay.js
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
    var kid = options.kid

    that.setData({
      kid:kid,
      nick:wx.getStorageSync("nick")
    })
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.getdefault(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        var adress = d.data.data.prov + d.data.data.city + d.data.data.area + d.data.data.title
        that.setData({
          have_adr:true
        })
        that.setData({
          name: d.data.data.name,
          phone: d.data.data.phone,
          adress:adress
        })
      }else{
        that.setData({
          have_adr: false
        })
      }
    })
    var params = {
      "token": wx.getStorageSync("token"),
      "kid": kid
    }
    app.ols.course_info1(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          course_info: d.data.data
        })
      } else {
        console.log("课程详情介绍接口==============" + d.data.msg)
      }
    })

  },

  buy:function(){
    let that = this
    console.log(that.data.have_adr,"dizhi")
    wx.showLoading({
      title: '请稍后...',
    })
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
    console.log(params,"预支付接口")
      app.ols.preorder(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          var ob = JSON.parse(d.data.data.paystr)
          console.log(ob)
          var timeStamp = ob.timeStamp
          var nonceStr = ob.nonceStr
          var pack = ob.package
          var paySign = ob.paySign
          that.laqizhifu(timeStamp, nonceStr, pack, paySign)
          console.log("预支付接口成功")
        } else {
          wx.showToast({
            title: '请填写地址信息！',
            icon:"none",
            duration:2000
          })
          // wx.hideLoading()
          console.log("预支付接口失败", d)
        }
      })
    
    
  },

  //拉起微信支付
  laqizhifu: function (timeStamp, nonceStr, pack, paySign) {
    wx.hideLoading()
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: pack,
      signType: 'MD5',
      paySign: paySign,
      success(res) {
        console.log("支付成功")
        wx.showToast({
          title: '支付成功',
          duration:3000
        })
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
      },
      fail(res) {
       
        console.log("失败")
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
      }
    })
  },

  to_add_adress:function(e){
    let that = this
    var type = e.currentTarget.dataset.type
    console.log(type)
    wx.navigateTo({
      url: app.getPagePath('add_adress') + '?type=' + type,
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
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.getdefault(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        var adress = d.data.data.prov + d.data.data.city + d.data.data.area + d.data.data.title
        that.setData({
          have_adr: true
        })
        that.setData({
          name: d.data.data.name,
          phone: d.data.data.phone,
          adress: adress
        })
      } else {
        that.setData({
          have_adr: false
        })
      }
    })
  },

  getuserinfo: function (e) {
    let that = this
    
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              var nickName = res.userInfo.nickName
              var avatarUrl = res.userInfo.avatarUrl
              wx.login({
                success(login) {
                  console.log("login.code" + login.code)
                  var code = login.code
                  wx.setStorageSync('code', code)
                  var params = {
                    "token": wx.getStorageSync("token"),
                    "nick": nickName,
                    "avatar": avatarUrl
                  }
                  console.log(params)
                  app.ols.avatar_update(params).then(d => {
                    if (d.data.code == 0) {
                      console.log(d.data.data)
                      wx.setStorageSync("nick", true)
                      var params = {
                        "token": wx.getStorageSync("token"),
                        "kid": that.data.kid
                      }
                      console.log(params, "预支付接口")
                      app.ols.preorder(params).then(d => {
                        console.log(d)
                        if (d.data.code == 0) {
                          var ob = JSON.parse(d.data.data.paystr)
                          console.log(ob)
                          var timeStamp = ob.timeStamp
                          var nonceStr = ob.nonceStr
                          var pack = ob.package
                          var paySign = ob.paySign
                          that.laqizhifu(timeStamp, nonceStr, pack, paySign)
                          console.log("预支付接口成功")
                        } else {
                          console.log("预支付接口失败", d)
                        }
                      })
                    } else {
                      console.log(d.data.code)
                      console.log(d.data.msg)
                    }
                  })
                  
                }
              })

            }
          })
       

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