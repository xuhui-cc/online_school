// pages/homework/homework.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cs: [{},{} ,{} ],
    currentTab: 0,
    clientHeight: 1000,
    dtk: false,
    start_ans:false,
    cs_index: 0,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
    ques_num:0,
    finish_all:true,
    diffX:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    var id = options.id
    console.log(id)
    that.setData({
      id:id
    })
    that.test_explain()   //试卷概要
    that.setmark()   //试卷状态初始化
    that.test_id()     //获取试题ID列表
    that.ques_info()      //试卷基本信息
    
  },

  //获取试题
  get_cp_test:function(id){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.ques_detail(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        var cs1 = "question.a"
        var cs2 = "question.b"
        var cs3 = "question.c"
        var cs4 = "question.d"
        that.setData({
          question: d.data.data,
          // currentTab: that.data.currentTab + 1
        })
        var cs = "question.myans"
        that.setData({
          [cs]: that.data.id_list[that.data.currentTab].ans
        })
        if (that.data.question.a != null) {
          that.setData({
            [cs1]: that.data.question.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          })
        }
        if (that.data.question.b != null) {
          that.setData({
            [cs2]: that.data.question.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          })
        }
        if (that.data.question.c != null) {
          that.setData({
            [cs3]: that.data.question.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          })
        }
        if (that.data.question.d != null) {
          that.setData({
            [cs4]: that.data.question.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')
          })
        }
        console.log("测评题接口调取成功")
        
      } else {
        console.log("测评题接口==============" + d.data.msg)
      }
    })
  },

  //获取试卷概要
  test_explain:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.test_explain(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          test_explain: d.data.data
        })
        console.log("测评状概要接口调取成功")
      } else {
        console.log("测评状概要接口==============" + d.data.msg)
      }
    })
  },

  //获取试卷基本信息
  ques_info: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.ques_info(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          ques_info: d.data.data
        })
        console.log("测评试卷基本信息接口调取成功")
      } else {
        console.log("测评试卷基本信息接口==============" + d.data.msg)
      }
    })
  },

  //答题状态初始化
  setmark: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "eid": that.data.id
    }
    app.ols.setmark(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          mid: d.data.data.mid
        })
        console.log("测评状态初始化接口调取成功")
      } else {
        console.log("测评状态初始化接口==============" + d.data.msg)
      }
    })
  },

  //测评试题ID列表
  test_id:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.test_id(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          id_list:d.data.data
        })
        for(var i=0;i<that.data.id_list.length;i++){
          var cs = "id_list[" + i + "].ans"
          that.setData({
            [cs]:-1
          })
        }
        console.log("测评试题id接口调取成功")
      } else {
        console.log("测评试题id接口==============" + d.data.msg)
      }
    })
  },

  //答题卡显示收起
  dtk: function () {
    let that = this
    that.setData({
      dtk: !that.data.dtk
    })
  },

  //答题卡题号跳转
  dtk_jump:function(e){
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index,"index")
    that.setData({
      currentTab:index
    })
    that.get_cp_test(that.data.id_list[index].pid)
    that.setData({
      dtk: false
    })
  },

  touchStart: function (e) {
    let that = this
    console.log("开始")
    if (e.touches.length == 1) {
      that.setData({
        startX: e.touches[0].clientX
      });
      console.log(that.data.startX)
    }
  },
  touchMove: function (e) {
    let that = this
    var diffX
    console.log(e.touches.length,'e.touches.length')
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      // console.log(moveX,'moveX')
      diffX = that.data.startX - moveX;
      // console.log(diffX, 'diffX')
      var moveLeft = '';
      if (diffX < -35) { //向右
        moveLeft = 'left:' + -(diffX < -90 ? -90 : diffX) + 'px;';
        // console.log("右")
      } else if (diffX > 35) { //向左
        moveLeft = 'left:-' + (diffX > 90 ? 90 : diffX) + 'px;';
        // console.log("左")
      } else {
        moveLeft = 'left:0px;';

      }
      // console.log(diffX,"diffX")
      // console.log(currentTab, "currentTab")
      
      that.setData({
        // diffX:diffX,
        moveLeft: moveLeft
      });
    }
    console.log(that.data.diffX,"that.data.diffX")
  },
  touchEnd: function (e) {
    let that =this
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var diffX = this.data.startX - endX;
      console.log(diffX,"diffxxx")
      var moveLeft = 'left:0px;';
      this.setData({
        moveLeft: moveLeft
      });
      if(diffX > 35){
        if (that.data.currentTab == (that.data.ques_info.num -1)){
          wx.showToast({
            title: '已经是最后一道咯~',
            icon:"none",
            duration:2500
          })
          that.setData({
            dtk:true
          })
        }else{
          that.setData({
            currentTab: that.data.currentTab + 1
          })
          that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
        }
        
      }else if(diffX < -35){
        if(that.data.currentTab == 0){
          wx.showToast({
            title: '已经是第一题咯~',
            icon:"none",
            duration:2500
          })
        }else{
          that.setData({
            currentTab: that.data.currentTab - 1
          })
          that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
        }
        
      }
    }
  },

  dtk_submit:function(){
    let that = this
    console.log("答题卡")
    for(var i=0;i<that.data.id_list.length;i++){
      if(that.data.id_list[i].ans == -1){
        that.setData({
          finish_all:false
        })
      }
    }
    console.log(that.data.finish_all,"finish_all")
    if (that.data.finish_all){
      console.log("我做完了")
      var params = {
        "token": wx.getStorageSync("token"),
        "mid": that.data.mid,
        "answerline": 1200
      }
      app.ols.update_cpsubmit(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          wx.navigateTo({
            url: '../../pages/cp_report/cp_report',
          })

          console.log("更新测评状态接口调取成功")
        } else {
          console.log("更新测评状态接口==============" + d.data.msg)
        }
      })
    }
    
  },

  submit_ans:function(e){
    let that = this
    var ans = e.currentTarget.dataset.ans
    var id = e.currentTarget.dataset.id
    console.log(ans,id)
    that.cp_ans_submit(ans)   //测评答案提交接口
    // var cs = "question.myans"
    // that.setData({
    //   [cs]:ans
    // })
  },

  //测评答案提交接口
  cp_ans_submit:function(ans){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "mid": that.data.mid,
      "eid":that.data.id,
      "qid":that.data.question.id,
      "submit":ans,
      "sactive":0
    }
    app.ols.cp_ans_submit(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)

        var cs = "id_list[" + that.data.currentTab + "].ans"
        that.setData({
          [cs]:ans
        })
        var cscs = "question.myans"
        that.setData({
          [cscs]: ans
        })
        
        console.log("测评试题答案提交接口调取成功")
      } else {
        console.log("测评试题答案提交接口==============" + d.data.msg)
      }
    })
    // that.setData({
    //   start_ans: true
    // })
  },

  //手动滑页
  swiperchange: function (e) {
    var that = this
    var current = Number(e.currentTarget.dataset.current)  // 当前的
    var index = e.detail.current;//当前所在页面的 index
    console.log(index)
    console.log(current + 1)
    that.setData({
      currentTab: current + 1
    })
    that.get_cp_test(that.data.id_list[that.data.currentTab].pid)

    
    
    

  },

  //开始答题按钮
  start_ans:function(){
    let that = this
    
    that.get_cp_test(that.data.id_list[0].pid)      //获取试题
    that.setData({
      start_ans : true
    })
  },

  //返回按钮延伸弹框
  back_btn:function(e){
    let that= this
    var type = e.currentTarget.dataset.type
    console.log(type)
    if(type == 1){
      wx.navigateBack({
        delta: 1  // 返回上一级页面。
      })
    }else if(type == 2){
      that.setData({
        back:false
      })
    }
  },

  //答题卡按钮延伸弹框
  dtk_submit_btn: function (e) {
    let that = this
    var type = e.currentTarget.dataset.type
    console.log(type)
    if (type == 1) {
      console.log("我要交卷")

      var params = {
        "token": wx.getStorageSync("token"),
        "mid": that.data.mid,
        "answerline": 1200
      }
      app.ols.update_cpsubmit(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)

          console.log("更新测评状态接口调取成功")
          wx.navigateBack({
            delta: 1  // 返回上一级页面。
          })
        } else {
          console.log("更新测评状态接口==============" + d.data.msg)
        }
      })
    } else if (type == 2) {
      that.setData({
        finish_all: true
      })
    }
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

  //返回上一层
  back:function(){
    let that = this
    that.setData({
      back: true
    })
    console.log(that.data.back, "back")
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