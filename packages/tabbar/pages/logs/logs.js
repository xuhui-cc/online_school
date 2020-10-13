const app = getApp()
var timer,ms_timer
Page({
  data: {
    // subject:[ {'id':-1, 'title': '推荐'},{'id':-2, 'title': 'VIP'}],
    // subject:[ {'id':-1, 'title': '推荐'}],
    current_special:-1,
    current_subject: 0,
    btn_buy:app.globalData.btn_buy
  },

  onLoad: function (options) {
    options = app.shareTool.getShareOption()
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

    // that.hot()  //热门课程
    app.shareTool.shareTarget()
  },
  //轮播图
  get_banner3:function(){
    let that = this 
    var params = {}
    // console.log(params, "params")
    app.ols.banner3(params).then(d => {
      console.log(d,"轮播")

      if (d.data.code == 0) {

        
        that.setData({
          banner3: d.data.data.lists
        })
       
      } else {
        console.log("轮播图失败")
      }
    })
  },

  //获取会员卡列表
  v4_viplist:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
    }
    // console.log(params, "会员列表参数")
    app.ols.v4_viplist(params).then(d => {
      console.log(d, "会员列表数据")
      if (d.data.code == 0) {
        if(d.data.data.lists[0].course){
          d.data.data.lists[0].course_num = d.data.data.lists[0].course.length
        }
        
        that.setData({
          vip_list:d.data.data.lists,
          vip:d.data.data
        })
        console.log("会员列表成功")
      } else {
        console.log("会员列表失败==============" + d.data.msg)
      }
    })
  },

  //广告条跳转
  ad_detail: function (e) {
    var id = e.currentTarget.dataset.id
    var type = e.currentTarget.dataset.type
    var cate = e.currentTarget.dataset.cate
    if(type == 2) {
      if(cate == 0){
        wx.navigateTo({
          url: app.getPagePath('course_detail') + '?kid=' + id,
        })
      }
      else if(cate == 1){
        wx.navigateTo({
          url: app.getPagePath('groupBuy') + '?kid=' + id,
        })
      }else if(cate == 2){
        console.log("秒杀")
        // wx.navigateTo({
        //   url: '../../pages/groupBuy/groupBuy?kid=' + id,
        // })
      }
    }else if(type == 1){
      console.log("文章")
      // wx.navigateTo({
      //   url: '/pages/book_detail/book_detail?bid=' + bid
      // })
    }
    
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
      
    }else if(cur == 1){
      that.setData({
        current_subject: cur,
        current_special:-1,
        special:''
      })
      that.v4_viplist()  //获取vip
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
    if (wx.getStorageSync("login")) {
      
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.gid
      }
    }else{
      var params = {
        "token":0,
        "gid": that.data.gid,
      }
    }
    
    // console.log(params, "params获取课程未登录")
    app.ols.hot_list4(params).then(d => {
    // app.ols.grade_course2(params).then(d => {
      // console.log(d)
      var hot1 = []
      var hot2 = []
      var hot3 = []
      if (d.data.code == 0) {
        // console.log(d.data.data,"热门课程")
        var timestamp = (Date.parse(new Date()))/1000
        console.log(timestamp,"timestamp")
        
        for(var i=0;i<d.data.data.lists.length;i++){
          if(d.data.data.lists[i].pt_price){
            d.data.data.lists[i].endtime = d.data.data.lists[i].endtime - timestamp
            hot1.push(d.data.data.lists[i])
          }else if(d.data.data.lists[i].ms_price){
            d.data.data.lists[i].endtime = d.data.data.lists[i].endtime - timestamp
            hot3.push(d.data.data.lists[i])
          }else{
            hot2.push(d.data.data.lists[i])
          }
         
        }
        that.setData({
          hot1: hot1,
          hot2:hot2,
          hot3:hot3
        })
        if(hot1 != ''){
          that.cs()
        }
        if(hot3 != ''){
          that.cs_ms()
        }
        // that.cs()
        // console.log(that.data.course, "获取课程未登录")
      } else {
        // console.log(d.data.msg, "获取课程未登录msg，失败")
        that.setData({
          hot1: '',
          hot2:'',
          hot3:''
        })
      }
    })
  },

  //vip详情页跳转
  to_vip:function(){
    let that = this
    wx.navigateTo({
      url: app.getPagePath('vip_detail'),
    })
  },

  //课程详情跳转
  to_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    // var type = e.currentTarget.dataset.type
    console.log(xb)
    var course = that.data.course.lists[xb]
    if(course.type == 0){
      wx.navigateTo({
        url: app.getPagePath('course_detail') + '?kid=' + course.kid,
      })
  }else if(course.type == 1){
    wx.navigateTo({
      url: app.getPagePath('groupBuy') + '?kid=' + course.kid,
    })
  }else if(course.type == 2){
    wx.navigateTo({
      url: app.getPagePath('course_seckill') + '?kid=' + course.kid,
    })
  }
  },

  vip_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    // var type = e.currentTarget.dataset.type
    console.log(xb)
    var course = that.data.vip_list[0].course[xb]
    if(course.type == 0){
        wx.navigateTo({
          url: app.getPagePath('course_detail') + '?kid=' + course.kid,
        })
    }else if(course.type == 1){
      wx.navigateTo({
        url: app.getPagePath('groupBuy') + '?kid=' + course.kid,
      })
    }else if(course.type == 2){
      wx.navigateTo({
        url: app.getPagePath('course_seckill') + '?kid=' + course.kid,
      })
    }
  },

  to_course_hot:function(e){
    let that = this
    var kid = e.currentTarget.dataset.kid
    var hot = e.currentTarget.dataset.hot
    if(hot == 1){
      wx.navigateTo({
        url: app.getPagePath('groupBuy') + '?kid=' + kid,
      })
    }else if(hot == 2){
      wx.navigateTo({
        url: app.getPagePath('course_detail') + '?kid=' + kid,
      })

    }else if(hot == 3){
      wx.navigateTo({
        url: app.getPagePath('course_seckill') + '?kid=' + kid,
      })

    }
      
  },

  //年级切换
  subject_sel: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    that.setData({
      grade_index: xb,
      gid: that.data.grade[xb].id,
      current_subject: 0,
      hot2:'',
      hot3:'',
    })
    if (wx.getStorageSync("login")) {
      
      var params = {
        "token": wx.getStorageSync("token"),
        "gid": that.data.grade[xb].id
      }
      console.log(params, "params")
      app.ols.grade_update(params).then(d => {
        console.log(d,"年级切换")

        if (d.data.code == 0) {
          clearInterval(timer);   
          wx.setStorageSync('gid', that.data.grade[xb].id)
          that.getsubject()   //获取科目
          that.hot()  //获取热门
          that.setData({
            grade_select: false
          })
          console.log("更新接口存班级")
        } else {
          wx.showToast({
            title: '现在就是这个年级哦',
            icon: "none",
            duration: 3000
          })
          that.getsubject()   //获取科目
          that.hot()  //获取热门
          that.setData({
            grade_select: false
          })
        }
      })
    }else{
      clearInterval(timer);   
      wx.setStorageSync('gid', that.data.grade[xb].id)
      that.getsubject()   //获取科目
      that.hot()  //获取热门

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
    }else{
      var params = {
        "token": 0,
        "gid": that.data.gid,
        "did": that.data.did,
        "num": 30,
        "page": 1
      }
    }
      console.log(params, "params获取课程")
      app.ols.grade_course4(params).then(d => {
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
        // var subject=[ {'id':-1, 'title': '推荐'}]
        var subject=[ {'id':-1, 'title': '推荐'},{'id':-2, 'title': 'VIP'}]
        for (let i in d.data.data) {
          subject.push(d.data.data[i]);   //对象转换为数组
        }
        // console.log(arr2)
        that.setData({
          subject: subject
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
        that.setData({
          subject: ''
        })
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
    }else{
      var params = {
        "token": 0,
        "gid": that.data.gid,
        "did": that.data.did,
        "cid": that.data.special[that.data.current_special].id,
        "num": 30,
        "page": 1
      }
    }
      app.ols.grade_course4(params).then(d => {
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
    that.get_banner3()  //轮播图
    if(that.data.grade){
      for (var i = -0; i < that.data.grade.length; i++) {
        if (that.data.gid == that.data.grade[i].id) {
          that.setData({
            grade_index: i
          })
        }
      }
    }
    that.setData({
      current_special:-1,
    })
    console.log(that.data.gid,"onshow")

    that.hot()  //热门课程
    that.getsubject()   //获取学科
    if(that.data.current_subject != 1){
      that.getspecial()  //获取专题
    }
    that.getcourse()     //获取课程
    that.v4_viplist()   //获取vip
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let paramStr = 'isshare=1&gid=' + that.data.gid
    return app.shareTool.getShareReturnInfo('0,1', 'logs', paramStr, '/images/other/share1.png', '领军网校')
  },

  cs:function(){
    let that = this
    let len=that.data.hot1.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.hot1.length; i++) { 
        var intDiff = that.data.hot1[i].endtime;//获取数据中的时间戳 
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
          that.data.hot1[i].endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        that.data.hot1[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        hot1: that.data.hot1 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    timer = setInterval(nowTime, 1000); 
  },

  cs_ms:function(){
    let that = this
    let len=that.data.hot3.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.hot3.length; i++) { 
        var intDiff = that.data.hot3[i].endtime;//获取数据中的时间戳 
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
          that.data.hot3[i].endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(ms_timer);   
        } 
        // console.log(str); 
        that.data.hot3[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 
      } 
      that.setData({ 
        hot3: that.data.hot3 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    ms_timer = setInterval(nowTime, 1000); 
  },

  //获取微信绑定手机号登录
    getPhoneNumber: function (e) {
      var that = this
  
      app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
        if (success) {
          that.setData({
            login: true
          })
          // that.v4_viplist()
          that.onShow()
        }
      })
    },

    //名师简介
    teacher_inter:function(){
      wx.navigateTo({
        url: app.getPagePath('teacherList') + '?type=1',
      })
    },

   /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timer); 
    clearInterval(ms_timer); 
  },

  cs:function(){
    let that = this 
    wx.requestSubscribeMessage({
      tmplIds: ['T4tp85vTUVp1BiSBRmlC7CRQHDhOYitDTR0zCfv-3yg'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      success(res) { 
        console.log(res)
        var params = {
          "token":wx.getStorageSync('token'),
          "course_id":that.data.select_kid
        }
        app.ols.subMsg(params).then(d => {
          if (d.data.code == 0) {
            that.hot()  //热门课程
            that.getcourse()     //获取课程
            that.v4_viplist()   //获取vip
          }else{
            
          }
        })
      }
    })
  },

  subMsg:function(e){
    let that = this 
    // var kid = 
    that.setData({
      select_kid:e.currentTarget.dataset.kid
    })
    
    // console.log(kid)
    that.cs()
    
  },
})
