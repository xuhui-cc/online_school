//index.js
//获取应用实例
const app = getApp()

Page({

  // 是否要跳转到分享的页面
  toSharePage: false,
  
  // 是否页面第一次出现
  firstShow: true,

  data: {
    current_subject: 0,
    
    // 广告弹窗读对象
    adWindowModel: null,
  },
  //事件处理函数
  
  onLoad: function (options) {
    let that = this
    if(wx.getStorageSync('index_xk')){
      that.setData({
        current_subject:wx.getStorageSync('index_xk')
      })
    }
    options = app.shareTool.getShareOption()

    if (options.share && options.share == 1) {
      this.toSharePage = true
    }

    if (options.isshare == 1){
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare:options.isshare,
        gid:options.gid,
        login: wx.getStorageSync("login")
      })
      
      console.log("分享打开",that.data.isshare,that.data.gid)
      
    }else{
      that.judge_login()    //登陆判断
     
      console.log("非分享打开")
    }
    that.getGrade()  //获取年级
    that.getsubject()   //获取学科

    app.shareTool.shareTarget()

  },


  //登录判断
  judge_login:function(){
    let that = this 
    that.setData({
      login: wx.getStorageSync("login"),
      gid: wx.getStorageSync("gid")
    })
    
    console.log(that.data.login, "that.data.login")
    console.log(that.data.gid, "that.data.gid")
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
    if (wx.getStorageSync("login")){
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.grade[xb].id
      }
      app.ols.grade_update(params).then(d => {
        console.log(d)

        if (d.data.code == 0) {
          // that.test_list()
          that.getsubject()   //获取学科
          wx.setStorageSync("gid", that.data.grade[that.data.grade_index].id)
          that.setData({
            grade_select: false
          })
        } else {
          wx.showToast({
            title: '现在就是这个年级哦',
            icon: "none",
            duration: 3000
          })
          that.setData({
            grade_select: false
          })
        }
      })
    }else{
      that.getsubject()   //获取学科
      wx.setStorageSync("gid", that.data.grade[that.data.grade_index].id)
      that.setData({
        grade_select: false
      })
    }
    
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
        console.log("获取学科成功")
        that.test_list()  //获取测评列表

      } else {
        that.setData({
          subject: "",
          test_list:""
        })
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
    wx.setStorageSync('index_xk', cur)
    that.test_list()  //获取测评列表
  },

  //获取测评列表
  test_list: function () {
    let that = this
    if(wx.getStorageSync("login")){
      //获取测评内容
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.gid,
        "did": that.data.did,
        "num": 30,
        "page": 1

      }
      console.log(params,"获取测评列表接口1")
      app.ols.test_ques1(params).then(d => {
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
    }else{
      //获取测评内容
      var params = {
        // "token": wx.getStorageSync("token"),
        "gid": that.data.gid,
        "did": that.data.did,
        "num": 30,
        "page": 1

      }
      console.log(params, "获取测评列表接口2")
      app.ols.test_ques2(params).then(d => {
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
    }
    
  },

  //测评试卷跳转
  to_cp_test:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    var id = that.data.test_list.lists[xb].id
    console.log(xb)
    wx.navigateTo({
      url: app.getPagePath('cp_test') + '?id=' + id,
    })
  },

  //查看报告
  to_cp_report:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    var mid = that.data.test_list.lists[xb].mid
    console.log(xb)
    wx.navigateTo({
      url: app.getPagePath('cp_report') + '?mid=' + mid,
    })
  },

  onShow: function () {
    
    let that = this
    that.setData({
      gid: wx.getStorageSync("gid")
    })
    if (that.data.grade){
      for (var i = 0; i < that.data.grade.length; i++) {
        if (that.data.gid == that.data.grade[i].id) {
          that.setData({
            grade_index: i
          })
        }
      }
    }
    that.judge_login()    //登陆判断
    that.getsubject()   //获取学科
    
    if ((this.firstShow && !this.toSharePage) || (!this.firstShow && this.toSharePage)) {
      this.toSharePage = false
      this.getAd()
    } else {
      this.setData({
        adWindowModel: null
      })
    }
    this.firstShow = false
  },

  //名师简介
  teacher_inter:function(){
    wx.navigateTo({
      url: app.getPagePath('teacherList') + '?type=0',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let paramStr = 'isshare=1&gid=' + that.data.gid
    return app.shareTool.getShareReturnInfo('0,1', 'index', paramStr, '/images/other/share1.png', '领军网校')
  },


  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this

    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.onShow()

      }
    })
  },

  // ---------------------------------------------------接口-----------------------------------------------------
  /**
   * 获取弹窗广告
  */
  getAd: function() {
    let params = {
      // token: wx.getStorageSync("token"),
    }
    let that = this
    app.ols.getAdWindow(params).then(d=>{
      if (d.data.code == 0) {
        let ads = d.data.data
        if (ads && ads != '' && ads.length != 0) {
          let adModel = ads[0]
          let storageAdIdArray = wx.getStorageSync('adIDArray')
          let canLoadAd = false
          if (storageAdIdArray && storageAdIdArray.length != 0) {
            // 若有已存的广告ID
            if(storageAdIdArray.indexOf(adModel.id) == -1) {
              // 是新的ID
              canLoadAd = true
              storageAdIdArray.push(adModel.id)
              wx.setStorageSync('adIDArray', storageAdIdArray)
            }
          } else {
            // 若没有已存的广告ID
            wx.setStorageSync('adIDArray', [adModel.id])
            canLoadAd = true
          }
          if (canLoadAd) {
            that.setData({
              adWindowModel: adModel
            })
          }
        }
      }
    })
  },
})
