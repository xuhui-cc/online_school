// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    isload: 0,
    btn_buy:app.globalData.btn_buy
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // that.setData({
    //   isshare:options.isshare
    // })
    if (options.isshare == 1){
      wx.setStorageSync("gid", options.gid)
      that.setData({
        id:options.id,
        kid:options.kid,
        eid: options.eid,
        mid:options.mid,
        isshare:options.isshare,
        gid:options.gid,
        login: wx.getStorageSync("login")
      })
      if(that.data.login){
        that.judge_share()   //分享判断
        console.log("分享已登录")
        // console.log("分享未登录",that.data.isshare,that.data.gid)
      }
      
    }else{
      that.setData({
        id:options.id,
        kid:options.kid,
        eid: options.eid,
        mid:options.mid
      })
      that.get_video()    //获取视频数据
      // that.getCourse()  //获取视频附加课程
      // that.judge_share()   //分享判断
      console.log("非分享打开")
    }


    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    if(wx.getStorageSync("token")){
     
    that.getvideo_info()  //获取视频断点
    that.getCourse()  //获取视频页附加课程数据
    }
    
  },

  get_video:function(){
    let that = this
    //课程视频接口
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    console.log(params,"课程视频接口参数")
    app.ols.getvideo(params).then(d => {
      console.log(d,"课程视频接口数据")
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          getvideo: d.data.data
        })
        
      } else {
        console.log("课程视频接口==============" + d.data.msg)
      }
    })

  },


  //获取视频断点时间,获取学员学习每节课观看视频记录
  getvideo_info:function(){
    let that = this
   var params = {
    "token": wx.getStorageSync("token"),
    "oid": that.data.id
    // "id": that.data.id            //1.1版
  }
  app.ols.getvideo_info(params).then(d => {
    // console.log(d)
    // console.log(d, "接口1数据")
    if (d.data.code == 0) {
      that.setData({
        timeline: d.data.data.duration,
        percent: d.data.data.percent,
        isload: 1,
      })
      that.update_start()
    } else if (d.data.code == 5) {
      that.setData({
        timeline: 0,
        percent: 0,
        isload: 1,
      })
      that.update_start()
      // console.log("课程视频未学习")
    } else {
      // console.log("课程视频断点时间接口==============" + d.data.msg)
    }
  })
  },
   

  //课后作业
  to_homework: function () {
    let that = this
    wx.navigateTo({
      url: app.getPagePath('homework') + '?eid=' + that.data.eid + "&kid=" + that.data.kid + "&oid=" + that.data.id,
    })
  },

  //查看课后作业报告
  to_homework_report: function (e) {
    let that = this
    wx.navigateTo({
      url: app.getPagePath('homework_report') + '?mid=' + that.data.mid
    })
  },

  //课程讲义跳转
  to_course_file: function () {
    let that = this
    if (that.data.course.annex_num > 1) {

      wx.navigateTo({
        url: app.getPagePath('course_file') + '?id=' + that.data.id,
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
          else if (that.data.handout[0].annex.indexOf(".png") != -1 || that.data.handout[0].annex.indexOf(".jpg") != -1) {
            that.setData({
              [suffix]: "img"
            })
          }
          that.openFile()  //打开单一讲义

          console.log("课程讲义接口调取成功")
        } else {
          console.log("课程讲义==============" + d.data.msg)
        }
      })
    }

  },

  //课程详情跳转
  to_course_detail: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    wx.navigateTo({
      url: app.getPagePath('course_detail') + '?kid=' + that.data.course.lists[xb].kid,
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

  //更新视频结束状态
  update_leave:function(timeline,precent){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "hid": that.data.hid,
      "duration": timeline,
      "percent": precent
    }
    console.log(params,"视频结束状态更新参数")
    app.ols.video_end(params).then(d => {
      console.log(d,"视频结束状态更新数据")
      if (d.data.code == 0) {
        console.log("视频结束状态更新成功")
      } else {
        console.log("视频结束状态更新失败==============" + d.data.msg)
      }
    })
  },

  //更新视频开始状态
  update_start: function () {

    let that = this
    var timestamp = (Date.parse(new Date()))/1000
    console.log(timestamp,"timestamp")

    var params = {
      "token": wx.getStorageSync("token"),
      "oid": that.data.id,
      "kid": that.data.kid,
      "type":2
    }
    console.log(params, "视频开始状态更新参数")
    app.ols.video_start(params).then(d => {
      console.log(d, "视频开始状态更新数据")
      var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      that.setData({
        hid:d.data.data.hid,
      })
      if (d.data.code == 0) {
        console.log("视频开始状态更新成功")
      } else {
        console.log("视频开始状态更新失败==============" + d.data.msg)
      }
    })
  },

  

  //获取视频页附加课程数据
  getCourse:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id": that.data.id
    }
    app.ols.getplaypushlist(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          course: d.data.data
        })

      } else {
        console.log("课程视频附加接口==============" + d.data.msg)
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
  * 清除本地保存的文件
 */
  clearLocalFile: function () {
    let that = this
    if (this.openFilePath == '') {
      return
    }
    let fs = wx.getFileSystemManager()
    let filePath = this.openFilePath
    fs.unlink({
      filePath: filePath,
      success(res) {
        console.log("文件删除成功" + filePath)
        that.openFilePath = ''
      },
      fail(res) {
        console.log("文件删除失败" + filePath)
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let that = this
    that.comp()
    //更新学习状态
    that.update_leave(that.data.timeline1, that.data.percent)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this
    that.comp()
    //更新学习状态
    that.update_leave(that.data.timeline1, that.data.percent)
  },


  //单一讲义资料打开
  openFile: function () {
    let that = this
    that.clearLocalFile()   //清除打开文件本地缓存
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
      let customFilePath = wx.env.USER_DATA_PATH + "/" + that.data.fileName
      console.log('得到自定义路径：')
      console.log(customFilePath)

      wx.downloadFile({
        url: that.data.handout[0].annex, //仅为示例，并非真实的资源
        filePath: customFilePath,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

          console.log(res)
          var filePath = res.filePath
          console.log('返回自定义路径：')
          console.log(filePath)

          that.openFilePath = filePath
          wx.openDocument({
            showMenu: true,
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
              wx.hideLoading()
              // that.loading = false
            },

            fail: function (res) {
              console.log("打开文档失败");
              console.log(res)
              wx.hideLoading({
                complete: (res) => {
                  wx.showToast({
                    title: '文件打开失败',
                    icon: 'none'
                  })
                },
              })
              // that.loading = false
            },
            complete: function (res) {
              console.log("complete");
              console.log(res)
            }
          })
        },
        fail: function (res) {
          console.log('文件下载失败')
          console.log(res)
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '文件下载失败',
                icon: 'none'
              })
            },
          })
        }
      })

    }
  },

  //打开图片大图
  previewImage: function () {
    let that = this
    var image = []
    image.push(that.data.handout[0].annex)
    wx.previewImage({
      current: image[0],
      urls: image
    })

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
    "url": "study",
    "id": that.data.id,
  }
  // console.log(params, "分享判断参数")
  app.ols.judge_share4(params).then(d => {
    // console.log(d, "分享判断数据")
    if (d.data.code == 0) {
      // console.log(d.data.data,"分享判断接口数据")
      if(d.data.data.buy == 1 || (d.data.data.buy >= 3 && d.data.data.buy <= 5 )){
        // wx.redirectTo({
        //   url: '../../pages/course_detail/course_detail?kid=' + that.data.kid,
        // })
        that.onShow()
        that.get_video()    //获取视频数据
      }else if(d.data.data.buy == 2){
        wx.redirectTo({
          url: app.getPagePath('groupBuy') + '?kid=' + that.data.kid,
        })
      }else if(d.data.data.buy == 0 || d.data.data.buy == 6){
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
       
        // that.getCourse()  //获取视频附加课程
        
      
      
      // console.log("分享判断接口调取成功")
    } else {
      // console.log("分享判断接口==============" + d.data.msg)
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
    let paramStr = 'isshare=1&eid=' + that.data.eid + '&gid=' + wx.getStorageSync('gid') + '&kid=' + that.data.kid + '&id=' + that.data.id + '&mid=' + that.data.mid
    return app.shareTool.getShareReturnInfo('0,1', 'video', paramStr, '/images/other/share1.png', '领军网校')
  }
})