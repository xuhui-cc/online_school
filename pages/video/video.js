// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // getvideo_info:[]
  },
  /**关闭视屏 */
  closeVideo() {
    //执行退出全屏方法
    var videoContext = wx.createVideoContext('myvideo', this);
    videoContext.exitFullScreen();
  },
  /**视屏进入、退出全屏 */
  fullScreen(e) {
    var isFull = e.detail.fullScreen;
    //视屏全屏时显示加载video，非全屏时，不显示加载video
    this.setData({
      fullScreen: isFull
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var id = options.id
    console.log(id)
    var kid = options.kid
    console.log(kid)
    that.setData({
      id:id,
      kid:kid,
      eid: options.eid,
      mid:options.mid
    })
    //课程视频接口
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.getvideo(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo: d.data.data
        })
        
      } else {
        console.log("课程视频接口==============" + d.data.msg)
      }
    })

    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.getplaypushlist(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          course: d.data.data
        })

      } else {
        console.log("课程视频接口==============" + d.data.msg)
      }
    })
    
  },

  //课后作业
  to_homework: function () {
    let that = this
    
    // console.log(eid)
    wx.navigateTo({
      url: '../../pages/homework/homework?eid=' + that.data.eid + "&kid=" + that.data.kid + "&oid=" + that.data.id,
    })
  },

  //查看课后作业报告
  to_homework_report: function (e) {
    let that = this
    
    wx.navigateTo({
      url: '../../pages/homework_report/homework_report?mid=' + that.data.mid
    })
  },

  //课程讲义跳转
  to_course_file: function () {
  
    let that = this
    if (that.data.course.annex_num > 1) {

      wx.navigateTo({
        url: '../../pages/course_file/course_file?id=' + that.data.id,
      })
    } else {
      var params = {
        "token": wx.getStorageSync("token"),
        "id": that.data.id
      }
      app.ols.handout(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            handout: d.data.data
          })
          // for (var i = 0; i < that.data.handout.length; i++) {
          var suffix = "handout[0].suffix"
          if (that.data.handout[0].annex.indexOf(".pdf") != -1) {
            that.setData({
              [suffix]: "pdf"
            })
          } else if (that.data.handout[0].annex.indexOf(".doc") != -1) {
            that.setData({
              [suffix]: "doc"
            })
          }
          else if (that.data.handout[0].annex.indexOf(".ppt") != -1) {
            that.setData({
              [suffix]: "ppt"
            })
          }
          else if (that.data.handout[0].annex.indexOf(".xls") != -1) {
            that.setData({
              [suffix]: "xls"
            })
          }
          else if (that.data.handout[0].annex.indexOf(".png") != -1 || that.data.handout[i].annex.indexOf(".jpg") != -1) {
            that.setData({
              [suffix]: "img"
            })
          }
        

          if (that.data.handout[0].annex.indexOf(".png") != -1 || that.data.handout[0].annex.indexOf(".jpg") != -1) {
            that.previewImage()
            console.log("图")
          } else {
            wx.showLoading({
              title: '资料打开中...',
            })

            var fileName = that.data.handout[0].name + "." + that.data.handout[0].suffix
            that.setData({
              fileName: fileName
            })
            wx.downloadFile({
              url: that.data.handout[0].annex,
              filePath: wx.env.USER_DATA_PATH + "/" + that.data.fileName,
              success(res) {
                console.log("下载文档成功 =>", res);
                if (res.statusCode === 200) {
                  wx.hideLoading();

                  wx.openDocument({
                    filePath: res.filePath,
                    showMenu: true,
                    success(e) {
                      console.log("打开文档成功 =>", e);
                    },
                    fail(e) {
                      console.log("打开文档失败 =>", e);
                      wx.showToast({
                        title: "打开文档失败，请重试！",
                        icon: "none"
                      });
                    }
                  });
                }
              },
              fail(err) {
                console.log("打开文档失败 =>", err);
                wx.showToast({
                  title: "打开文档失败，请重试！",
                  icon: "none"
                });
              }
            });
          }
          console.log("课程讲义接口调取成功")
        } else {
          console.log("课程讲义==============" + d.data.msg)
        }
      })
    }

  },
    
  //打开图片
  previewImage: function () {
    let that = this

    var image = []

    image.push(that.data.handout[0].annex)
    wx.previewImage({
      current: image[0],
      urls: image
    })

  },

  to_course_detail: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: '../../pages/course_detail/course_detail?kid=' + that.data.course.lists[xb].kid,
    })
  },
  
  //获取视频播放进度、总时长（初）
  bindtimeupdate(res) {
    let that = this
    console.log('bindtimeupdate', parseInt(res.detail.currentTime), '时间总时长-->', parseInt(res.detail.duration));
    that.setData({
      currentTime: parseInt(res.detail.currentTime),
      duration: parseInt(res.detail.duration)
    })
    
  },

  update_study:function(btn,timeline,precent){
    let that = this
    // var percent1
    //更新学习状态
    // if(percent == 100){
    //   percent1 
    // }
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id,
      "kid": that.data.kid,
      "btn": btn,
      "timeline": timeline,
      "percent": precent
    }
    app.ols.study_pro(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo_info: d.data.data
        })

        } else if (d.data.code == 5) {
          that.setData({
            getvideo_info: 0
          })
          console.log("课程视频未学习")
      } else {
        console.log("更新视频状态接口==============" + d.data.msg)
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
    let that = this
    //获取视频断点时间
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.getvideo_info(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        
       
          that.setData({
            timeline: d.data.data.timeline,
            percent: d.data.data.percent,
            status: d.data.data.status,
          })
        
        // //执行全屏方法  
        // var videoContext = wx.createVideoContext('myvideo', this);
        // videoContext.requestFullScreen();
        // this.setData({
        //   fullScreen: true
        // })
        that.update_study(1, that.data.timeline, that.data.percent)
      } else if (d.data.code == 5) {
        that.setData({
          timeline: 0,
          percent: 0,
          status: 0,
        })
        that.update_study(1, that.data.timeline, that.data.percent)
        console.log("课程视频未学习")
      } else {
        console.log("课程视频断点时间接口==============" + d.data.msg)
      }
    })
    
    
  },


  //播放进度数据判断
  comp:function(){
    let that = this
    if (that.data.percent == 100) {
      that.setData({
        timeline1: that.data.currentTime,
        percent: 100
      })
    } else {
      if (Math.ceil((that.data.currentTime / that.data.duration) * 100) > that.data.percent) {
        that.setData({
          timeline1: that.data.currentTime,
          percent: Math.ceil((that.data.currentTime / that.data.duration) * 100),
        })
      } else {
        that.setData({
          timeline1: that.data.currentTime,
          percent: that.data.percent,
        })
      }

    }
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let that = this
    that.comp()
    //更新学习状态
    that.update_study(2, that.data.timeline1, that.data.percent)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this
    that.comp()
    //更新学习状态
    that.update_study(2, that.data.timeline1, that.data.percent)
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