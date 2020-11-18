// packages/teacher/teacher_rightList/teacher_rightList.js
let app = getApp()
Page({

  pageData: {
    perpage: 10,
    page: 1,
    canLoadNextPage: false,
  },

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * open_log: 0-没有学习日志功能  1-有学习日志功能
     * valid_days：有效期天数  0-永久有效
    */
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemSize()
    this.getRightList()
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
    this.pageData.page = 1
    this.getRightList(function(success){
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.pageData.canLoadNextPage) {
      return
    }
    let oldPage = this.pageData.page
    this.pageData.page += 1
    let that = this
    this.getRightList(function(success){
      if (!success) {
        that.pageData.page = oldPage
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //----------------------------------------------私有方法----------------------------------------------------
  /**
   * 获取系统辅助尺寸
  */
  getSystemSize: function() {
    let systemInfo = wx.getSystemInfoSync()
    let menuBound = wx.getMenuButtonBoundingClientRect()
    
    let naviHeight = menuBound.bottom + 10
    let naviContentHeight = naviHeight - systemInfo.statusBarHeight
    let safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom
    this.setData({
      naviHeight: naviHeight,
      naviContentHeight: naviContentHeight,
      safeAreaBottom: safeAreaBottom
    })
  },

  //------------------------------------------------接口------------------------------------------------------
  /**
   * 获取权益包列表
  */
  getRightList: function(callback) {
    let params = {
      token: wx.getStorageSync('token'),
      num: this.pageData.perpage,
      page: this.pageData.page
    }
    let that = this
    app.ols.getTeacherRightList(params).then(d=>{
      if (d.data.code == 0) {
        let rightList = d.data.data.lists
        for (var i = 0; i < rightList.length; i++) {
          let right = rightList[i]
          // 拆分课程ID
          // if (vip.course_ids) {
          //   vip.courses = vip.course_ids.split(',')
          // } else {
          //   vip.courses = []
          // }
          // 拆分优惠券ID
          // if (vip.coupon_id) {
          //   vip.coupons = vip.coupon_id.split(',')
          // } else {
          //   vip.coupons = []
          // }
        }
        if (rightList.length < that.pageData.perpage) {
          that.pageData.canLoadNextPage = false
        } else {
          that.pageData.canLoadNextPage = true
        }
        let newList = []
        if (that.pageData.page == 1) {
          newList = rightList
        } else {
          newList = that.data.list.concat(rightList)
        }
        that.setData({
          list: newList
        })
        typeof callback == 'function' && callback(true)
      } else {
        if (that.pageData.page == 1) {
          that.setData({
            list: [],
          })
        }
        typeof callback == 'function' && callback(false)
      }
    })
  },

  //-----------------------------------------------交互事件----------------------------------------------------
  /**
   * 导航栏 返回按钮 点击事件
  */
  backItemClciked: function() {
    wx.navigateBack()
  },

  /**
   * 查看详情按钮 点击事件
  */
  showDetailButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let right = this.data.list[index]
    wx.navigateTo({
      url: app.getPagePath('rightCardDetail') + '?id='+right.id,
    })
  }
})