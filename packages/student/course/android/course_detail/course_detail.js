// pages/course_detail/course_detail.js
const app = getApp()
Page({
  // 打开的文件路径 在onShow中删除文件
  openFilePath: '',

  // 分享图片的路径
  shareImagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    btn_buy:app.globalData.btn_buy,
    coupon_use:false,
    queue:false,
    showCanvas:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      kid: options.kid,
    })
    if (options.isshare == 1) {
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare: options.isshare,
      })
      console.log("分享打开", that.data.isshare, that.data.gid)
    } else {
      //非分享打开
      // console.log("非分享打开")
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.endTestShow() 
    that.judge_login()    //登陆判断
    that.course_detail()   //获取课程简介
    if (that.data.currentData == 1){
      that.getcourse_cata()   //课程目录接口
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

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

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.onShow()
      }
    })
  },

  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    let that = this;
    let paramsStr = 'isshare=1&gid=' + that.data.gid + '&kid=' + that.data.kid
    return app.shareTool.getShareReturnInfo('0,1', 'course_detail', paramsStr, this.shareImagePath ? this.shareImagePath : '', wx.getStorageSync('shareHead').lesson + that.data.course_info.title)
  },

  /*-----------------------------------------------------方法-------------------------------------------- */
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

  //课程详情介绍数据处理
  handle_data1:function(d){
    let that = this
    if (d.data.code == 0) {
      that.dealAva(d.data.data.face)
      d.data.data.content = d.data.data.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')
      that.setData({
        course_info: d.data.data
      })
      if(that.data.login && (that.data.course_info.price == 0 || that.data.course_info.price == '0') && (that.data.course_info.buy == 0 || that.data.course_info.buy == 6)){
        that.to_free()   //获取免费课
        // console.log("获取免费课")
      }
      if (that.data.login && (that.data.course_info.buy == 1 || (that.data.course_info.buy >= 3 && that.data.course_info.buy <= 5) || that.data.course_info.price == 0 || that.data.course_info.price == '0')) {
        that.setData({
          currentData: 1
        })
        that.getcourse_cata()  //获取课程目录
      }
    }
  },

 //关闭联系老师蒙层
  to_ues:function(){
    let that = this 
    that.setData({
      coupon_use:false
    })
  },

  //复制老师联系方式
  copy:function(){
    var that = this;
    var tel = that.data.course_cata.tel.substr(4,11)
    console.log(tel)
      wx.setClipboardData({
      data: tel,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          duration:1600
        })
        setTimeout(function () {
          that.to_ues()    //关闭联系老师弹框
        }, 1800)
      }
    });
  },

  //打开图片显示大图
  previewImage: function () {
    let that = this
    var image = []
    image.push(that.data.handout[0].annex)
    wx.previewImage({
      current: image[0],
      urls: image
    })
    that.setData({
      click_file:false
    })
  },

  //打开单一文件
  open_file:function(id){
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.handout(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        that.setData({
          handout: d.data.data
        })
          var suffix = "handout[0].suffix"
          if (that.data.handout[0].annex.indexOf(".pdf") != -1) {
            that.setData({
              [suffix]: "pdf"
            })
          } else if (that.data.handout[0].annex.indexOf(".docx") != -1) {
            that.setData({
              [suffix]: "docx"
            })
          }
          else if (that.data.handout[0].annex.indexOf(".doc") != -1) {
            that.setData({
              [suffix]: "doc"
            })
          }else if (that.data.handout[0].annex.indexOf(".pptx") != -1) {
            that.setData({
              [suffix]: "pptx"
            })
          }
          else if (that.data.handout[0].annex.indexOf(".ppt") != -1) {
            that.setData({
              [suffix]: "ppt"
            })
          }
          else if (that.data.handout[0].annex.indexOf(".xlsx") != -1) {
            that.setData({
              [suffix]: "xlsx"
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
                
                filePath: filePath,
                success: function (res) {
                  console.log('打开文档成功')
                  that.setData({
                    click_file:false
                  })
                  wx.hideLoading()
                },
                fail: function (res) {
                  console.log("打开文档失败");
                  that.setData({
                    click_file:false
                  })
                  console.log(res)
                  wx.hideLoading({
                    complete: (res) => {
                      wx.showToast({
                        title: '文件打开失败',
                        icon: 'none'
                      })
                    },
                  })
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
              that.setData({
                click_file:false
              })
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
      } else {
        //讲义接口失败
      }
    })
  },

  //课程介绍、目录切换
  checkCurrent: function (e) {
    const that = this
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
    if (e.target.dataset.current == 1){
      //课程目录接口
      that.getcourse_cata()
    }
  },

  //课程权限提示
  course_authority:function(e){
    let that = this
    // var xb = e.currentTarget.dataset.xb
    // console.log(xb)
    var buy = that.data.course_info.buy
    if (buy == 1|| (buy >= 3 && buy <= 5)) {
      console.log("有课程权限")
    } else {
      that.setData({
        coupon_use:true
      })
      console.log("没有权限")
    }
  },


  //目录排序
  sort:function(){
    let that = this 
    that.setData({
      queue:!that.data.queue
    })
    that.getcourse_cata()
  },

  // 处理图片
dealAva:function(face){
  let that = this 
  
    wx.getImageInfo({
      src: face,
      success: function (res) {
        console.log(res,"res");
        var face = res.path
        that.drawShareImage(face)
      }
    })
  
},


/**
   * 绘制分享图片
  */
 drawShareImage: function (face) {
  this.setData({
    showCanvas: true
  })
  var title1,title2
  if(this.data.course_info.title.length > 12){
    var title1 = this.data.course_info.title.substr(0,12)
    var title2 = this.data.course_info.title.substr(12,12)
    console.log(title1)
    console.log(title2)
  }else{
    var title1 = this.data.course_info.title
  }
  // var title = "判断推理系统课判断推理系统课判断推理系统课"
  
  const ctx = wx.createCanvasContext('shareCanvas')
  ctx.drawImage(face, 0, 0, 375, 170)
  ctx.drawImage("/images/other/share_course.png", 0, 131, 375, 170)

 

  //画昵称
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(20)
  ctx.setFillStyle('#272727')
  ctx.font = "bold 20px sans-serif";
  ctx.setTextAlign('center')
  ctx.fillText(title1, 187, 207,300)
  if(title2){
    ctx.fillText(title2 + "...", 187, 235,300)
  }
  ctx.stroke()
  if(title2){
    ctx.drawImage("/images/other/num_bg.png", 140, 250, 100, 20)
  }else{
    ctx.drawImage("/images/other/num_bg.png", 140, 230, 100, 20)
  }
  

  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(12)
  ctx.setFillStyle('#FFFFFF')
  ctx.setTextAlign('center')
  if(title2){
    ctx.fillText(this.data.course_info.order_num + "人学习", 190,265 ,100)
  }else{
    ctx.fillText(this.data.course_info.order_num + "人学习", 190,245 ,100)
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

/**
   * 点击报名
   */
  toSubMsg:function(){
    let that = this 
    // if((that.data.course_info.buy ==0 || that.data.course_info.buy == 6)&& that.data.course_info.price == 0){
    //   that.to_free()
    // }else{
      if(that.data.course_info.buy ==1 || (that.data.course_info.buy >= 3 && that.data.course_info.buy <= 5)){
        console.log("触发报名")
        wx.requestSubscribeMessage({
          tmplIds: ['T4tp85vTUVp1BiSBRmlC7CRQHDhOYitDTR0zCfv-3yg'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
          success(res) { 
            console.log(res)
            var params = {
              "token":wx.getStorageSync('token'),
              "course_id":that.data.kid
            }
            app.ols.subMsg(params).then(d => {
              if (d.data.code == 0 || d.data.code == 4) {
                wx.showToast({
                  title: '报名成功',
                })
                that.course_detail()
                that.getcourse_cata()
              }
            })
          },
          fail(res){
          console.log("报名失败")
          wx.showModal({
            title: '提示', //提示的标题,
            content: '请打开订阅消息权限', //提示的内容,
            showCancel: true, //是否显示取消按钮,
            success: res => {
              if (res.confirm) {
                wx.openSetting({
                  success(res) {
                  },
                  fail(res) {
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
      } 
      
        })
      }else{
        that.getcourse_cata()
        that.course_authority()
      }
    // }
    
    
  },
  

  /*----------------------------------------------------接口-------------------------------------------- */
  
  // 获取课程详情
  course_detail:function(){
    let that = this
    //课程详情介绍接口
    if (wx.getStorageSync("login")){
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
    }else{
      var params = {
        "token": '',
        "kid": that.data.kid
      }
    }
      app.ols.course_info5(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
      })
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
          // that.toSubMsg()
          that.course_detail()   //获取课程详情
        } 
      })
  },

  //获取课程目录接口
  getcourse_cata:function(){
    let that = this
    var queue,token
    if(that.data.queue == true){
      queue = 1
    }else{
      queue = 0
    }
    if (wx.getStorageSync("login")) {
      token = wx.getStorageSync("token")
    }else{
      token = ''
    }
    var params = {
      "token": token,
      "kid": that.data.kid,
      "queue":queue
    }
    app.ols.course_cata5(params).then(d => {
      if (d.data.code == 0) {
        for(var i=0;i<d.data.data.lists.length;i++){
          d.data.data.lists[i].livetime = d.data.data.lists[i].startline.substr(5,11) + " - " + d.data.data.lists[i].endline.substr(11,5)
          console.log(d.data.data.lists[i].livetime)
        }
        that.setData({
          course_cata: d.data.data
        })
      } else {
        //接口调取失败
      }
    })
    
    
  },

  //结课考试介绍
  endTestShow:function(){
    let that = this
    var params = {
      // "token": '',
      "kid": that.data.kid
    }
    app.ols.endTestShow(params).then(d => {
      if(d.data.code == 0){
        that.setData({
          endTestShow:d.data.data.lists
        })
      }
    })
  },
  


  /*--------------------------------------------------页面跳转------------------------------------------ */

   //看视频
   to_video:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var id = that.data.course_cata.lists[xb].id
    var kid = that.data.course_cata.lists[xb].kid
    var eid = that.data.course_cata.lists[xb].eid
    var mid = that.data.course_cata.lists[xb].mid
   
    if (that.data.course_cata.lists[xb].cateid == 1|| that.data.course_cata.lists[xb].cateid == 2) {
      wx.navigateTo({
        url: app.getPagePath('live') + '?id=' + id + '&kid=' + kid,    //直播
      })
    } else {
      wx.navigateTo({
        url: app.getPagePath('video') + '?id=' + id + '&kid=' + kid + '&eid=' + eid + '&mid=' + mid,  //看视频
      })
    }
    
  },
  
  //查看报告
  to_end_report:function(){
    let that = this
    wx.navigateTo({
      url: app.getPagePath('endcourse_report') + '?kid=' + that.data.kid,     //结课报告
    })
  },

  //课后作业
  to_homework: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    var eid = that.data.course_cata.lists[xb].eid
    var kid = that.data.course_cata.lists[xb].kid
    var oid = that.data.course_cata.lists[xb].id
    wx.navigateTo({
      url: app.getPagePath('homework') + '?eid=' + eid + "&kid=" + kid + "&oid=" + oid,   //课后作业
    })
  },

  //去支付
  to_pay:function(e){
    let that = this
    wx.navigateTo({
      url: app.getPagePath('pay') + '?kid=' + that.data.kid,     //去支付
    })
  },

  //课程讲义跳转
  to_course_file:function(e){
    let that = this
    that.clearLocalFile()
    that.setData({
      click_file:true
    })
    var xb = e.currentTarget.dataset.xb
    var id = that.data.course_cata.lists[xb].id
    if (that.data.course_cata.lists[xb].annex_num > 1){
      wx.navigateTo({
        url: app.getPagePath('course_file') + '?id=' + id,
      })
      that.setData({
        click_file:false
      })
    }else{
      that.open_file(id)     //打开单一文件
    }
    
  },

  //查看课后作业报告
  to_homework_report:function(e){
    let that = this
    var mid = e.currentTarget.dataset.mid
    wx.navigateTo({
      url: app.getPagePath('homework_report') + '?mid=' + mid   //课后作业报告
    })
  },

  //结课考试
  to_test:function(e){
    let that = this
    
    wx.navigateTo({
      url: app.getPagePath('test') + '?eid=' + that.data.course_cata.res.eid + "&kid=" + that.data.kid,  //结课考试
    })
  },

  //结课考试报告
  to_test_report: function (e) {
    let that = this
    wx.navigateTo({
      url: app.getPagePath('test_report') + '?mid=' + that.data.course_cata.res.mid,  //考试报告
    })
  },

})