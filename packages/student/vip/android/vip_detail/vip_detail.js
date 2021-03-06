// pages/vip_detail/vip_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  coursePage:1,
  pageNum:10,


  data: {
    imgUrls: [
      './resource/vip2.png',
      './resource/vip2.png',
      './resource/vip2.png',
    ],
    pay:false,
    code_layout:false,
    exchange_page:false,
    interval: 3000, //停留时间间隔
    previousMargin: '35px', //前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    nextMargin: '35px', //后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    circular: true, //是否采用衔接滑动
    currentSwiperIndex: 0, //swiper当前索引
    btn_buy:app.globalData.btn_buy,     //购买按钮屏蔽
    signBtn:false,    //开通会员按钮
    courseList:'',
    couponList:'',
  },

  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },

  //返回我的主页
  back:function(){
    let that = this
    if(that.data.ewm_exchange == 1){
      wx.switchTab({
        url: app.getPagePath('logs'),
      })
    }else{
      wx.navigateBack()
    }
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.vipRight()    //获取会员卡权益
    that.setData({
      couponUseTip:wx.getStorageSync('couponUseTip')
    })
    if (options.isshare == 1){
      wx.setStorageSync("gid", options.gid)
      that.setData({
        isshare:options.isshare,
        code_layout:options.code_layout=="true"?true:false,
        gid:options.gid,
        login: wx.getStorageSync("login")
      })
      console.log("vip分享打开",that.data.code_layout,"code_layout",that.data.login,"login")
    }else{
      that.setData({
        login: wx.getStorageSync("login")
      })
      if(options.ewm_exchange){
        that.setData({
          ewm_exchange: options.ewm_exchange
        })
      }
      console.log("非分享打开")
    }
    
  },

  //兑换码输入
  input_code: function (e) {
    let that = this
    that.setData({
      code : e.detail.value
      })
      if(that.data.code != e.detail.value){
        that.setData({
          checkCode:1,
        })
      }
  },

  //兑换码验证
  submit_check:function(){
    let that =  this
    var params = {
      "token": wx.getStorageSync("token"),
      "code":that.data.code
    }
    app.ols.cheek_code5(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          signBtn:false,
          code_layout:false,
          code:''
        })
        if(d.data.data.cate == 2){
          wx.navigateTo({
            url: app.getPagePath('exchangeCode_2C') + '?id=' + d.data.data.id + '?ewm=2',
          })
        }else{
          that.setData({
          signBtn:false,
          codeinfo:d.data.data,
          exchange_page:true,
          code_layout:false,
          code:''
        })
        }
      } else if(d.data.code == 5){
        that.setData({
          checkCode:-1,
          check_msg:d.data.msg
        })
      }
      else{
        console.log("会员列表失败==============" + d.data.msg)
      }
    })
  },

  //确认兑换
  yes_exchange:function(){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "id":that.data.codeinfo.id
    }
    app.ols.exchange_code5(params).then(d => {
      
      if (d.data.code == 0) {
        that.allVipCourse()   //获取全部关联课程
        that.allVipCoupon()    //获取关联会员卡
        that.viplist()  //获取会员卡信息
        that.setData({
          exchange_page:false,
          pay:true,
          code:'',
          sign_title:d.data.data.title,
          sign_remark:d.data.data.remark,
        })
      } else if(d.data.code == 5){
        wx.showToast({
          title: d.data.msg,
          icon:"none",
        })
        that.setData({
          exchange_page:false,
          code:'',
        })
        that.viplist()  //获取会员卡信息
        that.allVipCourse()   //获取全部关联课程
        that.allVipCoupon()    //获取关联会员卡
      }
    })
  },

  //兑换页关闭
  exchange_page:function(){
    let that = this
    that.setData({
      exchange_page:false,
      code:'',
      checkCode:1,
    })
  },

  vip_course_detail:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    var course = that.data.courseList[xb]
        wx.navigateTo({
          url: app.getPagePath('course_detail') + '?kid=' + course.kid,
        })
    // if(course.type == 0){
    //     wx.navigateTo({
    //       url: app.getPagePath('course_detail') + '?kid=' + course.kid,
    //     })
    // }else if(course.type == 1){
    //   wx.navigateTo({
    //     url: app.getPagePath('groupBuy') + '?kid=' + course.kid,
    //   })
    // }else if(course.type == 2){
    //   wx.navigateTo({
    //     url: app.getPagePath('course_seckill') + '?kid=' + course.kid,
    //   })
    // }
  },

  vip_buy:function(){
    let that = this
    wx.showLoading({
      title: '请稍后...',
    })
      var params = {
        "token": wx.getStorageSync("token"),
        "kid": that.data.vip_list[0].id,
      }
    console.log(params,"会员卡预支付接口")
      app.ols.v4_vipPreorder(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          var ob = JSON.parse(d.data.data.paystr)
          that.setData({
            orderid:d.data.data.orderid
          })
          console.log(ob)
          var timeStamp = ob.timeStamp
          var nonceStr = ob.nonceStr
          var pack = ob.package
          var paySign = ob.paySign
          that.laqizhifu(timeStamp, nonceStr, pack, paySign)
          console.log("会员卡预支付接口成功")
        } else {
          console.log("预支付接口失败", d)
        }
      })
  },

  //拉起微信支付
  laqizhifu: function (timeStamp, nonceStr, pack, paySign) {
    let that = this
    wx.hideLoading()
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: pack,
      signType: 'MD5',
      paySign: paySign,
      success(res) {
        console.log("支付成功")
        wx.showToast({
          title: '支付成功',
          duration:3000
        })
        that.setData({
          pay:true
        })
        
      },
      fail(res) {
       
        console.log("失败")
        that.group_del4()    //支付失败删除订单
        
      }
    })
  },

  group_del4:function(){
    let that = this
      var params = {
        "token": wx.getStorageSync("token"),
        "oid": that.data.orderid,
      }
    console.log(params,"删除接口")
      app.ols.group_del4(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          console.log("删除接口成功")
        } else {
          console.log("删除接口失败", d)
        }
      })
  },

  //打开兑换码弹框
  exchange:function(){
    let that = this
    that.setData({
      code:'',
      checkCode:1,
      code_layout:true
    })
    console.log("exchange方法",that.data.code_layout)
  },

  //关闭兑换弹框
  close_code:function(){
    let that = this
    that.setData({
      code_layout:false
    })
    console.log("close_code方法",that.data.code_layout)
  },

  //查看会员权益
  success_yes:function(){
    let that = this 
    that.setData({
      pay:false
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
    that.viplist()  //获取会员卡信息
    that.allVipCourse()  //获取会员卡课程
    that.allVipCoupon()   //获取展示优惠券
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // let that = this
    // that.coursePage = 1
    // that.setData({
    //   courseList:''
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // let that = this
    // that.coursePage = 1
    // that.setData({
    //   courseList:''
    // })
  },

  /**阻止页面滚动。模拟器中页面仍然可以滚动，真机上不能滚动。*/
  preventTouchMove: function (e) {
  
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
    let that = this 
    console.log("触底")
    if(that.data.courseList){
      if(that.data.courseList.length < that.data.total){
        that.coursePage += 1
        that.allVipCourse()
      }
      else{
        
      }
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this;
    let paramStr = 'isshare=1&gid=' + wx.getStorageSync('gid') + "&code_layout=" + that.data.code_layout
    return app.shareTool.getShareReturnInfo('0,1', 'vip_detail', paramStr, '/images/other/share1.png', '领军网校')
  },

  /*-------------------------------------------------------接口------------------------------------------------- */

  //获取会员卡信息
  viplist:function(){
    let that = this
    if(that.data.login){
      var params = {
        "token": wx.getStorageSync("token"),
      }
      app.ols.v5_viplist(params).then(d => {
        if (d.data.code == 0) {
          that.setData({
            vip:d.data.data
          })
        } else{
          that.setData({
            vip:''
          })
        }
      })
    }else{
      console.log("未登录")
      that.setData({
        vip:''
      })
    }
    
  },

  //获取会员卡权益
  vipRight:function(){
    let that = this 
    var params = ''
    app.ols.vipRight(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          vipRight:d.data.data.res
        })
      } else {
        
      }
    })
  },

  //获取全部权益课程
  allVipCourse:function(){
    let that = this
    if(that.data.login){
      if(!that.data.total || (that.data.courseList.length < that.data.total)){
        var params = {
          "token": wx.getStorageSync("token"),
          "num":that.pageNum,
          "page":that.coursePage
        }
        app.ols.allVipCourse(params).then(d => {
          if (d.data.code == 0) {
            if(that.coursePage == 1){
              that.setData({
                total:d.data.data.total,
                courseList:d.data.data.lists
              })
            }else{
              var finalList = that.data.courseList.concat(d.data.data.lists)
              that.setData({
                courseList:finalList
              })
            }
            
          } 
          else{
            
          }
        })
      }
      
    }
    
  },

  //获取优惠券数据
  allVipCoupon:function(){
    let that = this
    if(that.data.login){
      var params = {
        "token": wx.getStorageSync("token"),
      }
      app.ols.allVipCoupon(params).then(d => {
        if (d.data.code == 0) {
          
            that.setData({
              coupon_num:d.data.data.course_count,
              couponList:d.data.data.lists.slice(0,3)
            })

        } 
        else{
          
        }
      })
    }
    
  },

  


  /*------------------------------------------------------方法-------------------------------------------------- */


  // // 获取滚动条当前位置
  // onPageScroll:function(e){ 
  //   console.log(e.scrollTop,"hhhhhhhhhhhhhhhhh")
  //   let that = this 
  //   // var top = 0
  //   // if(e.scrollTop > 350){
  //   //   top = 1
  //   //   that.setData({
  //   //     top:top
  //   //   })
  //   // }
  // },

  onPageScroll: function (e) {
    let that = this
    var top = 0
      if(e.scrollTop > 350){
      top = 1
      
    }
    that.setData({
      top:top
    })
  },

  /**
   * 返回顶部 按钮 点击事件
  */
 backToTop: function() {
  wx.pageScrollTo({
    scrollTop: 0
  })
},

   //获取微信绑定手机号登录
   getPhoneNumber: function (e) {
    var that = this
    var type = e.currentTarget.dataset.type
    console.log(type,"type")
    app.loginTool.getPhoneNumber(e, wx.getStorageSync('gid'), function(success, message){
      if (success) {
        that.setData({
          login: true,
        })
        that.onShow()
        if(type == 1){
          that.setData({
            code:'',
            checkCode:1,
            code_layout:true
          })
          console.log("type==1")
        }else if(type == 2){
          if(that.data.isshare == 1){
            console.log("分享进入点击开通按钮")
          }else{
            that.setData({
              code:'',
              checkCode:1,
              signBtn:true
            })
          }
          
        }else{
          
        }
      }
    })
  },

  
 

  //跳转我的会员卡
  to_myVipCard:function(){
    let that = this
    
    wx.navigateTo({
      url: app.getPagePath('myVipCard') 
    })
  },

  //跳转我的优惠券
  to_myCoupon:function(){
    let that = this
    wx.navigateTo({
      url: app.getPagePath("my_coupon")
    })
  },

  

  couponUes:function(){
    let that = this 
    wx.navigateTo({
      url: app.getPagePath('my_coupon')
    })
    
  },

  //开通会员按钮
  signBtn:function(){
    let that = this 
    that.setData({
      signBtn:!that.data.signBtn
    })
  },

})