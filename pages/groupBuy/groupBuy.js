// pages/groupBuy/groupBuy.js
const app = getApp()
Page({

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
          "kid": that.data.kid
        }
      }
      console.log(params, "课程详情接口参数")
      app.ols.course_info3(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
        if(d.data.data.pay_status <= 1 || d.data.data.pay_status >= 5){
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


  //去拼团详情
  to_group_detail:function(e){
    let that = this
    var tid = e.currentTarget.dataset.tid
    wx.navigateTo({
      url: '../../pages/group_detail/group_detail?tid=' + tid, 
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
          "kid": that.data.kid
        }
      }
      console.log(params, "课程详情接口参数")
      app.ols.course_info3(params).then(d => {
        that.handle_data1(d)   //课程详情数据处理
        
      })
    // }else{
      
    //   console.log(params, "课程详情接口参数")
    //   app.ols.course_info3(params).then(d => {
    //     that.handle_data1(d)   //课程详情数据处理
    //   })
    // }
    
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
        // "token": wx.getStorageSync("token"),
        "kid": that.data.kid
      }
    }
      console.log(params, "获取课程目录参数")
      app.ols.course_cata3(params).then(d => {
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
    // }else{
      
    //   console.log(params, "获取课程目录参数")
    //   app.ols.course_cata2(params).then(d => {
    //     console.log(d, "获取课程目录接口数据")
    //     if (d.data.code == 0) {
    //       console.log(d.data.data)
    //       that.setData({
    //         course_cata: d.data.data
    //       })
    //       console.log("课程目录接口调取成功")
    //     } else {
    //       console.log("课程目录==============" + d.data.msg)
    //     }
    //   })
    // }
    
  },

  //课程详情介绍数据处理
  handle_data1:function(d){
    let that = this
    console.log(d, "课程详情接口数据")
    if (d.data.code == 0) {
      console.log(d.data.data)
      var timestamp = (Date.parse(new Date()))/1000
      console.log(timestamp,"timestamp")
      d.data.data.endtime = d.data.data.endtime - timestamp
      for(var i=0;i<d.data.data.group.length;i++){
          d.data.data.group[i].nick = d.data.data.group[i].nick.substr(0,3) + '***'
      }
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

  //去支付
  to_pay:function(e){
    let that = this
    // var kid = e.currentTarget.dataset.kid
    // console.log(kid)
    wx.navigateTo({
      url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
    })
  },

    //去拼团
    to_groupPay:function(e){
      let that = this
      // var kid = e.currentTarget.dataset.kid
      // console.log(kid)
      wx.navigateTo({
        url: '../../pages/groupPay/groupPay?kid=' + that.data.kid,     //去支付
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
                 
                  that.setData({
                    login: true
                  })
                  wx.setStorageSync("login", true)
                  wx.setStorageSync("token", d.data.data.token)
                  if (that.data.currentData == 0){
                    var params = {
                      "token": wx.getStorageSync("token"),
                      "kid": that.data.kid
                    }
                    console.log(params, "课程详情接口参数")
                    app.ols.course_info3(params).then(d => {
                      if (d.data.code == 0) {
                        console.log(d.data.data)
                        if (d.data.data.pay_status <= 1 || d.data.data.pay_status >= 5) {
                          if (d.data.data.price != 0) {
                            // wx.navigateTo({
                            //   url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
                            // })
                          } else {
                            // that.to_free()  //免费课
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
                    app.ols.course_cata1(params).then(d => {
                      console.log(d, "获取课程目录接口数据")
                      if (d.data.code == 0) {
                        if (d.data.data.buy == 0) {
                          // wx.navigateTo({
                          //   url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
                          // })
                        } else {
                          that.onShow()
                        }
                      } else {
                        console.log("课程目录==============" + d.data.msg)
                      }
                    })
                  }
                  
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

  // cs:function(){
  //   var cs_total_micro_second = 60000 * that.data.test_explain.timeline
  //   that.setData({
  //     total_micro_second: cs_total_micro_second
  //   })
  //   this.count_down(this);
  // },

  //小程序倒计时功能
  // count_down: function (that) {
  //   that.setData({
  //     clock: that.dateformat(that.data.total_micro_second),
  //     cur_uni: that.data.total_micro_second
  //   });
  //   if (that.data.total_micro_second == 0) {
  //     that.setData({
  //       clock: "00:00:00"
  //     });
  //     wx.showToast({
  //       title: '3秒后将自动交卷',
  //       icon:"none",
  //       duration:2950
  //     })
  //     setTimeout(function () {
  //       that.update_cpsubmit()    //达到规定时间自动交卷
  //      console.log("交卷")
  //     }, 3000)
  //     return;
  //   }
  //   var cs_t = setTimeout(function () {
  //     var cs_total_micro_second = that.data.total_micro_second
  //     cs_total_micro_second -= 1000;
  //     that.setData({
  //       total_micro_second: cs_total_micro_second
  //     })
  //     that.count_down(that)
  //   }, 1000)
    
  //   that.setData({
  //     t:cs_t
  //   })
  //   console.log(that.data.t)
  // },

 //时间格式整理
//  dateformat: function (micro_second) {
//   var day = Math.floor(micro_second / (60 * 60 * 24)); 
//   // 秒数
//   var second = Math.floor(micro_second / 1000);  //Math.floor(intDiff / (60 * 60)) - (day * 24)
//   // 小时位
//   var hr = this.fill_zero_prefix(Math.floor(second / 3600));
//   // var hr = this.fill_zero_prefix(Math.floor(second / 3600));
//   // 分钟位
//   var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//   // 秒位
//   var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
//   return day + " 天 " + hr + " : " + min + " : " + sec;
// },


// dateformatforreport: function (micro_second) {
//   // 秒数
//   var second = Math.floor(micro_second / 1000);
//   // 小时位
//   var hr = this.fill_zero_prefix(Math.floor(second / 3600));
//   // 分钟位
//   var min = this.fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
//   // 秒位
//   var sec = this.fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
//   return hr + "时" + min + "分" + sec + "秒";
// },
//位数不足补零
fill_zero_prefix: function (num) {
  return num < 10 ? "0" + num : num
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  cs1:function(){
    let that = this
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
    var timer = setInterval(nowTime, 1000); 
  },

  cs:function(){
    let that = this
    let len=that.data.hot1.lists.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.hot1.lists.length; i++) { 
        var intDiff = that.data.hot1.lists[i].endtime;//获取数据中的时间戳 
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
          that.data.hot1.lists[i].endtime--; 
          var str=day + "天 " + hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer);   
        } 
        // console.log(str); 
        that.data.hot1.lists[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        wearList: that.data.hot1.lists 
      }) 
      // console.log(that)
    } 
    nowTime(); 
    var timer = setInterval(nowTime, 1000); 
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let that = this
    // clearInterval(that.data.t)
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
  // onShareAppMessage: function () {

  // }
})