// packages/common/vipCardDetail/vipCardDetail.js
let app = getApp()
Page({

  couponPageData: {
    perpage: 10,
    page: 1,
    canLoadNextPage: false
  },

  coursePageData: {
    perpage: 10,
    page: 1,
    canLoadNextPage: false
  },

  // 会员卡id
  id: null,

  // 分享的老师ID
  tid: null,

  /**
   * 页面的初始数据
   */
  data: {
    
    login: false,

    // 会员卡基础信息
    baseInfo: null,

    // 优惠券权益列表
    couponList: [],

    // 优惠券总数
    couponTotalCount: 0,

    // 优惠券样式列表
    couponColorList: [
      {
        color: '#FF4E20',
        image: './resource/couponBg1.png'
      },
      {
        color: '#1BB059',
        image: './resource/couponBg2.png'
      },
      {
        color: '#20BAFF',
        image: './resource/couponBg3.png'
      }
    ],

    // 课程权益列表
    courseList: [],

    // 课程总数
    courseTotalCount: 0,

    // 是否是老师角色
    isTeacher: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    if (options.gid) {
      wx.setStorageSync('gid', options.gid)
    }
    this.setData({
      login: wx.getStorageSync('login'),
      isTeacher: wx.getStorageSync('role') == 3,
    })
    this.tid = options.tid
    this.getSystemSize()
    this.getVipBaseInfo()
    this.getCouponList()
    this.getCourseList()
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
    let oldPage = this.coursePageData.page
    this.coursePageData.page += 1
    let that = this
    this.getCourseList(function(success){
      if (!success){
        that.coursePageData.page = oldPage
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  //----------------------------------------私有方法--------------------------------------------------
  getSystemSize: function() {
    let systeminfo = wx.getSystemInfoSync()
    let safeAreaBottom = systeminfo.screenHeight - systeminfo.safeArea.bottom
    this.setData({
      safeAreaBottom: safeAreaBottom,
      screenWidth: systeminfo.screenWidth
    })
  },

  //------------------------------------------接口-----------------------------------------------------
  /**
   * 获取会员卡基础信息
  */
  getVipBaseInfo: function() {
    let params = {
      token: wx.getStorageSync('token'),
      id: this.id
    }
    let that = this
    app.ols.getVipCardBaseInfo(params).then(d=>{
      if (d.data.code == 0) {
        let baseInfo = d.data.data.lists
        that.setData({
          baseInfo: baseInfo
        })
      }
    })
  },

  /**
   * 获取会员卡关联的优惠券权益列表
  */
  getCouponList: function(callback) {
    let params = {
      token:wx.getStorageSync('token'),
      id: this.id,
      num: this.couponPageData.perpage,
      page: this.couponPageData.page
    }
    let that = this
    app.ols.getVipCardCouponList(params).then(d=>{
      if (d.data.code == 0) {
        let couponList = d.data.data.lists
        if (couponList.length < that.couponPageData.perpage) {
          that.couponPageData.canLoadNextPage = false
        } else {
          that.couponPageData.canLoadNextPage = true
        }
        let newList = []
        if (that.couponPageData.page == 1) {
          newList = couponList
        } else {
          newList = that.data.couponList.concat(couponList)
        }
        that.setData({
          couponList: newList,
          couponTotalCount: d.data.data.total
        })
        typeof callback == 'function' && callback(true)
      } else {
        if (that.couponPageData.page == 1) {
          that.setData({
            couponList: [],
            couponTotalCount: 0
          })
          that.couponPageData.canLoadNextPage = false
        }
        typeof callback == 'function' && callback(false)
      }
    })
  },

  /**
   * 课程权益列表
  */
  getCourseList: function(callback) {
    let params = {
      token:wx.getStorageSync('token'),
      id: this.id,
      num: this.coursePageData.perpage,
      page: this.coursePageData.page
    }
    let that = this
    app.ols.getVipCardCourseList(params).then(d=>{
      if (d.data.code == 0) {
        let courseList = d.data.data.lists
        if (courseList.length < that.coursePageData.perpage) {
          that.coursePageData.canLoadNextPage = false
        } else {
          that.coursePageData.canLoadNextPage = true
        }
        let newList = []
        if (that.coursePageData.page == 1) {
          newList = courseList
        } else {
          newList = that.data.courseList.concat(courseList)
        }
        that.setData({
          courseList: newList,
          courseTotalCount: d.data.data.total
        })
        typeof callback == 'function' && callback(true)
      } else {
        if (that.coursePageData.page == 1) {
          that.setData({
            courseList: [],
            courseTotalCount: 0
          })
          that.coursePageData.canLoadNextPage = false
        }
        typeof callback == 'function' && callback(false)
      }
    })
  },

  /**
   * 领取会员卡
  */
  getVip: function() {
    let params = {
      token: wx.getStorageSync('token'),
      id: this.id
    }
    if (this.tid) {
      params.tid = this.tid
    }
    let that = this
    app.ols.getVipCard(params).then(d=>{
      if (d.data.code == 0) {
        wx.redirectTo({
          url: app.getPagePath('vip_detail'),
        })
      }else{
        wx.showToast({
          title: d.data.msg,
          icon:"none",
          duration:1000
        })
        setTimeout(function () {
          wx.redirectTo({
            url: app.getPagePath('vip_detail'),
          })
        }, 1000)
      }
    })
  },

  //--------------------------------------------交互事件------------------------------------------
  /**
   * 领取按钮 点击事件
  */
  catchButtonClciked: function() {
    this.getVip()
  },


  /**
   * 获取手机号 button  点击事件
  */
  getPhoneNumber: function(e) {
    let gid = wx.getStorageSync('gid')
    if (!gid) {
      gid = 0
    }
    let that = this
    app.loginTool.getPhoneNumber(e, gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        that.catchButtonClciked()
      }
    })
  }
})