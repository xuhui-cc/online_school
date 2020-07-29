// pages/teacher_studentList/teacher_studentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //学员列表
    studentList: ["", "", "", "", "", "", ""],

    // 表头是否悬停
    headerFixed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemSize()
    this.getStudentListHeaderTop()
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

  // 页面滚动时触发
  onPageScroll: function (e) {
    // console.log(e)
    let scrollTopConstant = e.scrollTop
    if (scrollTopConstant >= this.data.headerTop && !this.data.headerFixed) {
      this.setData({
        headerFixed: true
      })
    } else if (scrollTopConstant < this.data.headerTop && this.data.headerFixed) {
      this.setData({
        headerFixed: false
      })
    }
  },

  //----------------------------------------------私有方法-------------------------------
  /**
   * 获取系统辅助尺寸
  */
  getSystemSize: function() {
    let systemInfo = wx.getSystemInfoSync()
    let menuBoundRect = wx.getMenuButtonBoundingClientRect()
    let naviHeight = menuBoundRect.bottom + 10
    let safeArea_bottom = systemInfo.screenHeight - systemInfo.safeArea.bottom
    this.setData({
      naviHeight: naviHeight,
      safeArea_bottom: safeArea_bottom
    })
  },

  /**
   * 获取表头距离屏幕顶部高度
  */
  getStudentListHeaderTop: function(){
    let that = this
    let query = wx.createSelectorQuery()
    query.select(".studentList_Header").boundingClientRect(function (rect) {
      // console.log(rect)
      let headerFixedTop = that.data.naviHeight - rect.height
      let top = rect.top-headerFixedTop
      that.setData({
        headerTop: top,
        HeaderFixedTop: headerFixedTop
      })
    }).exec()
  },

  //-------------------------------------------------交互事件-----------------------------------
  /**
   * 学员添加日志按钮 点击事件
  */
  addRecordButtonClciked: function(e){
    // console.log(e)
    let index = e.currentTarget.dataset.index

  },

  /**
   * 学员列表单元格 点击事件
  */
  studentCellClicked: function (e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
  }
})