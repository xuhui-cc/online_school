// pages/course_detail/course_detail.js
const app = getApp()
Page({
  // 打开的文件路径 在onShow中删除文件
  openFilePath: '',
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var kid = options.kid
    that.setData({
      kid:kid
    })
    that.judge_login()    //登陆判断
    that.course_detail()  //获取课程详情
    
  },

  //登录判断
  judge_login: function () {
    let that = this
    that.setData({
      // testlogin: wx.getStorageSync("testlogin"),
      login: wx.getStorageSync("login"),
      gid: wx.getStorageSync("gid")
    })
    // console.log(that.data.testlogin, "that.data.testlogin")
    console.log(that.data.login, "that.data.login")
    console.log(that.data.gid, "that.data.gid")
  },


  // 获取课程详情
  course_detail:function(){
    let that = this
    //课程详情介绍接口
    if (wx.getStorageSync("login")){
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
      console.log(params, "课程详情接口参数")
      app.ols.course_info1(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
      })
    }else{
      var params = {
        "kid": that.data.kid
      }
      console.log(params, "课程详情接口参数")
      app.ols.course_info2(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
      })
    }
    

  },

  //课程详情介绍数据处理
  handle_data1:function(d){
    let that = this
    console.log(d, "课程详情接口数据")
    if (d.data.code == 0) {
      console.log(d.data.data)
      that.setData({
        course_info: d.data.data
      })
      var cs = "course_info.content"
      that.setData({
        [cs]: that.data.course_info.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')
      })
      if (that.data.course_info.pay_status > 1 && that.data.course_info.pay_status < 5) {
        that.setData({
          currentData: 1
        })
        that.getcourse_cata()  //获取课程目录
      }
    } else {
      console.log("课程详情介绍接口==============" + d.data.msg)
    }
  },

  //看视频
  to_video:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var id = that.data.course_cata.lists[xb].id
    var kid = that.data.course_cata.lists[xb].kid
    var eid = that.data.course_cata.lists[xb].eid
    var mid = that.data.course_cata.lists[xb].mid
    if (that.data.course_cata.lists[xb].cateid == 1) {
      wx.navigateTo({
        url: '../../pages/live/live?id=' + id,    //直播
      })
    } else {
      wx.navigateTo({
        url: '../../pages/video/video?id=' + id + '&kid=' + kid + '&eid=' + eid + '&mid=' + mid,  //看视频
      })
    }
    
  },

  //查看报告
  to_end_report:function(){
    let that = this
    wx.navigateTo({
      url: '../../pages/endcourse_report/endcourse_report?kid=' + that.data.kid,     //结课报告
    })
  },

  //课后作业
  to_homework: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    var eid = that.data.course_cata.lists[xb].eid
    var kid = that.data.course_cata.lists[xb].kid
    var oid = that.data.course_cata.lists[xb].id
    console.log(eid)
    wx.navigateTo({
      url: '../../pages/homework/homework?eid=' + eid + "&kid=" + kid + "&oid=" + oid,   //课后作业
    })
  },

  //去支付
  to_pay:function(e){
    let that = this
    // var kid = e.currentTarget.dataset.kid
    // console.log(kid)
    wx.navigateTo({
      url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
    })
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
  },

  //免费课领取
  to_free:function(e){
    let that = this
    // var kid = e.currentTarget.dataset.kid
    // console.log(kid)
    var params = {
      "token": wx.getStorageSync("token"),
      "kid": that.data.kid
    }
    app.ols.get_free(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.onShow()     //刷新页面
        console.log("获取免费课程接口调取成功")
      } else {
        console.log("获取免费课程==============" + d.data.msg)
      }
    })
  },


  //课程讲义跳转
  to_course_file:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var id = that.data.course_cata.lists[xb].id
    if (that.data.course_cata.lists[xb].annex_num > 1){
      wx.navigateTo({
        url: '../../pages/course_file/course_file?id=' + id,
      })
    }else{
      var params = {
        "token": wx.getStorageSync("token"),
        "id": id
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
            else if (that.data.handout[0].annex.indexOf(".png") != -1 || that.data.handout[0].annex.indexOf(".jpg") != -1) {
              that.setData({
                [suffix]: "img"
              })
            }
          // }

          if (that.data.handout[0].annex.indexOf(".png") != -1 || that.data.handout[0].annex.indexOf(".jpg") != -1) {
            that.previewImage()
            console.log("图")
          } else {
            
            wx.showLoading({
              title: '资料打开中...',
            })

            // wx.downloadFile({
            //   // 示例 url，并非真实存在
            //   url: that.data.handout[0].annex,
            //   success: function (res) {
            //     const filePath = res.tempFilePath
            //     wx.openDocument({
            //       filePath: filePath,
            //       success: function (res) {
            //         wx.hideLoading();
            //         console.log('打开文档成功')
            //       }
            //     })
            //   },
            //     fail(err) {
            //       wx.hideLoading();
            //     console.log("打开文档失败 =>", err);
            //     wx.showToast({
            //       title: "打开文档失败，请重试！",
            //       icon: "none"
            //     });
            //   }
            // })

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

            
            // var fileName = that.data.handout[0].name + "." + that.data.handout[0].suffix
            // that.setData({
            //   fileName: fileName
            // })
            // wx.downloadFile({
            //   url: that.data.handout[0].annex,
            //   filePath: wx.env.USER_DATA_PATH + "/" + that.data.fileName,
            //   success(res) {
            //     console.log("下载文档成功 =>", res);
            //     if (res.statusCode === 200) {
            //       wx.hideLoading();

            //       wx.openDocument({
            //         filePath: res.filePath,
            //         showMenu: true,
            //         success(e) {
            //           console.log("打开文档成功 =>", e);
            //         },
            //         fail(e) {
            //           console.log("打开文档失败 =>", e);
            //           wx.showToast({
            //             title: "打开文档失败，请重试！",
            //             icon: "none"
            //           });
            //         }
            //       });
            //     }
            //   },
            //   fail(err) {
            //     console.log("打开文档失败 =>", err);
            //     wx.showToast({
            //       title: "打开文档失败，请重试！",
            //       icon: "none"
            //     });
            //   }
            // });
          }
          console.log("课程讲义接口调取成功")
        } else {
          console.log("课程讲义==============" + d.data.msg)
        }
      })
    }
    
  },

  //获取课程目录接口
  getcourse_cata:function(){
    let that = this
    if (wx.getStorageSync("login")) {
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
      console.log(params, "获取课程目录参数")
      app.ols.course_cata1(params).then(d => {
        console.log(d, "获取课程目录接口数据")
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course_cata: d.data.data
          })
          console.log("课程目录接口调取成功")
        } else {
          console.log("课程目录==============" + d.data.msg)
        }
      })
    }else{
      var params = {
        // "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
      console.log(params, "获取课程目录参数")
      app.ols.course_cata2(params).then(d => {
        console.log(d, "获取课程目录接口数据")
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course_cata: d.data.data
          })
          console.log("课程目录接口调取成功")
        } else {
          console.log("课程目录==============" + d.data.msg)
        }
      })
    }
    
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

  //获取微信绑定手机号登录
  // getPhoneNumber: function (e) {
  //   var that = this
  //   wx.login({
  //     success: res => {

  //       if (e.detail.errMsg == "getPhoneNumber:ok") {
  //         wx.showLoading({
  //           title: '登录中...',
  //         })
  //         wx.login({
  //           success(res) {
  //             console.log("cccs.code" + res.code)
  //             let iv = encodeURIComponent(e.detail.iv);
  //             let encryptedData = encodeURIComponent(e.detail.encryptedData);
  //             let code = res.code
  //             var params = {
  //               "code": code,
  //               "iv": iv,
  //               "encryptedData": encryptedData
  //             }
  //             console.log(params)
  //             app.ols.login(params).then(d => {

  //               if (d.data.code == 0 ) {
  //                 console.log("登陆成功")
  //                 wx.hideLoading()
                  
  //                 wx.setStorageSync("login", true)
  //                 wx.setStorageSync("token", d.data.data.token)
  //                 that.onLoad()


  //               } else {
  //                 wx.showToast({
  //                   title: "登陆失败",
  //                   icon: 'none',
  //                   duration: 2000
  //                 })
  //                 console.log(d.data.msg)
  //                 // that.setData({
  //                 //   login: false
  //                 // })

  //                 wx.hideLoading()
  //               }
  //             })
  //           }
  //         })
  //       }
  //     }
  //   })
  // },

  //查看课后作业报告
  to_homework_report:function(e){
    let that = this
    var mid = e.currentTarget.dataset.mid
    wx.navigateTo({
      url: '../../pages/homework_report/homework_report?mid=' + mid   //课后作业报告
    })
  },

  //结课考试
  to_test:function(e){
    let that = this
    wx.navigateTo({
      url: '../../pages/test/test?eid=' + that.data.course_cata.eid + "&kid=" + that.data.kid,  //结课考试
    })
  },

  //结课考试报告
  to_test_report: function (e) {
    let that = this
    wx.navigateTo({
      url: '../../pages/test_report/test_report?mid=' + that.data.course_cata.mid,  //考试报告
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
    this.clearLocalFile()
    that.judge_login()    //登陆判断
    if (that.data.currentData == 0){
      that.course_detail()   //获取课程简介
    } else if (that.data.currentData == 1){
      that.course_detail()   //获取课程简介
      //课程目录接口
      that.getcourse_cata()
    }
    
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
    wx.login({
      success: res => {
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          wx.showLoading({
            title: '登录中...',
          })
          wx.login({
            success(res) {
              console.log("cccs.code" + res.code)
              let iv = encodeURIComponent(e.detail.iv);
              let encryptedData = encodeURIComponent(e.detail.encryptedData);
              let code = res.code
              var params = {
                "code": code,
                "iv": iv,
                "encryptedData": encryptedData,
                "gid": that.data.gid
              }
              console.log(params, "登录参数")
              app.ols.login(params).then(d => {
                console.log(d, "登录接口")
                if (d.data.code == 0) {
                  console.log("登陆成功")
                  wx.hideLoading()
                  // that.setData({
                  //   testlogin: true
                  // })
                  // wx.setStorageSync("testlogin", true)
                  that.setData({
                    login: true
                  })
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  // if (d.data.data.gid != null && d.data.data.gid != 0) {
                  //   console.log(d.data.data.gid, "d.data.data.gid")
                  //   wx.setStorageSync("gid", d.data.data.gid)
                  //   // wx.switchTab({
                  //   //   url: '../../pages/index/index',   //测评页跳转
                  //   // })
                  // } else {
                  //   wx.setStorageSync("gid", that.data.gid)
                  // }

                  var params = {
                    "token": wx.getStorageSync("token"),
                    "kid": that.data.kid
                  }
                  console.log(params, "课程详情接口参数")
                  app.ols.course_info1(params).then(d => {
                    if (d.data.code == 0) {
                      console.log(d.data.data)
                      if (d.data.data.pay_status <= 1 || d.data.data.pay_status >= 5) {
                        if (d.data.data.price != 0){
                          wx.navigateTo({
                            url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
                          })
                        }else{
                          that.to_free()  //免费课
                        }
                        
                      } else {
                        that.onShow()
                      }
                      
                    } else {
                      console.log("课程详情介绍接口==============" + d.data.msg)
                    }
                  })
                  var params = {
                    "token": wx.getStorageSync("token"),
                    "kid": that.data.kid
                  }
                  console.log(params, "获取课程目录参数")
                  app.ols.course_cata1(params).then(d => {
                    console.log(d, "获取课程目录接口数据")
                    if (d.data.code == 0) {
                      if (d.data.data.buy == 0) {
                        wx.navigateTo({
                          url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
                        })
                      } else {
                        that.onShow()
                      }
                    } else {
                      console.log("课程目录==============" + d.data.msg)
                    }
                  })
                  
                  
                } else {
                  console.log(d, "登录失败")
                  wx.showToast({
                    title: "登陆失败",
                    icon: 'none',
                    duration: 2000
                  })
                  console.log(d.data.msg, "登录失败提示")


                  wx.hideLoading()
                }
              })
            }
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '领军网校', // 转发后 所显示的title
      path: '/pages/first_page/first_page', // 相对的路径
      imageUrl: '../../images/share1.png',  //用户分享出去的自定义图片大小为5:4,
      success: (res) => {    // 成功后要做的事情
        console.log("成功")
      
      },
      fail: function (res) {
        // 分享失败
        console.log(res, "分享失败")
      }
    }
  }
})