// pages/groupBuy/groupBuy.js
const app = getApp()
var timer,timer_group,timer_grouplist
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0,
    all_group:false,
    rule:false,
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
        if(d.data.data.group){
          that.cs_group()   // 已有团列表倒计时
        }
        
        if(d.data.data.is_buy == 0 || d.data.data.is_buy == 2){
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
              d.data.data.lists.group[i].member[j].avatar = 'http://os.lingjun.net' + d.data.data.lists.group[i].member[j].avatar
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
    wx.navigateTo({
      url: '../../pages/group_detail/group_detail?tid=' + tid + '&kid=' + that.data.kid, 
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
      if(d.data.data.group){
        for(var i=0;i<d.data.data.group.length;i++){
          for(var j=0;j<d.data.data.group[i].member.length;j++){
            if(d.data.data.group[i].member[j].avatar.indexOf("/") == 0){
              d.data.data.group[i].member[j].avatar = 'http://os.lingjun.net' + d.data.data.group[i].member[j].avatar
              //表示strCode是以ssss开头；
            }else if(d.data.data.group[i].member[j].avatar.indexOf("/") == -1){
              //表示strCode不是以ssss开头
            }
          }
          
          d.data.data.group[i].nick = d.data.data.group[i].nick.substr(0,3) + '***'
          d.data.data.group[i].addtime =  d.data.data.group[i].addtime + (24*60*60) - timestamp
        }
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
    var type = e.currentTarget.dataset.type
    console.log(type)
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
                  if(type == 1){
                    that.onShow()
                  }else{
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
                          if (type == 2) {
                            wx.navigateTo({
                              url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
                            })
                          } else if(type == 3) {
                            wx.navigateTo({
                              url: '../../pages/groupPay/groupPay?kid=' + that.data.kid,     //去支付
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
                    app.ols.course_cata1(params).then(d => {
                      console.log(d, "获取课程目录接口数据")
                      if (d.data.code == 0) {
                        if (d.data.data.buy == 0) {
                          if (type == 2) {
                            wx.navigateTo({
                              url: '../../pages/pay/pay?kid=' + that.data.kid,     //去支付
                            })
                          } else if(type == 3) {
                            wx.navigateTo({
                              url: '../../pages/groupPay/groupPay?kid=' + that.data.kid,     //去支付
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
      url: '../../pages/live/live?id=' + id + '&kid=' + kid,    //直播
    })
  } else {
    wx.navigateTo({
      url: '../../pages/video/video?id=' + id + '&kid=' + kid + '&eid=' + eid + '&mid=' + mid,  //看视频
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
    let len=that.data.course_info.group.length;//时间数据长度 
    function nowTime() {//时间函数 
      // console.log(a) 
      for (var i = 0; i < that.data.course_info.group.length; i++) { 
        var intDiff = that.data.course_info.group[i].addtime;//获取数据中的时间戳 
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
          that.data.course_info.group[i].addtime--; 
          var str=hour +':'+minute+':'+ second     
          // console.log(str)     
        }else{ 
          var str = "已结束！"; 
          clearInterval(timer_group);   
        } 
        // console.log(str); 
        that.data.course_info.group[i].difftime = str;//在数据中添加difftime参数名，把时间放进去 

      } 
      that.setData({ 
        course_info: that.data.course_info
      }) 
      // console.log(that)
    } 
    nowTime(); 
    timer_group = setInterval(nowTime, 1000); 
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
    clearInterval(timer_group);   
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    return {
      title: '领军网校', // 转发后 所显示的title
      path: '/pages/groupBuy/groupBuy?isshare=1&gid=' + that.data.gid + '&kid=' + that.data.kid, // 相对的路径
      // path: '/pages/first_page/first_page', // 相对的路径
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