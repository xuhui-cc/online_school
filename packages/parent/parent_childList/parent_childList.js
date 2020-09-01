// pages/parent_childList/parent_childList.js
const app = getApp()
Page({

  // 孩子选择器 是否正在选择中
  selecting: false,

  /**
   * 页面的初始数据
   */
  data: {
    // 孩子列表
    childList: [],

    // 临时选中索引
    tempSelectedIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options = app.shareTool.getShareOption()
    
    this.getChildList()

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
  onShareAppMessage: function () {
    return app.shareTool.getShareReturnInfo('all', 'first_page')
  },

  //-----------------------------------------------------接口--------------------------------------------------------
  getChildList: function() {
    let params = {
      token: wx.getStorageSync('token')
    }
    let that = this
    app.ols.parentGetChildsList(params).then(d=>{
      if (d.data.code == 0) {
        let childList = d.data.data.data
        if (!childList || childList == '') {
          childList = []
        }
        that.setData({
          childList: childList
        })
      } else {
        that.setData({
          childList: []
        })
      }
    })
  },

  //---------------------------------------------------交互事件-------------------------------------------------------
  /**
   * 孩子选择器 值改变回调
  */
  selectChildChange: function(e) {
    console.log(e)
    let index = e.detail.value[0]
    this.setData({
      tempSelectedIndex: index
    })
  },

  /**
   * 孩子选择器 开始滚动回调
  */
  selectChildStart: function() {
    this.selecting = true
  },

  /**
   * 孩子选择器 滚动停止回调
  */
  selectChildEnd: function() {
    this.selecting = false
  },

  /**
   * 孩子选择器 确定按钮点击事件
  */
  sureButtonClciked: function() {
    if (this.selecting) {
      return
    }
    let child = this.data.childList[this.data.tempSelectedIndex]
    wx.navigateTo({
      url: app.getPagePath('study_record') + '?sid='+child.id
    })
  }
})