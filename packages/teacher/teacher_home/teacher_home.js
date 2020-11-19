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
    itemList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options = app.shareTool.getShareOption()

    this.getSystemSize()
    this.setUpUserInfo()
    this.getAuthMoudle()

    app.shareTool.shareTarget()
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
  // onShareAppMessage: function () {

  // },

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

  //----------------------------------------------------接口----------------------------------------------------
  /**
   * 获取有权限的模块列表
  */
  getAuthMoudle: function() {
    let params = {
      token: wx.getStorageSync('token')
    }
    let that = this
    app.ols.getTeacherAuth(params).then(d=>{
      if (d.data.code == 0) {
        let itemList = d.data.data
        for (var i = 0; i < itemList.length; i++) {
          let item = itemList[i]
          switch(item.id*1) {
            case 1: {
              // 学习日志
              item.icon = './resource/item_studyRecord.png'
              break
            }
            case 2: {
              // 会员卡
              item.icon = './resource/item_vipCard.png'
              break
            }
            case 3: {
              // 优惠券
              item.icon = './resource/item_coupon.png'
              break
            }
            case 4: {
              // 兑换码-权益包
              item.icon = './resource/item_right.png'
              break
            }
          }
        }
        that.setData({
          itemList: itemList
        })
      }
    })
  },

  //--------------------------------------------------交互事件---------------------------------------------------
  /**
   * 切换到学员 按钮
  */
  changeToStudentRole: function() {
    wx.switchTab({
      url: app.getPagePath('my'),
      success(res) {
        wx.setStorageSync('role', 1)
      }
    })
  },

  /**
   * item单元格 点击事件
  */
  itemCellClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.itemList[index]
    switch(item.id*1) {
      case 1:{
        // 学习日志
        wx.navigateTo({
          url: app.getPagePath('teacher_studentList'),
        })
        break
      }
      case 2: {
        // 会员卡
        wx.navigateTo({
          url: app.getPagePath('teacher_vipCardList'),
        })
        break
      }
      case 3:{
        // 优惠券
        wx.navigateTo({
          url: app.getPagePath('teacher_couponList'),
        })
        break
      }
      case 4:{
        // 权益包
        wx.navigateTo({
          url: app.getPagePath('teacher_rightList'),
        })
        break
      }
    }
  }
})