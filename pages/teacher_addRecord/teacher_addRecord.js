// pages/teacher_addRecord/teacher_addRecord.js
Page({

  // 课时选择器 过渡处理数据
  clearCountPickerData: {
    // 是否正在滚动选择
    scroll: 0,
    // 临时选择的索引值
    selected_leftIndex:1,
    selected_rightIndex:0
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 日志类型数组
    typeList: [
      {
        title: "上课",
        id: 1,
        selected: false,
      }, 
      {
        title: "作业",
        id: 2,
        selected: false
      }, 
      {
        title: "课间活动",
        id: 3,
        selected: false
      }
    ],

    // 选中的日志类型 索引
    selectedTypeIndex: null,
    // 是否消课
    clearCourseHour: false,
    // 消课课时
    clearCourseHourCount_pointLeft: '2',
    clearCourseHourCount_pointRight: "0",
    clearCourseHourCount_pointLeft_index: 1,
    clearCourseHourCount_pointRight_index: 0,
    // 是否展示
    showClearCountSelectView: false,

    // 课时选择弹框 选择器数据
    clearCourseCount_pointLeftList:["1","2","3","4","5"],
    clearCourseCount_pointRightList:["0","5"],

    // 日志输入框 内容
    content: "",

    /**
     * 附件数组
    */
    files: []
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

  //----------------------------------------------私有方法-------------------------------
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

  //--------------------------------------------------------接口---------------------------------------------------
  /**
   * 上传图片
  */
  recordUploadFile: function(file) {
    let that = this
    if(file.type == "video") {
      that.data.files.unshift(file)
    } else {
      that.data.files.push(file)
    }
    that.setData({
      files: that.data.files
    })
  },

  //-------------------------------------------------------交互事件-------------------------------------------------
  /**
   * 导航栏返回按钮 点击事件
  */
  naviBackItemClicked: function () {
      wx.navigateBack()
  },

  /**
   * 日志类型单元格 点击事件
  */
  recordTypeCellClicked: function(e) {
    let index = e.currentTarget.dataset.index
    if (this.data.selectedTypeIndex != null) {
      // 选中索引已存在
      if (this.data.selectedTypeIndex == index) {
        return
      }
      let newSelectedTypeString = "typeList["+index+"].selected"
      let oldSelectedTypeString = "typeList["+this.data.selectedTypeIndex+"].selected"
      this.setData({
        [newSelectedTypeString]: true,
        [oldSelectedTypeString]: false,
        selectedTypeIndex: index
      })
    } else {
      // 选中索引不存在
      let newSelectedTypeString = "typeList["+index+"].selected"
      this.setData({
        [newSelectedTypeString]: true,
        selectedTypeIndex: index
      })
    }
  },

  /**
   * 是否消课 点击事件
  */
  clearCourseHourClicked: function() {
    this.setData({
      clearCourseHour: !this.data.clearCourseHour
    })
  },

  /**
   * 消课数量 点击事件
  */
  clearCourseHourCountClicked: function() {
    this.setData({
      showClearCountSelectView: true
    })
  },

  /**
   * 课时选择弹框 关闭按钮 点击事件
  */
  clearCountViewClose: function() {
    this.setData({
      showClearCountSelectView: false
    })
  },

  /**
   * 课时选择器 确定按钮 点击事件
  */
  clearCountSelectSureButtonClciked: function() {
    if (this.clearCountPickerData.scroll != 0) {
      return
    }
    this.setData({
      showClearCountSelectView: false,
      clearCourseHourCount_pointLeft: this.data.clearCourseCount_pointLeftList[this.clearCountPickerData.selected_leftIndex],
      clearCourseHourCount_pointRight: this.data.clearCourseCount_pointRightList[this.clearCountPickerData.selected_rightIndex],
      clearCourseHourCount_pointLeft_index: this.clearCountPickerData.selected_leftIndex,
      clearCourseHourCount_pointRight_index: this.clearCountPickerData.selected_rightIndex
    })
  },

  /**
   * 课时选择器 开始滚动选择回调
  */
  clearCountPickerStartScroll: function(e) {
    // console.log("滚动开始")
    this.clearCountPickerData.scroll = this.clearCountPickerData.scroll + 1
  },

  /**
   * 课时选择器 结束滚动选择回调
  */
  clearCountPickerEndScroll: function() {
    // console.log("滚动结束")
    this.clearCountPickerData.scroll = this.clearCountPickerData.scroll - 1
  },

  /**
   * 课时选择器 选中回调
  */
  clearCountPickerChange: function (e) {
    // console.log(e)
    let selectedIndexArray = e.detail.value
    let leftIndex = selectedIndexArray[0]
    let rightIndex = selectedIndexArray[2]
    this.clearCountPickerData.selected_leftIndex = leftIndex
    this.clearCountPickerData.selected_rightIndex = rightIndex
  },

  /**
   * 日志内容输入框 输入回调
  */
  recordContentTextareaInput: function(e) {
    // console.log(e)
    let value = e.detail.value
    if (value == " ") {
      this.setData({
        content: ""
      })
      return
    }
    this.setData({
      content: value,
    })
  },

  /**
   * 添加图片/视频按钮 点击事件
  */
  addFileButtonClicked: function() {
    let that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      success (res) {
        // console.log(res)
        let files = res.tempFiles
        if (files.length >= 1) {
          let file = files[0]
          file.type = res.type // "image", "video"
          that.recordUploadFile(file)
        }
      },
      fail (res) {
        wx.showToast({
          title: '打开相册失败\n'+res.errMsg,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 附件删除按钮 点击事件
  */
  fileDeleteButtonClciked: function(e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.files.splice(index, 1)
    this.setData({
      files: this.data.files
    })
  },

  /**
   * 附件 点击事件
  */
  showBigFile: function(e) {
    return
    let index = e.currentTarget.dataset.index
    let file = this.data.files[index]
    let sourse = {
      url: file.tempFilePath,
      type: file.type,
    }
    if (file.type == 'video') {
      sourse.poster = file.thumbTempFilePath
    }
    wx.previewMedia({
      sources: [sourse],
      fail (res) {
        wx.showToast({
          title: '打开文件失败\n'+res.errMsg,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 提交按钮 点击事件
  */
  submitButtonClciked: function() {
    wx.navigateBack({
      delta: 0,
    })
    wx.showToast({
      title: '提交成功',
      icon: 'none'
    })
  }
})