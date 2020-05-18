//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
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
    app.ols.getlist(params).then(d => {
      console.log(d)
      if (d.data.code == 200) {
        // console.log(d.data.data)
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

    that.test_list()  //获取测评列表


    







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


  //年级切换
  grade_picker: function (e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      grade_index: e.detail.value,
      gid: that.data.grade[e.detail.value].id
    })
    var params = {
      "token": wx.getStorageSync("token"),
      "gid": that.data.grade[e.detail.value].id
    }
    app.ols.grade_update(params).then(d => {
      console.log(d)

      if (d.data.code == 200) {
        that.test_list()
        wx.setStorageSync("gid", that.data.grade[that.data.grade_index].id)
      }
    })
    

  },

  onShow: function () {
    
    let that = this
    that.setData({
      gid: wx.getStorageSync("gid")
    })
    for (var i = -0; i < that.data.grade.length; i++) {
      if (that.data.gid == that.data.grade[i].id) {
        that.setData({
          grade_index: i
        })
      }
    }
    that.test_list()       //获取测评试卷列表
  }
  
})
