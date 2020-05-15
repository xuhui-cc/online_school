// pages/homework/homework.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
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
    
    var id = options.id
    console.log(id)
    that.setData({
      id:id
    })

    // that.get_cp_analysis(id, eid)
    that.wrong_id()          //错题ID列表
  },

  //答题卡试题解析题目跳转
  dtk_jump: function (e) {
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    that.setData({
      currentTab: index
    })
    that.get_wrong_detail(that.data.id_list[(that.data.currentTab)].qid, )
    that.setData({
      dtk: false
    })
  },

  //获取试题
  get_wrong_detail: function (qid) {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "qid":qid,
    }
    app.ols.wrong_detail(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        if (d.data.data.a != null){
          d.data.data.a = d.data.data.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')
        }
        if (d.data.data.b != null) {
          d.data.data.b = d.data.data.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')
        }
        if (d.data.data.c != null) {
          d.data.data.c = d.data.data.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')
        }
        if (d.data.data.d != null) {
          d.data.data.d = d.data.data.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')
        }
        
        that.setData({
          analysis: d.data.data,
        })

        if(that.data.analysis.type == 2){
          var submit = that.data.analysis.submit.split(",")
          if (d.data.data.a != null) {
            var cs1 = "analysis.a[1]"
            that.setData({
              [cs1]: false,
            })
          }
          if (d.data.data.b != null) {
            var cs1 = "analysis.b[1]"
            that.setData({
              [cs1]: false,
            })
          }
          if (d.data.data.c != null) {
            var cs1 = "analysis.c[1]"
            that.setData({
              [cs1]: false,
            })
          }
          if (d.data.data.d != null) {
            var cs1 = "analysis.d[1]"
            that.setData({
              [cs1]: false,
            })
          }

          console.log(submit)
          for(var i=0;i<submit.length;i++){
            if(submit[i] == "A"){
              var cs = "analysis.a[1]"
              that.setData({
                [cs]: true
              })
            } else if (submit[i] == "B"){
              var cs = "analysis.b[1]"
              that.setData({
                [cs]: true
              })
            } else if (submit[i] == "C") {
              var cs = "analysis.c[1]"
              that.setData({
                [cs]: true
              })
            } else if (submit[i] == "D") {
              var cs = "analysis.d[1]"
              that.setData({
                [cs]: true
              })
            }
          }
        }
        
        
        // var cs1 = "analysis.a"
        // var cs2 = "analysis.b"
        // var cs3 = "analysis.c"
        // var cs4 = "analysis.d"
        // that.setData({
        //   analysis: d.data.data
        // })
        // if (that.data.analysis.a != null) {
        //   that.setData({
        //     [cs1]: that.data.analysis.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
        //   })
        // }
        // if (that.data.analysis.b != null) {
        //   that.setData({
        //     [cs2]: that.data.analysis.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
        //   })
        // }
        // if (that.data.analysis.c != null) {
        //   that.setData({
        //     [cs3]: that.data.analysis.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
        //   })
        // }
        // if (that.data.analysis.d != null) {
        //   that.setData({
        //     [cs3]: that.data.analysis.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
        //   })
        // }
        console.log("某一错题详情接口调取成功")
      } else {
        console.log("某一错题详情接口==============" + d.data.msg)
      }
    })

  },


  //错题ID列表
  wrong_id: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "cid": that.data.id
    }
    app.ols.wrong_id(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          id_list: d.data.data,
          sum: d.data.data.length
        })
        that.get_wrong_detail(that.data.id_list[0].qid)
        console.log("错题id接口调取成功")
      } else {
        console.log("错题id接口==============" + d.data.msg)
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
      if (diffX < -35) { //向右
        moveLeft = 'left:' + -(diffX < -90 ? -90 : diffX) + 'px;';
        
      } else if (diffX > 35) { //向左
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
      if (diffX > 35) {
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
          that.get_wrong_detail(that.data.id_list[(that.data.currentTab)].id)
        }

      } else if (diffX < -35) {
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
          that.get_wrong_detail(that.data.id_list[(that.data.currentTab)].id)
        }

      }
    }
  },





  //手动滑页
  swiperchange: function (e) {
    var that = this
    var current = Number(e.currentTarget.dataset.current)  // 当前的
    var index = e.detail.current;//当前所在页面的 index
    console.log(index)
    console.log(current + 1)
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id_list[(current + 1)].pid
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
          currentTab: current + 1
        })
        var cs = "question.myans"
        that.setData({
          [cs]: -1
        })
        that.setData({
          [cs1]: that.data.question.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          [cs2]: that.data.question.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          [cs3]: that.data.question.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          [cs4]: that.data.question.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')

        })
        console.log("测评第" + (current + 2) + "一题接口调取成功")
      } else {
        console.log("测评第" + (current + 2) + "一题接口==============" + d.data.msg)
      }
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