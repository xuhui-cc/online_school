// packages/teacher/teacher_home/teacher_home.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像
    avatar: '',
    // 昵称
    name: '',

    // 有权限的模块
    itemList: [{},{}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemSize()
    this.setUpUserInfo()
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

  //--------------------------------------私有方法-------------------------------------
  /**
   * 获取系统辅助尺寸
  */
  getSystemSize: function() {
    let systemInfo = wx.getSystemInfoSync()
    let menuBound = wx.getMenuButtonBoundingClientRect()
    
    let naviHeight = menuBound.bottom + 10
    let naviContentHeight = naviHeight - systemInfo.statusBarHeight
    this.setData({
      naviHeight: naviHeight,
      naviContentHeight: naviContentHeight
    })
  },

  /**
   * 设置用户信息
  */
  setUpUserInfo: function() {
    let userinfo = wx.getStorageSync('userinfo')
    this.setData({
      avatar: userinfo.avatar && userinfo.avatar != '' ? userinfo.avatar : '/images/defaultHead/my_head.png',
      name: userinfo.nick ? userinfo.nick : (userinfo.truename ? userinfo.truename : userinfo.phone)
    })
  },

  //--------------------------------------------------交互事件---------------------------------------------------
  /**
   * 切换到学员 按钮
  */
  changeToStudentRole: function() {
    wx.switchTab({
      url: app.getPagePath('my'),
    })
  },

  /**
   * item单元格 点击事件
  */
  itemCellClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.itemList[index]
  }
})