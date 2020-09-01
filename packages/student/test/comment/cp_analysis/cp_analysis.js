// pages/homework/homework.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    clientHeight: 1000,
    dtk: false,
    start_ans: false,
    cs_index: 0,
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
    ques_num: 0,
    finish_all: true,
    diffX: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var index = options.index
    var id = options.id
    var eid = options.eid
    var mid = options.mid
    console.log(index,id,eid,mid)
    that.setData({
      currentTab:Number(index),
      eid:eid,
      mid:mid
    })
    
    that.get_cp_analysis(id,eid)
    that.cp_ans_id()          //试题ID列表
  },

  //答题卡试题解析题目跳转
  dtk_jump:function(e){
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    that.setData({
      currentTab:index
    })
    that.get_cp_analysis(that.data.id_list[(that.data.currentTab)].pid, that.data.eid)
    that.setData({
      dtk: false
    })
  },
  
  //获取试题
  get_cp_analysis:function(id,eid){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id,
      "eid": eid
      
    }
    app.ols.cp_analysis(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        var cs1 = "analysis.a"
        var cs2 = "analysis.b"
        var cs3 = "analysis.c"
        var cs4 = "analysis.d"

        var replace = '<img style="max-width:92%;height:auto;display: initial !important;"'

       
        d.data.data.title = d.data.data.title.replace(/<img/gi, replace).replace(/< </gi, "&lt; <").replace(/> >/gi, "&gt; >").replace(/<</gi, "&lt; <").replace(/>>/gi, "&gt; >")
        d.data.data.note = d.data.data.note.replace(/<img/gi, replace)

        if (d.data.data.a != null) {
          d.data.data.a = d.data.data.a.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")
        }
        
        if (d.data.data.b != null) {
          d.data.data.b = d.data.data.b.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")
        }
        
        if (d.data.data.c != null) {
          d.data.data.c = d.data.data.c.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")
          
        }
        if (d.data.data.d != null) {
          d.data.data.d = d.data.data.d.replace(/<img/gi, replace).replace("$","236").replace("\u0000","9")
          
        }

        that.setData({
          analysis: d.data.data
        })
        
        console.log("测评单一试题接口调取成功")
      } else {
        console.log("测评单一试题接口==============" + d.data.msg)
      }
    })

  },
  

  //测评试题ID列表
  cp_ans_id: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "mid": that.data.mid
    }
    app.ols.cp_ans_id(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          id_list: d.data.data
        })
        var length = that.data.id_list.length
        that.setData({
          all_num:length
        })
        // console.log(length,"length")
        for (var i = 0; i < that.data.id_list.length; i++) {
          var cs = "id_list[" + i + "].ans"
          that.setData({
            [cs]: -1
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
    console.log(e.touches.length, 'e.touches.length')
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      
      diffX = that.data.startX - moveX;
     
      var moveLeft = '';
      if (diffX < -300) { //向右
        moveLeft = 'left:' + -(diffX < -90 ? -90 : diffX) + 'px;';
       
      } else if (diffX > 300) { //向左
        moveLeft = 'left:-' + (diffX > 90 ? 90 : diffX) + 'px;';
       
      } else {
        moveLeft = 'left:0px;';

      }

      that.setData({
        moveLeft: moveLeft
      });
    }
    
  },
  touchEnd: function (e) {
    let that = this
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var diffX = this.data.startX - endX;
      console.log(diffX, "diffxxx")
      var moveLeft = 'left:0px;';
      this.setData({
        moveLeft: moveLeft
      });
      if (diffX > 300) {
        if (that.data.currentTab == (that.data.id_list.length - 1)) {
          wx.showToast({
            title: '已经是最后一道咯~',
            icon: "none",
            duration: 2500
          })
        } else {
          that.setData({
            currentTab: that.data.currentTab + 1
          })
          that.get_cp_analysis(that.data.id_list[(that.data.currentTab)].pid,that.data.eid)
        }

      } else if (diffX < -300) {
        if (that.data.currentTab == 0) {
          wx.showToast({
            title: '已经是第一题咯~',
            icon: "none",
            duration: 2500
          })
        } else {
          that.setData({
            currentTab: that.data.currentTab - 1
          })
          that.get_cp_analysis(that.data.id_list[(that.data.currentTab)].pid, that.data.eid)
        }

      }
    }
  },

  //手动滑页
  // swiperchange: function (e) {
  //   var that = this
  //   var current = Number(e.currentTarget.dataset.current)  // 当前的
  //   var index = e.detail.current;//当前所在页面的 index
  //   console.log(index)
  //   console.log(current + 1)
  //   var params = {
  //     "token": wx.getStorageSync("token"),
  //     "id": that.data.id_list[(current + 1)].pid
  //   }
  //   app.ols.ques_detail(params).then(d => {
  //     console.log(d)
  //     if (d.data.code == 0) {
  //       console.log(d.data.data)
  //       var cs1 = "question.a"
  //       var cs2 = "question.b"
  //       var cs3 = "question.c"
  //       var cs4 = "question.d"
  //       that.setData({
  //         question: d.data.data,
  //         currentTab: current + 1
  //       })
  //       var cs = "question.myans"
  //       that.setData({
  //         [cs]: -1
  //       })
  //       that.setData({
  //         [cs1]: that.data.question.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display: initial !important;"'),
  //         [cs2]: that.data.question.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display: initial !important;"'),
  //         [cs3]: that.data.question.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display: initial !important;"'),
  //         [cs4]: that.data.question.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display: initial !important;"')

  //       })
  //       console.log("测评第" + (current + 2) + "一题接口调取成功")
  //     } else {
  //       console.log("测评第" + (current + 2) + "一题接口==============" + d.data.msg)
  //     }
  //   })


  // },

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
    let that = this;
    let paramsStr = 'isshare=1&gid=' + wx.getStorageSync("gid") + '&pid=' + that.data.analysis.id
    return app.shareTool.getShareReturnInfo('0,1', 'share_analysis', paramsStr, '/images/other/share1.png', '领军网校')
  }
})