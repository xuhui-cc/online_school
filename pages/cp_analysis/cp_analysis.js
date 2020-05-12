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
    // var index = options.index
    // var id = options.id
    // var eid = options.eid
    // console.log(index,id,eid)
    
    var params = {
      "token": wx.getStorageSync("token"),
      // "id": id,
      // "eid": eid
       "id": '8778',
      "eid": '18'
    }
    app.ols.cp_analysis(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        var cs1 = "analysis.a"
        var cs2 = "analysis.b"
        var cs3 = "analysis.c"
        var cs4 = "analysis.d"
        that.setData({
          analysis: d.data.data
        })
        that.setData({
          [cs1]: that.data.analysis.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          [cs2]: that.data.analysis.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          [cs3]: that.data.analysis.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
          [cs4]: that.data.analysis.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')

        })
        console.log("测评单一试题接口调取成功")
      } else {
        console.log("测评单一试题接口==============" + d.data.msg)
      }
    })
  },

  

  

  

  //测评试题ID列表
  test_id: function () {
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
          id_list: d.data.data
        })
        for (var i = 0; i < that.data.id_list.length; i++) {
          var cs = "id_list[" + i + "].ans"
          that.setData({
            [cs]: -1
          })
          if (that.data.id_list[i].type == 1) {
            that.setData({
              ques_type1: 1
            })
          } else if (that.data.id_list[i].type == 2) {
            that.setData({
              ques_type2: 2
            })
          } else if (that.data.id_list[i].type == 3) {
            that.setData({
              ques_type3: 3
            })
          } else if (that.data.id_list[i].type == 4) {
            that.setData({
              ques_type4: 4
            })
          } else if (that.data.id_list[i].type == 5) {
            that.setData({
              ques_type5: 5
            })
          }
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
      // console.log(moveX,'moveX')
      diffX = that.data.startX - moveX;
      // console.log(diffX, 'diffX')
      var moveLeft = '';
      if (diffX < 0) { //向右
        moveLeft = 'left:' + -(diffX < -90 ? -90 : diffX) + 'px;';
        // console.log("右")
      } else if (diffX > 0) { //向左
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
    console.log(that.data.diffX, "that.data.diffX")
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
      if (diffX > 2) {
        if (that.data.currentTab == (that.data.ques_info.num - 1)) {
          wx.showToast({
            title: '已经是最后一道咯~',
            icon: "none",
            duration: 2500
          })
        } else {
          var params = {
            "token": wx.getStorageSync("token"),
            "id": that.data.id_list[(that.data.currentTab + 1)].pid
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
                currentTab: that.data.currentTab + 1
              })
              var cs = "question.myans"
              that.setData({
                [cs]: that.data.id_list[that.data.currentTab].ans
              })
              that.setData({
                [cs1]: that.data.question.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
                [cs2]: that.data.question.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
                [cs3]: that.data.question.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
                [cs4]: that.data.question.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')

              })
              console.log("测评第" + (that.data.currentTab + 1) + "一题接口调取成功")
            } else {
              console.log("测评第" + (that.data.currentTab + 1) + "一题接口==============" + d.data.msg)
            }
          })
        }

      } else if (diffX < 0) {
        if (that.data.currentTab == 0) {
          wx.showToast({
            title: '已经是第一题咯~',
            icon: "none",
            duration: 2500
          })
        } else {
          var params = {
            "token": wx.getStorageSync("token"),
            "id": that.data.id_list[(that.data.currentTab - 1)].pid
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
                currentTab: that.data.currentTab - 1
              })
              var cs = "question.myans"
              that.setData({
                [cs]: that.data.id_list[that.data.currentTab].ans
              })
              that.setData({
                [cs1]: that.data.question.a.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
                [cs2]: that.data.question.b.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
                [cs3]: that.data.question.c.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"'),
                [cs4]: that.data.question.d.replace(/<img/gi, '<img style="max-width:90%;height:auto;display:block"')

              })
              console.log("测评第" + (that.data.currentTab + 1) + "一题接口调取成功")
            } else {
              console.log("测评第" + (that.data.currentTab + 1) + "一题接口==============" + d.data.msg)
            }
          })
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

  //开始答题按钮
  start_ans: function () {
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
        var cs1 = "question.a"
        var cs2 = "question.b"
        var cs3 = "question.c"
        var cs4 = "question.d"
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
        console.log("测评第一题接口调取成功")
      } else {
        console.log("测评第一题接口==============" + d.data.msg)
      }
    })
    that.setData({
      start_ans: true
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