//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current_subject: 0,
    // isshare:true
  },
  //事件处理函数
  
  onLoad: function (options) {
    let that = this
    
    // console.log(islogin)
    // console.log(options,"options")
    // if (options.isshare == 1){
    //   that.setData({
    //     isshare:options.isshare,
    //     gid:options.gid,
    //     islogin: wx.getStorageSync("login")
    //   })
    //   console.log("分享打开",that.data.isshare,that.data.gid)
    // }else{
    //   that.setData({
    //     gid: wx.getStorageSync("gid")
    //   })
    //   that.getGrade()  //获取年级
    //   that.getsubject()   //获取学科
    //   console.log("非分享打开")
    // }

    that.setData({
      gid: wx.getStorageSync("gid")
    })

    that.getGrade()  //获取年级
    that.getsubject()   //获取学科
    console.log("非分享打开")
    
    

  },


   //获取年级
  getGrade:function(){
    let that = this
    var params = {}
    console.log("获取年级无传参")
    app.ols.getlist(params).then(d => {
      console.log(d, "获取年级数据")
      if (d.data.code == 0) {
        let arr1 = [];
        for (let i in d.data.data) {
          arr1.push(d.data.data[i]);
        }
        console.log(arr1)
        that.setData({
          grade: arr1
        })
        for (var i = 0; i < that.data.grade.length; i++) {
          if (that.data.gid == that.data.grade[i].id) {
            that.setData({
              grade_index: i
            })
          }
        }
      }
    })
  },

  //年级弹框
  grade_select: function () {
    let that = this
    that.setData({
      grade_select: true
    })
  },

  //年级选择弹框关闭
  del: function () {
    let that = this
    that.setData({
      grade_select: false
    })
  },
  //年级切换
  subject_sel: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log('picker发送选择改变，携带值为', xb)
    that.setData({
      grade_index: xb,
      gid: that.data.grade[xb].id
    })
    var params = {
      "token": wx.getStorageSync("token"),
      "gid": that.data.grade[xb].id
    }
    app.ols.grade_update(params).then(d => {
      console.log(d)

      if (d.data.code == 200) {
        that.test_list()
        wx.setStorageSync("gid", that.data.grade[that.data.grade_index].id)
        that.setData({
          grade_select: false
        })
      } else {
        wx.showToast({
          title: '现在就是这个年级哦~',
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  //获取学科接口
  getsubject: function () {
    let that = this
    //获取学科
    var params = {
      "gid": that.data.gid
    }
    console.log(params, "params")
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
        that.setData({
          did: that.data.subject[that.data.current_subject].id
        })
        that.test_list()  //获取测评列表

      } else {
        console.log(d.data.msg, "获取学科失败")
      }
    })
  },

  //学科切换
  swichNav_subject: function (e) {
    var that = this
    var cur = e.target.dataset.current;
    console.log(cur)
    that.setData({
      current_subject: cur,
      did: that.data.subject[cur].id
    })
    that.test_list()  //获取测评列表
  },

  //获取测评列表
  test_list: function () {
    let that = this
    //获取测评内容
    var params = {
      "token": wx.getStorageSync("token"),
      "gid": that.data.gid,
      "did": that.data.did,
      "num": 10,
      "page": 1

    }
    app.ols.test_ques(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log("获取测评列表接口成功")
        that.setData({
          test_list: d.data.data
        })
      } else {
        that.setData({
          test_list: ''
        })
        
        console.log("获取测评列表接口失败")
      }
    })
  },

  //测评试卷跳转
  to_cp_test:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    var id = that.data.test_list.lists[xb].id
    console.log(xb)
    wx.navigateTo({
      url: '../../pages/cp_test/cp_test?id=' + id,
    })
  },

  //查看报告
  to_cp_report:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    var mid = that.data.test_list.lists[xb].mid
    console.log(xb)
    wx.navigateTo({
      url: '../../pages/cp_report/cp_report?mid=' + mid,
    })
  },

  onShow: function () {
    
    let that = this
    that.setData({
      gid: wx.getStorageSync("gid")
    })
    if (that.data.grade){
      for (var i = -0; i < that.data.grade.length; i++) {
        if (that.data.gid == that.data.grade[i].id) {
          that.setData({
            grade_index: i
          })
        }
      }
    }
    
    // that.test_list()       //获取测评试卷列表
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '领军网校', // 转发后 所显示的title
      // path: '/pages/index/index?isshare=1&gid=' + that.data.gid, // 相对的路径
      path: '/pages/first_page/first_page', // 相对的路径
      imageUrl: '../../images/share1.png',  //用户分享出去的自定义图片大小为5:4,
      success: (res) => {    // 成功后要做的事情
        console.log("成功")

      },
      fail: function (res) {
        // 分享失败
        console.log(res, "分享失败")
      }
    }
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
                console.log(d, "登录接口")
                if (d.data.code == 0) {
                  console.log("登陆成功")
                  wx.hideLoading()
                  that.setData({
                    login: true
                  })
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  if (d.data.data.gid != null && d.data.data.gid != 0) {
                    console.log(d.data.data.gid, "d.data.data.gid")
                    wx.setStorageSync("gid", d.data.data.gid)
                    // wx.switchTab({
                    //   url: '../../pages/index/index',   //测评页跳转
                    // })
                  } else {
                    wx.setStorageSync("gid", that.data.gid)
                  }
                } else {
                  console.log(d, "登录失败")
                  wx.showToast({
                    title: "登陆失败",
                    icon: 'none',
                    duration: 2000
                  })
                  console.log(d.data.msg, "登录失败提示")


                  wx.hideLoading()
                }
              })
            }
          })
        }
      }
    })
  },
  
})
