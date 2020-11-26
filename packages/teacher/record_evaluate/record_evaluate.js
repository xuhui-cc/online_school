// packages/teacher/record_evaluate/record_evaluate.js
let app = getApp()
Page({

  // 学习日志ID
  id: null,

  /**
   * 页面的初始数据
   */
  data: {
    // 提交类型 1-初次点评 2-修改点评
    type: null,
    // 学员名字
    titleName: '',
    // 今日日期
    date: '',

    // 分数
    score: 10,

    // 点评内容
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUpInitialData(options)
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
  // onShareAppMessage: function () {

  // },

//--------------------------------------------------------私有方法---------------------------------------
  /**
   * 处理初始化数据
  */
  setUpInitialData: function(options) {
    let nowDate = new Date()
    let nowDateStr = app.util.customFormatTimeByDate(nowDate, 'yyyy/MM/dd hh:mm')
    this.id = options.logid,
    this.setData({
      type: options.type,
      titleName: options.studentname,
      date: nowDateStr
    })
    if (options.type == 2) {
      // 修改点评
      this.getEvaluateDetail()
    }
  },

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
  //---------------------------------------------------接口-------------------------------------------
  /**
   * 老师提交点评 接口
  */
  submit: function() {
    let params = {
      token: wx.getStorageSync('token'),
      logid: this.id,
      score: this.data.score,
      memo: this.data.content
    }
    let that = this
    app.ols.teacherEvaluateRecord(params).then(d=>{
      if (d.data.code == 0) {
        wx.navigateBack({
          success(res) {
            wx.showToast({
              title: '提交成功',
              icon: 'none'
            })
          }
        })
      }
    })
  },

  /**
   * 获取点评详情
  */
  getEvaluateDetail: function() { 
    let params = {
      token: wx.getStorageSync('token'),
      logid: this.id,
    }
    let that = this
    app.ols.teacherGetEvaluateReocrdDetail(params).then(d=>{
      if (d.data.code == 0) {
        let evaluateDetail = d.data.data
        that.setData({
          score: evaluateDetail.score,
          content: evaluateDetail.memo
        })
      }
    })
  },

  //--------------------------------------------------交互事件------------------------------------------
  /**
   * 导航栏返回按钮 点击事件
  */
  naviBackItemClicked: function () {
    wx.navigateBack()
  },

  /**
   * 评分输入框 输入
  */
  scoreInputChange: function(e) {
    let value = e.detail.value
    if (value > 10) {
      value = 10
    }
    this.setData({
      score: value
    })
  },

  /**
   * 点评输入框 输入
  */
  contentTextareaInput: function(e) {
    let value = e.detail.value
    if (value == ' ') {
      value = ''
    }
    this.setData({
      content: value
    })
  }, 

  /**
   * 提交按钮 点击事件
  */
  submitButtonClciked: function() {
    if (!this.data.score || this.data.score <= 0) {
      wx.showToast({
        title: '请输入评分',
        icon: 'none'
      })
      return
    }
    if (!this.data.content || this.data.content.length == 0) {
      wx.showToast({
        title: '您还没有填写课堂点评',
        icon: 'none'
      })
      return
    }

    this.submit()
  }
})