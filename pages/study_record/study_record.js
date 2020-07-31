// pages/study_record/study_record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日志列表 最小高度
    minRecordListHeight: 0,

    // 日志数组
    recordList: [],

    // 一键返回顶部
    scrollTop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemSize()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //----------------------------------------------------------私有方法-------------------------------------------------
  /**
   * 获取系统辅助尺寸
  */
  getSystemSize: function() {
    let systemInfo = wx.getSystemInfoSync()
    let menuBoundRect = wx.getMenuButtonBoundingClientRect()
    let naviHeight = menuBoundRect.bottom + 10
    let safeArea_bottom = systemInfo.screenHeight - systemInfo.safeArea.bottom
    let statusBarHeight = systemInfo.statusBarHeight
    let naviContentHeight = naviHeight - statusBarHeight
    this.setData({
      naviHeight: naviHeight,
      safeArea_bottom: safeArea_bottom,
      statusBarHeight: statusBarHeight,
      naviContentHeight: naviContentHeight,
      screenWidth: systemInfo.screenWidth,
      screenHeight: systemInfo.screenHeight
    })
  },

  //------------------------------------------------------交互事件------------------------------------------------
  /**
   * 日历 天点击 回调
  */
  dayClicked: function(e) {
    console.log("点击了天")
    console.log(e)
  },

  /**
   * 日历 日期范围改变 回调
  */
  datePeriodChange: function(e) {
    console.log("日期区间改变")
    console.log(e)
  },

  /**
   * 日历 每次翻页/回今天/初始化/切换显示模式时 返回高度
  */
  getCalenderHeight: function(e) {
    if (this.data.minRecordListHeight == 0) {
      let that = this
      console.log("日历高度")
      console.log(e)
      let calenderHeight = e.detail
      let query = wx.createSelectorQuery()
      query.select(".studentInfoView").boundingClientRect(function (rect) {
        // console.log(rect)
        let studentInfoHeight = rect.height
        let studentInfoTop = rect.top
        let minRecordHeight = that.data.screenHeight - calenderHeight/750.0*that.data.screenWidth - studentInfoHeight - studentInfoTop
        that.setData({
          minRecordListHeight: minRecordHeight
        })
      }).exec()
    }
  },

  /**
   * 返回顶部 按钮 点击事件
  */
  backToTop: function() {
    this.setData({
      scrollTop: 0,
    })
  },

  /**
   * 导航栏 返回item 点击事件
  */
  naviBackItemClicked: function() {
    wx.navigateBack({
      delta: 0,
    })
  }
})