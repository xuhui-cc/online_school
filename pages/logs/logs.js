const app = getApp()
Page({
  data: {
    subject:[ {'id':-1, 'title': '推荐'}],
    current_special:-1,
    current_subject: 0,
    ad:["1","1","1","1","1","1"]
  },

  onLoad: function (options) {
    let that = this
   
    if (options.isshare == 1) {
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare: options.isshare,
        gid: options.gid,
        login: wx.getStorageSync("login")
      })
      console.log("分享打开", that.data.isshare, that.data.gid)

    } else {
      that.judge_login()    //登陆判断
      console.log("非分享打开")
    }


    that.getgrade()    //获取年级 
    that.getsubject()   //获取学科

    that.hot()  //热门课程

  },

  //登录判断
  judge_login: function () {
    let that = this
    that.setData({
     
      login: wx.getStorageSync("login"),
      gid: wx.getStorageSync("gid")
    })
  
    console.log(that.data.login, "that.data.login")
    console.log(that.data.gid, "that.data.gid")
  },

  //年级弹框
  grade_select: function () {
    let that = this

    that.setData({
      grade_select: true
    })
  },

  //专题切换
  swichNav_special: function (e) {
    var that = this
    var cur = e.target.dataset.current;
    if (cur == that.data.current_special){
      console.log("专题当前选择项")
      that.setData({
        current_special: -1
      })
      that.getcourse()    //获取课程
    }else{
      that.setData({
        current_special: cur
      })
      that.special_course() //获取专题课程
    }
    
      
  },

  //科目切换
  swichNav_subject: function (e) {
    var that = this
    var cur = e.target.dataset.current;
    if(cur == 0){
      that.setData({
        current_subject: cur,
        current_special:-1,
      })
    }else{
      that.setData({
        current_subject: cur,
        current_special:-1,
        did: that.data.subject[cur].id
      })
  
      that.getspecial()  //获取专题
      that.getcourse()     //获取课程
    }

    
  },

  //热门课程
  hot:function(){
    let that = this
    var params = {
      "gid": that.data.gid,
      "num": 30,
      "page": 1
    }
    // console.log(params, "params获取课程未登录")
    app.ols.group_list3(params).then(d => {
    // app.ols.grade_course2(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        var timestamp = (Date.parse(new Date()))/1000
        console.log(timestamp,"timestamp")
        for(var i=0;i<d.data.data.lists.length;i++){
          d.data.data.lists[i].endtime = d.data.data.lists[i].endtime - timestamp
        }
        that.setData({
          hot1: d.data.data
        })
        that.cs()
        // console.log(that.data.course, "获取课程未登录")
      } else {
        console.log(d.data.msg, "获取课程未登录msg，失败")
        that.setData({
          hot1: ''
        })
      }
    })
  },

  to_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    // var type = e.currentTarget.dataset.type
    console.log(xb)
    if(that.data.course.lists[xb].is_group == 0){
        wx.navigateTo({
          url: '../../pages/course_detail/course_detail?kid=' + that.data.course.lists[xb].kid,
        })
    }else{
      if(that.data.course.lists[xb].is_buy == 1 || that.data.course.lists[xb].is_buy == 3){
        wx.navigateTo({
          url: '../../pages/course_detail/course_detail?kid=' + that.data.course.lists[xb].kid,
        })
      }
      else{
        wx.navigateTo({
          url: '../../pages/groupBuy/groupBuy?kid=' + that.data.course.lists[xb].kid,
        })
      }
    } 
      
  },

  //年级切换
  subject_sel: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    that.setData({
      grade_index: xb,
      gid: that.data.grade[xb].id,
      current_subject: -1
    })
    if (wx.getStorageSync("login")) {
      
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.grade[xb].id
      }
      console.log(params, "params")
      app.ols.grade_update(params).then(d => {
        console.log(d)

        if (d.data.code == 0) {

          wx.setStorageSync('gid', that.data.grade[xb].id)
          that.getsubject()   //获取科目
          // that.getcourse()    //获取课程
          // that.getspecial()      //获取专题
          that.setData({
            grade_select: false
          })
          console.log("更新接口存班级")
        } else {
          wx.showToast({
            title: '选择失败',
            icon: "none",
            duration: 3000
          })
        }
      })
    }else{
      wx.setStorageSync('gid', that.data.grade[xb].id)
      that.getsubject()   //获取科目
      // that.getcourse()    //获取课程
      // that.getspecial()      //获取专题
      that.setData({
        grade_select: false
      })
    }
    
    
    
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
    if (wx.getStorageSync("login")){
      //获取课程已登录
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.gid,
        "did": that.data.did,
        "num": 30,
        "page": 1
      }
      console.log(params, "params获取课程已登录")
      app.ols.grade_course3(params).then(d => {
      // app.ols.grade_course1(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course: d.data.data
          })
          console.log(that.data.course, "获取课程已登录")
        } else {
          console.log(d.data.msg, "获取课程已登录msg，失败")
          that.setData({
            course: ''
          })
        }
      })
    }else{
      //获取课程未登录
      var params = {
        "gid": that.data.gid,
        "did": that.data.did,
        "num": 30,
        "page": 1
      }
      console.log(params, "params获取课程未登录")
      app.ols.grade_course3(params).then(d => {
      // app.ols.grade_course2(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course: d.data.data
          })
          console.log(that.data.course, "获取课程未登录")
        } else {
          console.log(d.data.msg, "获取课程未登录msg，失败")
          that.setData({
            course: ''
          })
        }
      })
    }
    
  },

  //获取科目接口
  getsubject: function () {
    let that = this
    //获取科目
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
          that.data.subject.push(d.data.data[i]);   //对象转换为数组
        }
        // console.log(arr2)
        that.setData({
          subject: that.data.subject
        })
        if(that.data.current_subject > -1){
          that.setData({
            did: that.data.subject[that.data.current_subject].id
          })
          that.getspecial()      //获取专题
          if (that.data.current_special != -1) {
            that.special_course()  //获取专题课程
          }else{
            that.getcourse()    //获取课程
          }
        }
        
      } else {
        console.log(d.data.msg, "获取科目失败")
      }
    })
  },

  //专题获取课程
  special_course:function(){
    let that = this
    if (wx.getStorageSync("login")){
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.gid,
        "did": that.data.did,
        "cid": that.data.special[that.data.current_special].id,
        "num": 30,
        "page": 1
      }
      app.ols.grade_course3(params).then(d => {
      // app.ols.grade_course1(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course: d.data.data
          })
          console.log(that.data.course, "专题获取课程")
        } else {
          console.log(d.data.msg, "专题获取课程msg，失败")
          that.setData({
            course: ''
          })
        }
      })
    }else{
      var params = {
        
        "gid": that.data.gid,
        "did": that.data.did,
        "cid": that.data.special[that.data.current_special].id,
        "num": 30,
        "page": 1
      }
      app.ols.grade_course3(params).then(d => {
      // app.ols.grade_course2(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course: d.data.data
          })
          console.log(that.data.course, "专题获取课程")
        } else {
          console.log(d.data.msg, "专题获取课程msg，失败")
          that.setData({
            course: ''
          })
        }
      })
    }
    
  },

  //获取年级接口
  getgrade: function () {
    let that = this
    //获取年级
    var params = {
    }
    console.log("获取年级无参数")
    app.ols.getlist(params).then(d => {
      console.log(d, "获取年级接口返回数据")
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
    console.log(params, "获取专题params")
    app.ols.gettoplist(params).then(d => {
      console.log(d,"获取专题接口数据")
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

//关闭年级选择蒙层
  del: function () {
    let that = this
    that.setData({
      grade_select: false
    })
  },

  onShow: function () {
    let that = this
    that.judge_login()    //登陆判断

    if(that.data.grade){
      for (var i = -0; i < that.data.grade.length; i++) {
        if (that.data.gid == that.data.grade[i].id) {
          that.setData({
            grade_index: i
          })
        }
      }
    }
    
    console.log(that.data.gid,"onshow")
   
    // that.getsubject()   //获取学科
    // that.getcourse()    //获取课程
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '领军网校', // 转发后 所显示的title
      path: '/pages/logs/logs?isshare=1&gid=' + that.data.gid, // 相对的路径
      // path: '/pages/first_page/first_page', // 相对的路径
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

  cs:function(){
    let that = this
    let len=that.data.hot1.lists.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.hot1.lists.length; i++) { 
        var intDiff = that.data.hot1.lists[i].endtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.hot1.lists[i].endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        that.data.hot1.lists[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        wearList: that.data.hot1.lists 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    var timer = setInterval(nowTime, 1000); 
  },

    
})
