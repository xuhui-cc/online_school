//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current_subject: 0,
  },
  //事件处理函数
  
  onLoad: function () {
    let that = this
    that.setData({
      gid: wx.getStorageSync("gid")
    })
    
    //获取年级
    var params = {

    }
    console.log("获取年级无传参")
    app.ols.getlist(params).then(d => {
      console.log(d,"获取年级数据")
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
    that.getsubject()   //获取学科
    that.test_list()  //获取测评列表

  },

  //学科切换
  swichNav_subject: function (e) {
    var that = this
    var cur = e.target.dataset.current;

    that.setData({
      current_subject: cur,
      did: that.data.subject[cur].id
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

      } else {
        console.log(d.data.msg, "获取学科失败")
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

  to_cp_report:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    var mid = that.data.test_list.lists[xb].mid
    console.log(xb)
    wx.navigateTo({
      url: '../../pages/cp_report/cp_report?mid=' + mid,
    })
  },


  //获取测评列表
  test_list:function(){
    let that = this
    //获取测评内容
    var params = {
      "token": wx.getStorageSync("token"),
      "gid": that.data.gid,
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
      }else{
        that.setData({
          test_list: ''
        })
      }
    })
  },

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
    
    that.test_list()       //获取测评试卷列表
  }
  
})
