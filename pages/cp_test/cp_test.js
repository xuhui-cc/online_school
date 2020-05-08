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
    console.log('touchMove')
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      console.log(moveX,'moveX')
      var diffX = that.data.startX - moveX;
      console.log(diffX, 'diffX')
      var moveLeft = '';
      if (diffX < 0) { //向右
        moveLeft = 'left:' + -(diffX < -90 ? -90 : diffX) + 'px;';
        console.log("右")
      } else if (diffX > 0) { //向左
        moveLeft = 'left:-' + (diffX > 90 ? 90 : diffX) + 'px;';
        console.log("左")
      } else {
        moveLeft = 'left:0px;';

      }
      console.log(diffX,"diffX")
      that.setData({
        moveLeft: moveLeft
      });
    }
  },
  touchEnd: function (e) {
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var diffX = this.data.startX - endX;
      var moveLeft = 'left:0px;';
      this.setData({
        moveLeft: moveLeft
      });
    }
  },

  hhh:function(e){
    let that = this
    console.log(e.currentTarget.dataset.hh)
  },

  //手动滑页
  swiperchange: function (e) {
    var that = this
    var current = Number(e.currentTarget.dataset.current)  // 当前的
    var index = e.detail.current;//当前所在页面的 index
    console.log(index)
    console.log(current + 1)

    

    
    // var params = {
    //   "token": wx.getStorageSync("token"),
    //   "id": that.data.id_list[(current + 1)].pid
    // }
    // app.ols.ques_detail(params).then(d => {
    //   console.log(d)
    //   if (d.data.code == 0) {
    //     console.log(d.data.data)
    //     var cs1 = "question.a"
    //     var cs2 = "question.b"
    //     var cs3 = "question.c"
    //     var cs4 = "question.d"
    //     that.setData({
    //       question: d.data.data,
    //       currentTab: current + 1
    //     })
    //     that.setData({
    //       [cs1]: that.data.question.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
    //       [cs2]: that.data.question.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
    //       [cs3]: that.data.question.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
    //       [cs4]: that.data.question.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')
    //     })
    //     console.log("测评第" + (current + 2) + "一题接口调取成功")
    //   } else {
    //     console.log("测评第" + (current + 2) + "一题接口==============" + d.data.msg)
    //   }
    // })
    

  },

  //开始答题按钮
  start_ans:function(){
    let that = this
    
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id_list[0].pid
    }
    app.ols.ques_detail(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          question: d.data.data
        })
        console.log("测评第一题接口调取成功")
      } else {
        console.log("测评第一题接口==============" + d.data.msg)
      }
    })
    that.setData({
      start_ans : true
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