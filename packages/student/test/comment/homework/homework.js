// pages/homework/homework.js
const app = getApp()
Page({

  // 分享图片的路径
  shareImagePath: '',

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
    diffX: 0,
    img: [],
    imgs: [],
    showCanvas:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.isshare == 1){
      wx.setStorageSync("gid", options.gid)
      that.setData({
        eid:options.eid,
        kid: options.kid,
        oid: options.oid,
        isshare:options.isshare,
        gid:options.gid,
        login: wx.getStorageSync("login")
      })
      if(that.data.login){
        that.judge_share()   //分享判断
        console.log("分享已登录")
      }
      
      console.log("分享未登录",that.data.isshare,that.data.gid)
      
    }else{
      that.setData({
        eid: options.eid,
        kid: options.kid,
        oid: options.oid,
        free:options.free
      })
      that.test_explain()   //试卷概要
      that.test_id()     //获取试题ID列表
      that.ques_info()      //试卷基本信息
      that.setmark()   //试卷状态初始化
      console.log("非分享打开")

      // that.judge_share()  //分享判断接口
    }
  },

  onPageScroll: function (e) {
    let that = this
    // var top = 0
    // console.log(e.scrollTop)
    // that.setData({
    //   top:e.scrollTop
    // })
    if(e.scrollTop > 0){
      that.setData({
        top:e.scrollTop
      })
    }
    
  },





  //获取试题
  get_cp_test: function (id) {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.ques_detail(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        var replace_img = '<img style="max-width:90%;height:auto;display: initial !important;"'
        d.data.data.title = d.data.data.title.replace(/<img/gi, replace_img).replace(/< </gi, "&lt; <").replace(/> >/gi, "&gt; >").replace(/<</gi, "&lt; <").replace(/>>/gi, "&gt; >")
        
        if (d.data.data.a != null) {
          d.data.data.a = d.data.data.a.replace(/<img/gi, replace_img).replace("$","236").replace("\u0000","9")
        }
        if (d.data.data.b != null) {
          d.data.data.b = d.data.data.b.replace(/<img/gi, replace_img).replace("$","236").replace("\u0000","9")
        }
        if (d.data.data.c != null) {
          d.data.data.c = d.data.data.c.replace(/<img/gi, replace_img).replace("$","236").replace("\u0000","9")
        }
        if (d.data.data.d != null) {
          d.data.data.d = d.data.data.d.replace(/<img/gi, replace_img).replace("$","236").replace("\u0000","9")
        }
        that.setData({
          question: d.data.data,
        })
        var cs = "question.myans"
        that.setData({
          [cs]: that.data.id_list[that.data.currentTab].ans
        })
        console.log("作业题接口调取成功")
      } else {
        console.log("作业题接口==============" + d.data.msg)
      }
    })
  },

  //获取试卷概要
  test_explain: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.eid
    }
    app.ols.test_explain(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          test_explain: d.data.data
        })
        console.log("课后作业概要接口调取成功")
      } else {
        console.log("课后作业概要接口==============" + d.data.msg)
      }
    })
  },

  //获取试卷基本信息
  ques_info: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.eid
    }
    console.log(params,"作业基本信息接口参数")
    app.ols.ques_info(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        
        that.setData({
          ques_info: d.data.data
        })
        that.drawShareImage(d.data.data)
        console.log("作业基本信息接口调取成功")
      } else {
        console.log("作业基本信息接口==============" + d.data.msg)
      }
    })
  },

  //答题状态初始化
  setmark: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "eid": that.data.eid,
      "kid": that.data.kid,
      "oid": that.data.oid,
    }
    app.ols.setmark(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          mid: d.data.data.mid
        })
        console.log("作业状态初始化接口调取成功")
      } else {
        console.log("作业状态初始化接口==============" + d.data.msg)
      }
    })
  },

  //作业试题ID列表
  test_id: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.eid
    }
    app.ols.test_id(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          id_list: d.data.data
        })
        for (var i = 0; i < that.data.id_list.length; i++) {
          if (that.data.id_list[i].type == 1){
            var cs = "id_list[" + i + "].ans"
            that.setData({
              ques_type1:1,
              [cs]: -1
            })
          } else if (that.data.id_list[i].type == 2) {
            var cs = "id_list[" + i + "].ans"
            that.setData({
              ques_type2: 2,
              [cs]: ''
            })
          } else if (that.data.id_list[i].type == 3) {
            var cs = "id_list[" + i + "].ans"
            that.setData({
              ques_type3: 3,
              [cs]: []
            })
          } else if (that.data.id_list[i].type == 4) {
            var cs = "id_list[" + i + "].ans"
            that.setData({
              ques_type4: 4,
              [cs]: []
            })
          } else if (that.data.id_list[i].type == 5) {
            var cs = "id_list[" + i + "].ans"
            that.setData({
              ques_type5: 5,
              [cs]: []
            })
          }
          else if (that.data.id_list[i].type == 6) {
            var cs = "id_list[" + i + "].ans"
            that.setData({
              ques_type6: 6,
              [cs]: []
            })
          }
        }
        console.log("作业id接口调取成功")
      } else {
        console.log("作业id接口==============" + d.data.msg)
      }
    })
  },

  //答题卡显示收起
  dtk: function () {
    let that = this
    if(that.data.dtk){
      wx.pageScrollTo({
        scrollTop: that.data.top,
        duration: 500
      });
      console.log("页面定位")
    }
    that.setData({
      dtk: !that.data.dtk
    })
  },
  //答题卡返回试题
  dtk_back: function () {
    let that = this
    that.setData({
      dtk: false
    })
  },

  //答题卡题号跳转
  dtk_jump: function (e) {
    let that = this
    var index = e.currentTarget.dataset.index
    console.log(index, "index")
    that.setData({
      currentTab: index
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
    console.log(e.touches.length, 'e.touches.length')
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      diffX = that.data.startX - moveX;
      var moveLeft = '';
      if (diffX < -150) { //向右
        moveLeft = 'left:' + -(diffX < -90 ? -90 : diffX) + 'px;';
      } else if (diffX > 150) { //向左
        moveLeft = 'left:-' + (diffX > 90 ? 90 : diffX) + 'px;';
      } else {
        moveLeft = 'left:0px;';
      }
      
      that.setData({
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
      if (diffX > 150) {
        if (that.data.currentTab == (that.data.ques_info.num - 1)) {
          that.setData({
            dtk: true
          })
        } else {
          that.setData({
            img: [],
            imgs: [],
            currentTab: that.data.currentTab + 1
          })
          that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
        }

      } else if (diffX < -150) {
        if (that.data.currentTab == 0) {
          wx.showToast({
            title: '已经是第一题咯~',
            icon: "none",
            duration: 2500
          })
        } else {
          that.setData({
            img:[],
            imgs:[],
            currentTab: that.data.currentTab - 1
          })
          that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
        }

      }
    }
  },

  dtk_submit: function () {
    let that = this
    console.log("答题卡")
    var timestamp = (Date.parse(new Date())) / 1000
    console.log(timestamp, "timestamp")
    var answerline = timestamp - that.data.start_time
    console.log(answerline, "answerline")
    for (var i = 0; i < that.data.id_list.length; i++) {
      if (that.data.id_list[i].ans == -1 || that.data.id_list[i].ans == '') {
        that.setData({
          finish_all: false
        })
      }
    }
    console.log(that.data.finish_all, "finish_all")
    if (that.data.finish_all) {
      console.log("我做完了")
      that.test_end(answerline)   //测评结束记录
      var params = {
        "token": wx.getStorageSync("token"),
        "mid": that.data.mid,
        "answerline": answerline
      }
      app.ols.update_testsubmit(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          if(that.data.free == 1){
            that.to_free()
            console.log("开通免费课")
          }
          for (var i = 0; i < that.data.id_list.length;i++){
            if (that.data.id_list[i].type != 1){
              that.setData({
                danxuan:false
              })
            }else{
              that.setData({
                danxuan: true
              })
            }
          }
          if (that.data.danxuan){
            wx.redirectTo({
              url: app.getPagePath('homework_report') + '?mid=' + that.data.mid
            })
          }else{
            if(that.data.isshare == 1){
              wx.redirectTo({
                url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
              })
            }else{
              wx.navigateBack({
                delta: 1  // 返回上一级页面。
              })
            }
          }
          console.log(d.data.data)
          

          console.log("更新作业状态接口调取成功")
        } else {
          console.log("更新作业状态接口==============" + d.data.msg)
        }
      })
    }

  },

  submit_ans: function (e) {
    let that = this
    console.log("单选题")
    var ans = e.currentTarget.dataset.ans
    var cs = "id_list[" + that.data.currentTab + "].ans"
    var cscs = "question.myans"
    that.setData({
      [cs]: ans,
      [cscs]: ans
    })
    
    that.work_submit(ans)   //作业答案提交接口
  },


  submit_ans1: function (e) {
    let that = this
    var ans_arr = []
    var ans
    console.log("多选题")
    var ans = e.currentTarget.dataset.ans
    var id = e.currentTarget.dataset.id
    console.log(ans, id)
    if (that.data.question.myans != ''){
      if (that.data.question.myans[ans] == ans) {
        var cscs = "question.myans[" + ans + "]"
        that.setData({
          [cscs]: -1
        })
      } else {
        var cscs = "question.myans[" + ans + "]"
        that.setData({
          [cscs]: ans
        })
      }
    }else{
      var cscs = "question.myans[" + ans + "]"
      that.setData({
        [cscs]: ans
      })
    }
    var cs = "id_list[" + that.data.currentTab + "].ans"
    that.setData({
      [cs]: that.data.question.myans
    })
    
    console.log(that.data.id_list[that.data.currentTab])
    
    
   
    for(var i=0;i < that.data.question.myans.length;i++){
      console.log(i,"i")
      if (that.data.question.myans[i] != -1 && that.data.question.myans[i] != null){
        ans_arr.push(i)
      }
    }
    console.log(ans_arr)
    ans = ans_arr.join(",");
    console.log(ans)
    that.work_submit(ans)   //作业答案提交接口
  },

  //作业答案提交接口
  work_submit: function (ans) {
    let that = this
    var sactive
    if(that.data.question.type <= 3){
      sactive = 0
    }else{
      sactive = 1
    }
    var params = {
      "token": wx.getStorageSync("token"),
      "mid": that.data.mid,
      "eid": that.data.eid,
      "qid": that.data.question.id,
      "submit": ans,
      "sactive": sactive
    }
    app.ols.work_submit(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)

        if (that.data.id_list[that.data.currentTab].type == 1){
          //下一题跳转
          if (that.data.currentTab == (that.data.ques_info.num - 1)) {
            that.setData({
              dtk: true
            })
          } else {
            that.setData({
              img: [],
              imgs: [],
              currentTab: that.data.currentTab + 1
            })
            that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
          }
        }
        
        console.log("作业答案提交接口调取成功")
      } else {
        console.log("作业答案提交接口==============" + d.data.msg)
      }
    })
    // that.setData({
    //   start_ans: true
    // })
  },

  //手动滑页
  // swiperchange: function (e) {
  //   var that = this
  //   var current = Number(e.currentTarget.dataset.current)  // 当前的
  //   var index = e.detail.current;//当前所在页面的 index
  //   console.log(index)
  //   console.log(current + 1)
  //   that.setData({
  //     currentTab: current + 1
  //   })
  //   that.get_cp_test(that.data.id_list[that.data.currentTab].pid)





  // },

  //开始答题按钮
  start_ans: function () {
    let that = this
    var timestamp = (Date.parse(new Date())) / 1000
    console.log(timestamp, "timestamp")
    that.get_cp_test(that.data.id_list[0].pid)      //获取试题
    that.setData({
      start_ans: true,
      start_time: timestamp
    })
    // that.test_start()   //测评开始记录
  },

  //返回按钮延伸弹框
  back_btn: function (e) {
    let that = this
    var type = e.currentTarget.dataset.type
    console.log(type)
    if (type == 1) {
      if(that.data.isshare == 1){
        wx.redirectTo({
          url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
        })
      }else{
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
      }
    } else if (type == 2) {
      that.setData({
        back: false
      })
    }
  },

  //答题卡按钮延伸弹框
  dtk_submit_btn: function (e) {
    let that = this
    var timestamp = (Date.parse(new Date())) / 1000
    console.log(timestamp, "timestamp")
    var answerline = timestamp - that.data.start_time
    console.log(answerline, "answerline")
    var type = e.currentTarget.dataset.type
    console.log(type)
    if (type == 1) {
      console.log("我要交卷")
      that.test_end(answerline)   //测评结束记录
      var params = {
        "token": wx.getStorageSync("token"),
        "mid": that.data.mid,
        "answerline": answerline
      }
      app.ols.update_testsubmit(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          if(that.data.free == 1){
            that.to_free()
            console.log("开通免费课")
          }
          console.log("更新作业状态接口调取成功")
          for (var i = 0; i < that.data.id_list.length; i++) {
            if (that.data.id_list[i].type != 1) {
              that.setData({
                danxuan: false
              })
            } else {
              that.setData({
                danxuan: true
              })
            }
          }
          if (that.data.danxuan) {
            wx.redirectTo({
              url: app.getPagePath('homework_report') + '?mid=' + that.data.mid
            })
          } else {
            if(that.data.isshare == 1){
              wx.redirectTo({
                url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
              })
            }else{
              wx.navigateBack({
                delta: 1  // 返回上一级页面。
              })
            }
          }
        } else {
          console.log("更新作业状态接口==============" + d.data.msg)
        }
      })
    } else if (type == 2) {
      that.setData({
        finish_all: true
      })
    }
  },

  //免费课领取
  to_free:function(){
    let that = this
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
      app.ols.get_free(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          // that.course_detail()   //获取课程详情
        } 
      })
  },

  //删除图片
  del_img:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    that.data.imgs.splice(xb, 1);
    var cs1 = "id_list[" + that.data.currentTab + "].ans"
    var cs2 = "question.myans"
    that.setData({
      imgs: that.data.img,
      [cs1]: that.data.img,
      [cs2]: that.data.img,
    })
    var ans = that.data.question.myans.join("@@");
    console.log(ans, "img")
    that.work_submit(ans)   //作业答案提交接口
  },


  //上传图片
  chooseImg() {
    let that = this;
    that.setData({
      addImg:app.ols.addImg()
    })
      wx.chooseImage({
        count: 3,
        success: (res) => {
          let tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths)
          wx.uploadFile({
            // url: 'http://os.lingjun.net/api.php/annex/upload',
            // url: 'https://wsg.lingjun.net/api.php/annex/upload',
            url: that.data.addImg,
            filePath: tempFilePaths[0],
            name: 'file',
            method: 'POST',
            formData: {
              'file': tempFilePaths[0],
              "token": wx.getStorageSync("token"),
            },
            success(r) {
              let hhh = JSON.parse(r.data);
              if (hhh.code == 1) {
                console.log("成功")
                that.data.img.unshift(hhh.data.file)
                var cs1 = "id_list[" + that.data.currentTab + "].ans"
                var cs2 = "question.myans"
                that.setData({
                  imgs: that.data.img,
                  [cs1]: that.data.img,
                  [cs2]: that.data.img,
                })
                var ans = that.data.question.myans.join("@@");
                console.log(ans,"img")
                that.work_submit(ans)   //作业答案提交接口
              } else {
                console.log('失败')
              }
            }
          })
        }
      })
  },

  //上一题
  last: function () {
    let that = this
    if (that.data.currentTab == 0) {
      wx.showToast({
        title: '已经是第一题咯~',
        icon: "none",
        duration: 2500
      })
    } else {
      that.setData({
        img: [],
        imgs: [],
        currentTab: that.data.currentTab - 1
      })
      that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
    }
  },

  //下一题
  next: function () {
    let that = this
    if (that.data.currentTab == (that.data.ques_info.num - 1)) {
      that.setData({
        dtk: true
      })
    } else {
      that.setData({
        img: [],
        imgs: [],
        currentTab: that.data.currentTab + 1
      })
      that.get_cp_test(that.data.id_list[that.data.currentTab].pid)
    }

  },

  //试卷开始记录
  test_start: function () {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "kid": that.data.kid,
      "oid": that.data.oid,
      "eid": that.data.eid,
      "type": 4,
    }
    app.ols.test_start(params).then(d => {
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          hid: d.data.data.hid
        })
      } else {
      }
    })
  },

  //试卷结束记录
  test_end: function (duration) {
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "kid": that.data.kid,
      "oid": that.data.oid,
      "eid": that.data.eid,
      "type": 4,
      "duration": duration,
    }
    app.ols.setstudentstudy(params).then(d => {
      if (d.data.code == 0) {
        console.log("交卷结束记录")
        // console.log(d.data.data)
        // that.setData({
        //   hid: d.data.data.hid
        // })
      } else {
      }
    })
    // var params = {
    //   "token": wx.getStorageSync("token"),
    //   "hid": that.data.hid,
    //   "duration": duration,
    // }
    // app.ols.test_end(params).then(d => {
    //   if (d.data.code == 0) {
    //     console.log(d.data.data)
    //     that.setData({
    //       hid: d.data.data.hid
    //     })
    //   } else {
    //   }
    // })
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
    let that = this
    // that.getVideoCourse()  //获取视频所在课程信息
  },

  // //获取视频所在课程信息
  // getVideoCourse:function(){
  //   let that = this
  //   var params = {
  //     "token": '',
  //     "kid": that.data.kid
  //   }
  //   app.ols.course_info5(params).then(d => {
  //     if (d.data.code == 0) {
  //       that.dealAva(d.data.data.face)
  //       that.setData({
  //         course_info: d.data.data
  //       })
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //返回上一层
  back: function () {
    let that = this
    
    if (!that.data.start_ans) {
      if(that.data.isshare == 1){
        wx.redirectTo({
          url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
        })
      }else{
        wx.navigateBack({
          delta: 1  // 返回上一级页面。
        })
      }
    } else {
      that.setData({
        back: true
      })
    }
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

    //分享判断
    judge_share:function(){
      let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "url": "homepaper",
      "id": that.data.oid,
    }
    
    app.ols.judge_share4(params).then(d => {
     
      if (d.data.code == 0) {
        
        if(d.data.data.buy == 1 || (d.data.data.buy >= 3 && d.data.data.buy <= 5)){
            if(d.data.data.status == 1){
              wx.redirectTo({
                url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
              })
            }else if(d.data.data.status == 2){
              wx.redirectTo({
                url: app.getPagePath('homework_report') + '?mid=' + d.data.data.mid
              })
            }else if(d.data.data.status == 0){
              that.setData({
                login:true
              })
              that.test_explain()   //试卷概要
              that.test_id()     //获取试题ID列表
              that.ques_info()      //试卷基本信息
              that.setmark()   //试卷状态初始化
            }
          }
          
        else if(d.data.data.buy == 2){
          wx.redirectTo({
            url: app.getPagePath('groupBuy') + '?kid=' + that.data.kid,
          })
        }
        else if(d.data.data.buy == 0 || d.data.data.buy == 6){
          if(d.data.data.type == 0){
            wx.redirectTo({
              url: app.getPagePath('course_detail') + '?kid=' + that.data.kid,
            })
          }
          else if(d.data.data.type == 1){
            wx.redirectTo({
              url: app.getPagePath('groupBuy') + '?kid=' + that.data.kid,
            })
          }
          else if(d.data.data.type == 2){
            wx.redirectTo({
              url: app.getPagePath('course_seckill') + '?kid=' + that.data.kid,
            })
          }
        }
      } else {
        console.log("分享判断接口==============" + d.data.msg)
      }
    })
    },

    //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.judge_share()   //分享判断
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let that = this;
    let prarmsStr = 'isshare=1&eid=' + that.data.eid + '&gid=' + wx.getStorageSync('gid') + '&kid=' + that.data.kid + '&oid=' + that.data.oid
    return app.shareTool.getShareReturnInfo('0,1', 'homework', prarmsStr,this.shareImagePath ? this.shareImagePath : '', wx.getStorageSync('shareHead').task + that.data.ques_info.title)
  },
 // // 处理图片
// dealAva:function(face){
//   let that = this 
  
//     wx.getImageInfo({
//       src: face,
//       success: function (res) {
//         console.log(res,"res");
//         var face = res.path
//         that.drawShareImage(face)
//       }
//     })
  
// },


/**
   * 绘制分享图片
  */
 drawShareImage: function (ques_info) {
  this.setData({
    showCanvas: true
  })
  var title1,title2
  var title = "判断推理系统课判断推理系统课判断推理系统课"
  if(ques_info.title.length > 9){
    var title1 = ques_info.title.substr(0,9)
    var title2 = ques_info.title.substr(9,9)
    console.log(title1)
    console.log(title2)
  }else{
    var title1 = ques_info.title
  }
  // if(title.length > 9){
  //   var title1 = title.substr(0,9)
  //   var title2 = title.substr(9,9)
  //   console.log(title1)
  //   console.log(title2)
  // }else{
  //   var title1 = title
  // }
  
  
  const ctx = wx.createCanvasContext('shareCanvas')

  


  ctx.drawImage("/images/other/test_share.png", 0, 0, 375, 340)
  // ctx.drawImage("/images/other/share_course.png", 0, 131, 375, 170)

  ctx.drawImage("/images/other/g_d.png", 230, 65, 100, 35)
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(18)
  ctx.setFillStyle('#FFFFFF')
  ctx.setTextAlign('center')
  ctx.fillText(ques_info.gdata.title + '•' + ques_info.ddata.title, 280,85,200)
  ctx.stroke()

  //画昵称
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(28)
  ctx.setFillStyle('#EF653A')
  ctx.font = "bold 40px sans-serif";
  ctx.setTextAlign('center')
  ctx.fillText(title1, 190, 140,300)
  if(title2 && title2.length == 9){
    ctx.fillText(title2 + "...", 190, 190,300)
  }else if(title2 && title2.length < 9){
    ctx.fillText(title2, 190, 190,300)
  }
  ctx.stroke()


  // if(title2){
  //   ctx.drawImage("/images/other/num_bg.png", 140, 250, 100, 20)
  // }else{
  //   ctx.drawImage("/images/other/num_bg.png", 140, 230, 100, 20)
  // }
  
  var content = ques_info.remark.substr(0,14)
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(18)
  ctx.setFillStyle('#122C62')
  ctx.setTextAlign('center')
  if(title2){
    if(content.length == 14){
      ctx.fillText(content + "...", 200,220 ,300)
    }else{
      ctx.fillText(content, 200,220 ,300)
    }
  }else{
    if(content.length == 14){
      ctx.fillText(content + "...", 200,200 ,300)
    }else{
      ctx.fillText(content, 200,200 ,300)
    }
  }
  
  
  ctx.stroke()
  console.log("画图完成")

  let that = this
  ctx.draw(true,function(e) {
    console.log("开始生成图片地址")
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 375,
      height: 320,
      canvasId: 'shareCanvas',
      success(res) {
        console.log(res.tempFilePath)
        that.shareImagePath = res.tempFilePath
        console.log(that.shareImagePath,"图片地址")
        that.setData({
          showCanvas: false,
          teacher_info:true
        })
      },
      fail (res) {
        console.log("图片地址生成失败")
        that.setData({
          showCanvas: false,
          teacher_info:true
        })
      }
    })
  })

},
})