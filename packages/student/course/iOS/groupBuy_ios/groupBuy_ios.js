// pages/groupBuy/groupBuy.js
const app = getApp()
var timer,timer_option,timer_grouplist
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    all_group:false,
    rule:false,
    btn_buy:app.globalData.btn_buy
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      kid: options.kid
    })
    if (options.isshare == 1) {
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare: options.isshare,
        gid: options.gid,
        
        login: wx.getStorageSync("login")
      })
      // wx.setStorageSync("gid", options.gid)
      console.log("分享打开", that.data.isshare, that.data.gid, that.data.gid)

    } else {
      that.judge_login()    //登陆判断
     
      console.log("非分享打开")
    }

    
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
      // console.log(params, "课程详情接口参数")
      app.ols.course_info4(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
        
        if((d.data.data.buy == 0|| d.data.data.buy == 2 || d.data.data.buy == 6)  && d.data.data.option){
          that.cs_group()   // 已有团列表倒计时
        }
        
        if(d.data.data.buy == 0 || d.data.data.buy == 2 || d.data.data.buy == 6){
          that.cs1()   //倒计时
        }
        
      })
    
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

  //获取所有拼团列表
  all_group:function(){
    let that = this
    
    var params = {
      "token": wx.getStorageSync("token"),
      "pid": that.data.course_info.pt_id
    }
    console.log(params, "获取更多拼团参数")
    app.ols.all_group3(params).then(d => {
      console.log(d, "获取更多拼团接口数据")
      if (d.data.code == 0) {
        console.log(d.data.data)
        var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      d.data.data.endtime = d.data.data.endtime - timestamp
        for(var i=0;i<d.data.data.lists.group.length;i++){
          for(var j=0;j<d.data.data.lists.group[i].member.length;j++){
            if(d.data.data.lists.group[i].member[j].avatar.indexOf("/") == 0){
              // d.data.data.lists.group[i].member[j].avatar = 'http://os.lingjun.net' + d.data.data.lists.group[i].member[j].avatar
              d.data.data.lists.group[i].member[j].avatar = app.globalData.dummy + d.data.data.lists.group[i].member[j].avatar
              //表示strCode是以ssss开头；
            }else if(d.data.data.lists.group[i].member[j].avatar.indexOf("/") == -1){
              //表示strCode不是以ssss开头
            }
          }
          d.data.data.lists.group[i].nick = d.data.data.lists.group[i].nick.substr(0,3) + '***'
          d.data.data.lists.group[i].addtime =  d.data.data.lists.group[i].addtime + (24*60*60) - timestamp
        }
        that.setData({
          all_group:true,
          all_grouplist: d.data.data.lists
        })
        that.cs_grouplist()
        console.log("更多拼团接口调取成功")
      } else {
        console.log("更多拼团==============" + d.data.msg)
      }
    })
  },

  //关闭所有拼团
  close_all:function(){
    let that = this 
    that.setData({
      all_group:false,
    })
    clearInterval(timer_grouplist);   
  },

  //拼团规则
  look_rule:function(){
    let that = this
    that.setData({
      rule:!that.data.rule,
    })
  },

  //去拼团详情
  to_group_detail:function(e){
    let that = this
    var tid = e.currentTarget.dataset.tid
    that.setData({
      all_group:false
    })
    wx.navigateTo({
      url: app.getPagePath('group_detail') + '?tid=' + tid + '&kid=' + that.data.kid, 
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
      // console.log(params, "课程详情接口参数")
      app.ols.course_info4(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
        
      })
    
  },

  //获取课程目录接口
  getcourse_cata:function(){
    let that = this
    if (wx.getStorageSync("login")) {
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
      // console.log(params, "获取课程目录参数")
      app.ols.course_cata4(params).then(d => {
        // console.log(d, "获取课程目录接口数据")
        if (d.data.code == 0) {
          console.log(d.data.data)
          that.setData({
            course_cata: d.data.data
          })
          // console.log("课程目录接口调取成功")
        } else {
          console.log("课程目录==============" + d.data.msg)
        }
      })
    
  },

  //课程详情介绍数据处理
  handle_data1:function(d){
    let that = this
    // console.log(d, "课程详情接口数据")
    if (d.data.code == 0) {
      // console.log(d.data.data)
      var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      d.data.data.endtime = d.data.data.endtime - timestamp
      if(d.data.data.option){
        for(var i=0;i<d.data.data.option.length;i++){
          // if(d.data.data.option[i].member){
            for(var j=0;j<d.data.data.option[i].member.length;j++){
              if(d.data.data.option[i].member[j].avatar.indexOf("/") == 0){
                d.data.data.option[i].member[j].avatar = app.ols.dummy() + d.data.data.option[i].member[j].avatar
                // d.data.data.option[i].member[j].avatar = 'http://os.lingjun.net' + d.data.data.option[i].member[j].avatar
                //表示strCode是以ssss开头；
              }else if(d.data.data.option[i].member[j].avatar.indexOf("/") == -1){
                //表示strCode不是以ssss开头
              }
            }
          // }
          
          
          d.data.data.option[i].nick = d.data.data.option[i].nick.substr(0,3) + '***'
          d.data.data.option[i].addtime =  d.data.data.option[i].addtime + (24*60*60) - timestamp
        }
      }
      
      that.setData({
        course_info: d.data.data
      })

      

      var cs = "course_info.content"
      that.setData({
        [cs]: that.data.course_info.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block"')
      })
      if (that.data.course_info.buy == 3 || that.data.course_info.buy == 1 || that.data.course_info.buy == 5) {
        that.setData({
          currentData: 1
        })
        that.getcourse_cata()  //获取课程目录
      }
    } else {
      console.log("课程详情介绍接口==============" + d.data.msg)
    }
  },

  //去支付
  to_pay:function(e){
    let that = this
    // var kid = e.currentTarget.dataset.kid
    // console.log(kid)
    wx.navigateTo({
      url: app.getPagePath('pay') + '?kid=' + that.data.kid,     //去支付
    })
  },

    //去拼团
    to_groupPay:function(e){
      let that = this
      // var kid = e.currentTarget.dataset.kid
      // console.log(kid)
      wx.redirectTo({
        url: app.getPagePath('groupPay') + '?kid=' + that.data.kid,     //去支付
      })
    },

    //课程讲义跳转
  to_course_file:function(e){
    let that = this
    that.setData({
      click_file:true
    })
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var id = that.data.course_cata.lists[xb].id
    if (that.data.course_cata.lists[xb].annex_num > 1){
      wx.navigateTo({
        url: app.getPagePath('course_file') + '?id=' + id,
      })
      that.setData({
        click_file:false
      })
    }else{
      var params = {
        "token": wx.getStorageSync("token"),
        "id": id
      }
      app.ols.handout(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log(d.data.data,"详细资料数据")
          that.setData({
            handout: d.data.data
          })
          // for (var i = 0; i < that.data.handout.length; i++) {
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
          // }

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
                  // complete: function (res) {
                  //   console.log("complete");
                  //   console.log(res)
                  // }
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
          console.log("课程讲义接口调取成功")
        } else {
          console.log("课程讲义==============" + d.data.msg)
        }
      })
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
      url: app.getPagePath('test') + '?eid=' + that.data.course_cata.eid + "&kid=" + that.data.kid,  //结课考试
    })
  },

  //结课考试报告
  to_test_report: function (e) {
    let that = this
    wx.navigateTo({
      url: app.getPagePath('test_report') + '?mid=' + that.data.course_cata.mid,  //考试报告
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
      url: app.getPagePath('homework') + '?eid=' + eid + "&kid=" + kid + "&oid=" + oid,   //课后作业
    })
  },

  //查看报告
  to_end_report:function(){
    let that = this
    wx.navigateTo({
      url: app.getPagePath('endcourse_report') + '?kid=' + that.data.kid,     //结课报告
    })
  },

  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    console.log(type)
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        if(type == 1){
          that.onShow()
        }else{
          if (that.data.currentData == 0){
            var params = {
              "token": wx.getStorageSync("token"),
              "kid": that.data.kid
            }
            // console.log(params, "课程详情接口参数")
            app.ols.course_info4(params).then(d => {
              if (d.data.code == 0) {
                // console.log(d.data.data)
                if (d.data.data.pay_status <= 1 || d.data.data.pay_status >= 5) {
                  if (type == 2) {
                    wx.navigateTo({
                      url: app.getPagePath('pay') + '?kid=' + that.data.kid,     //去支付
                    })
                  } else if(type == 3) {
                    wx.redirectTo({
                      url: app.getPagePath('groupPay') + '?kid=' + that.data.kid,     //去支付
                    })
                  }
                } else {
                  that.onShow()
                }

              } else {
                console.log("课程详情介绍接口==============" + d.data.msg)
              }
            })
          }else{
            var params = {
              "token": wx.getStorageSync("token"),
              "kid": that.data.kid
            }
            console.log(params, "获取课程目录参数")
            app.ols.course_cata4(params).then(d => {
              console.log(d, "获取课程目录接口数据")
              if (d.data.code == 0) {
                if (d.data.data.buy == 0) {
                  if (type == 2) {
                    wx.navigateTo({
                      url: app.getPagePath('pay') + '?kid=' + that.data.kid,     //去支付
                    })
                  } else if(type == 3) {
                    wx.redirectTo({
                      url: app.getPagePath('groupPay') + '?kid=' + that.data.kid,     //去支付
                    })
                  }
                } else {
                  that.onShow()
                }
              } else {
                console.log("课程目录==============" + d.data.msg)
              }
            })
          }
        }
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
    this.clearLocalFile()
    that.judge_login()    //登陆判断
    if (that.data.currentData == 0){
      that.course_detail()   //获取课程简介
    } else if (that.data.currentData == 1){
      that.course_detail()   //获取课程简介
      that.getcourse_cata()   //课程目录接口
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

//位数不足补零
fill_zero_prefix: function (num) {
  return num < 10 ? "0" + num : num
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
      url: app.getPagePath('live') + '?id=' + id + '&kid=' + kid,    //直播
    })
  } else {
    wx.navigateTo({
      url: app.getPagePath('video') + '?id=' + id + '&kid=' + kid + '&eid=' + eid + '&mid=' + mid,  //看视频
    })
  }
  
},

  

  cs1:function(){
    let that = this
    console.log("cs1")
    // let len=that.data.hot1.lists.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      // for (var i = 0; i < that.data.hot1.lists.length; i++) { 
        var intDiff = that.data.course_info.endtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.course_info.endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        // that.data.course_info.difftime = str;//在数据中添加difftime参数名，把时间放进去 

      // } 
      that.setData({ 
        clock: str
      }) 
      // console.log(that)
    } 
    nowTime(); 
    timer = setInterval(nowTime, 1000); 
  },

  cs_group:function(){
    let that = this
    let len=that.data.course_info.option.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.course_info.option.length; i++) { 
        var intDiff = that.data.course_info.option[i].addtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.course_info.option[i].addtime--; 
          var str=hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer_option);   
        } 
        // console.log(str); 
        that.data.course_info.option[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        course_info: that.data.course_info
      }) 
      // console.log(that)
    } 
    nowTime(); 
    timer_option = setInterval(nowTime, 1000); 
  },

  cs_grouplist:function(){
    let that = this
    let len=that.data.all_grouplist.group.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.all_grouplist.group.length; i++) { 
        var intDiff = that.data.all_grouplist.group[i].addtime;//获取数据中的时间戳 
        // console.log(intDiff) 
        var day=0, hour=0, minute=0, second=0;        
        if(intDiff > 0){//转换时间 
          day = Math.floor(intDiff / (60 * 60 * 24)); 
          hour = Math.floor(intDiff / (60 * 60)) - (day * 24); 
          minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60); 
          second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); 
          if(hour <=9) hour = '0' + hour; 
          if (minute <= 9) minute = '0' + minute; 
          if (second <= 9) second = '0' + second; 
          that.data.all_grouplist.group[i].addtime--; 
          var str=hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer_grouplist);   
        } 
        // console.log(str); 
        that.data.all_grouplist.group[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        all_grouplist: that.data.all_grouplist
      }) 
      // console.log(that)
    } 
    nowTime(); 
    timer_grouplist = setInterval(nowTime, 1000); 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // clearInterval(timer_group);   
    // clearInterval(timer);   
    // clearInterval(timer_grouplist);   
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this
    clearInterval(timer_option);   
    clearInterval(timer);  
    clearInterval(timer_grouplist);    
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

  
/**阻止页面滚动。模拟器中页面仍然可以滚动，真机上不能滚动。*/
preventTouchMove: function (e) {
 
},   


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let paramsStr = 'isshare=1&gid=' + that.data.gid + '&kid=' + that.data.kid
    return app.ols.getShareReturnInfo('0,1', 'groupBuy', paramsStr, '/images/other/share1.png', '领军网校')
  }
})