
const app = getApp()
Page({
  data: {
    // grade: ["初三", "高三 文科", "高三 理科"],
    // grade_index: 1,
    // classify: ["推荐", "语文", "数学", "英语", "政治", "历史", "地理"],
    
    // current_special:0,
    current_subject: 0,
  },
  onLoad: function () {
    let that = this
    that.setData({
      gid: wx.getStorageSync("gid")
    })

    that.getgrade()    //获取年级 
    that.getsubject()   //获取学科
    
    that.getcourse()         //获取课程
    
    

    

    
   

  },

  //专题切换
  swichNav_special: function (e) {
    var that = this

    var cur = e.target.dataset.current;
        
    that.setData({
      current_special: cur
    })
      
  },

  //科目切换
  swichNav_subject: function (e) {
    var that = this
    var cur = e.target.dataset.current;

    that.setData({
      current_subject: cur,
      did: that.data.subject[cur].id
    })
    

    that.getsubject()    //获取科目
    that.getcourse()     //获取课程

    // //获取专题
    // var params = {
    //   "gid":that.data.gid,
    //   "did":that.data.did
    // }
    // app.ols.gettoplist(params).then(d => {
    //   console.log(d)
    //   if (d.data.code == 0) {
    //     console.log(d.data.data)
    //     that.setData({
    //       special: d.data.data
    //     })
    //   }
    // })

    

  },

  to_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: '../../pages/course_detail/course_detail?kid=' + that.data.course.lists[xb].kid,
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
    // console.log(that.data.grade[that.data.grade_index])
    wx.setStorageSync("gid", that.data.grade[that.data.grade_index].id)
    that.getcourse()    //获取课程
    that.getspecial()      //获取专题
    

  },

  
  //判断当前滚动超过一屏时，设置tab标题滚动条。 
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  //获取课程接口
  getcourse:function(){
    let that = this
    //获取课程
    var params = {
      "token": wx.getStorageSync("token"),
      "gid": that.data.gid,
      "did": that.data.did,
      "num": 12,
      "page": 1
    }
    app.ols.grade_course(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          course: d.data.data
        })
        console.log(that.data.course,"获取课程")
      }else{
        console.log(d.data.msg,"获取课程msg，失败")
        that.setData({
          course: ''
        })
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
        that.getspecial()      //获取专题
        // that.getcourse()    //获取课程
      } else {
        console.log(d.data.msg, "获取科目失败")
      }
    })
  },

  //获取年级接口
  getgrade: function () {
    let that = this
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
            // that.getcourse()   //获取课程
            // that.getsubject()
          }
        }

      } else {
        console.log(d.data.msg, "获取年级失败")
      }
    })
  },

  //获取专题接口
  getspecial: function () {
    let that = this
    //获取专题
    var params = {
      "gid":that.data.gid,
      "did":that.data.did
    }
    app.ols.gettoplist(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          special: d.data.data
        })
        console.log("获取专题成功")
      }else{
        console.log(d.data.msg,"获取专题失败")
      }
    })
  },
    
})
