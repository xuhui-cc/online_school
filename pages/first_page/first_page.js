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
    that.setData({
      login: wx.getStorageSync("login"),
        gid: wx.getStorageSync("gid")
    })
    that.get_grade()
    if (that.data.login) {
      console.log(that.data.login, "that.data.login")
      console.log(that.data.gid, "that.data.gid")
      if (that.data.gid != null && that.data.gid != 0) {

        wx.switchTab({
          url: '../../pages/index/index',
        })
        console.log("我登录了，我选年级了")
      } else {
        that.setData({
          grade_select: true
        })
        console.log("我登录了我没选年级")
      }
    }
    else {
      console.log("我没登录")
    }
    var params = {
    
    }
    app.ols.user_number(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          num: d.data.data.res,
        })
        
        console.log("人数成功")
      } else {
        console.log(d.data.msg, "人数失败")
      }
    })
  
    
  },

  //关闭弹框
  del:function(){
    let that = this
    that.setData({
      grade_select: false
    })
  },


  //年级选择弹框
  grade_select:function(){
    let that = this
    that.setData({
      grade_select: true
    })
  },


  //年级选择 
  subject_sel:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    
    var params = {
      "token": wx.getStorageSync("token"),
      "gid":that.data.grade[xb].id
    }
    console.log(params, "更新年级参数")
    //更新选择年级接口
    app.ols.grade_update(params).then(d => {
      console.log(d,"更新班级数据")
      console.log("更新接口存班级")
      if (d.data.code == 200) {
        wx.setStorageSync('gid', that.data.grade[xb].id)
        wx.switchTab({
          url: '../../pages/index/index',   //更新年级后跳转测评页
        })
        
      }
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
              console.log(params, "登录参数")
              app.ols.login(params).then(d => {
                console.log(d,"登录接口")
                if (d.data.code == 0) {
                  console.log("登陆成功")
                  wx.hideLoading()
                  that.setData({
                    login:true
                  })
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  if (d.data.data.gid != null && d.data.data.gid != 0){
                    that.setData({
                      grade_select:false
                    })
                    console.log(d.data.data.gid,"d.data.data.gid")
                    wx.setStorageSync("gid", d.data.data.gid)
                    wx.switchTab({
                      url: '../../pages/index/index',   //测评页跳转
                    })
                  }else{
                    that.setData({
                      grade_select: true    //选择年级弹框
                    })
                  }
                  


                } else {
                  console.log(d,"登录失败")
                  wx.showToast({
                    title: "登陆失败",
                    icon: 'none',
                    duration: 2000
                  })
                  console.log(d.data.msg,"登录失败提示")
                  

                  wx.hideLoading()
                }
              })
            }
          })
        }
      }
    })
  },

  //获取年级
  get_grade:function(){
    let that = this
    var params = {
    }
    // console.log(params, "获取年级参数")
    app.ols.getlist(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d,"获取年级接口数据")
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
        console.log("获取年级成功")
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