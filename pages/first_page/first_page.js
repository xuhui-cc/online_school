// pages/first_page/first_page.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // grade:["初三","高三 文科","高三 理科"],
    grade_index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var grade = wx.getStorageSync("grade")
    if(grade){
      wx.switchTab({
        url: '../../pages/logs/logs',
      })
    }else{
      var params = {
        
      }
      app.ols.getlist(params).then(d => {
        console.log(d)
        if (d.data.code == 200) {
          console.log(d.data.data)
          let arr1 = [];
          for (let i in d.data.data) {
            //var o={};
            //o[i]=d.data.data[i];
            arr1.push(d.data.data[i]);
          }
          console.log(arr1)
          that.setData({
            grade: arr1
          })
        }
      })
    }
  },

  grade_picker:function(e){
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      grade_index: e.detail.value
    })
    console.log(that.data.grade[that.data.grade_index])
    wx.setStorageSync("grade", that.data.grade_index)
    wx.setStorageSync("grade_id", that.data.grade[that.data.grade_index].id)
    wx.switchTab({
      url: '../../pages/logs/logs',
    })
  },

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    wx.login({
      success: res => {

        if (e.detail.errMsg == "getPhoneNumber:ok") {
          wx.showLoading({
            title: '登录中...',
          })
          wx.login({
            success(res) {
              console.log("cccs.code" + res.code)

              let iv = encodeURIComponent(e.detail.iv);
              let encryptedData = encodeURIComponent(e.detail.encryptedData);
              let code = res.code
              var params = {
                "code": code,
                "iv": iv,
                "encryptedData": encryptedData
              }
              console.log(params)
              app.ols.login(params).then(d => {

                if (d.data.code == 0) {
                  console.log("登陆成功")
                  wx.hideLoading()

                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  that.onLoad()


                } else {
                  wx.showToast({
                    title: "登陆失败",
                    icon: 'none',
                    duration: 2000
                  })
                  console.log(d.data.msg)
                  // that.setData({
                  //   login: false
                  // })

                  wx.hideLoading()
                }
              })
            }
          })
        }
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