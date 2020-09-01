// pages/teacher_addRecord/teacher_addRecord.js
const app = getApp()
Page({

  // 学员id
  sid: null,

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
    // 学员名字
    studentName: '',
    // 今日日期
    date: '',
    // 日志类型数组
    typeList: [],

    // 选中的日志类型 索引
    selectedTypeIndex: null,
    // 是否展示消课
    showClearCourseHour: false,
    // 是否消课
    clearCourseHour: false,
    // 消课课时
    clearCourseHourCount_pointLeft: '2',
    clearCourseHourCount_pointRight: "0",
    clearCourseHourCount_pointLeft_index: 1,
    clearCourseHourCount_pointRight_index: 0,
    // 是否展示 课时选择器
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
    this.setUpInitialData(options)
    this.getSystemSize()
    this.getRecordTagList()
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

  /**
   * 处理初始化数据
  */
  setUpInitialData: function(options) {
    let nowDate = new Date()
    let nowDateStr = app.util.customFormatTimeByDate(nowDate, 'yyyy/MM/dd')
    this.sid = options.sid,
    this.setData({
      studentName: options.studentname,
      date: nowDateStr
    })
  },

  /**
   * 判断是否展示 消课视图
  */
  ifShowClearHourView: function() {
    let selectedTag = this.data.typeList[this.data.selectedTypeIndex]
    if (selectedTag.iscosttime == 1) {
      let defaultHour =selectedTag.num*1
      let pointLeft = parseInt(defaultHour)
      let pointRight = (defaultHour - pointLeft)*10

      let leftIndex = pointLeft-1
      let rightIndex = pointRight == 5 ? 1: 0
      this.setData({
        showClearCourseHour: true,
        clearCourseHour: false,
        clearCourseHourCount_pointLeft: String(pointLeft),
        clearCourseHourCount_pointRight: String(pointRight),
        clearCourseHourCount_pointLeft_index: leftIndex,
        clearCourseHourCount_pointRight_index: rightIndex,
      })
    } else {
      this.setData({
        showClearCourseHour: false,
        clearCourseHour: false,
      })
    }
  },

  /**
   * 添加附件
  */
  appendFile: function(url) {
    console.log("得到附件：",url)
    let urlPartArray = url.split('.')
    if (urlPartArray.length >= 2) {
      let fileTypeStr = urlPartArray[urlPartArray.length-1]
      let fileType = 'video'
      if (fileTypeStr == 'png' || fileTypeStr == 'jpg' || fileTypeStr == 'jpeg') {
        fileType = 'image'
      }
      let file = {
        type: fileType,
        serverPath: url
      }
      if (file.type == 'image') {
        this.data.files.push(file)
      } else {
        this.data.files.unshift(file)
      }
      
      this.setData({
        files: this.data.files
      })
    }
  },

  //--------------------------------------------------------接口---------------------------------------------------
  /**
   * 上传图片
  */
  recordUploadFile: function(file) {
    let that = this
    var filePath = file.tempFilePath
    app.ols.recordUploadFile(filePath).then(d=>{
      if (d.code == 0) {
        file.serverPath = d.data.file
        if(file.type == "video") {
          that.data.files.unshift(file)
        } else {
          that.data.files.push(file)
        }
        that.setData({
          files: that.data.files
        })
      }
    })
  },

  /**
   * 获取日志标签列表
  */
  getRecordTagList: function() {
    let param = {
      token: wx.getStorageSync('token')
    }
    let that = this
    app.ols.getReocrdTagList(param).then(d=>{
      if (d.data.code == 0) {
        let tagList = d.data.data.data
        for(var i = 0; i < tagList.length; i++) {
          let tag = tagList[i]
          // 默认未选中
          tag.selected = false
        }
        that.setData({
          typeList: tagList
        })
      }
    })
  },

  /**
   * 提交接口
  */
  submit: function(callback) {
    let content = this.data.content
    if (!content || content == '') {
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })
      return
    }
    if (this.data.selectedTypeIndex == null) {
      wx.showToast({
        title: '请选择日志类型',
        icon: 'none'
      })
      return
    }
    let tag = this.data.typeList[this.data.selectedTypeIndex]
    let param = {
      token: wx.getStorageSync('token'),
      sid: this.sid,
      tid: tag.id,
      content: content,
    }

    if (this.data.files && this.data.files.length != 0) {
      let file_url_string = ''
      for (var i = 0; i < this.data.files.length; i++) {
        let file = this.data.files[i]
        if (i == 0) {
          file_url_string = file.serverPath
        } else {
          file_url_string = file_url_string + "," + file.serverPath
        }
      }
      param.file_urls_string = file_url_string
    }
    if (this.data.clearCourseHour) {
      param.num = this.data.clearCourseHourCount_pointLeft + '.' + this.data.clearCourseHourCount_pointRight
    }
    app.ols.submitReocrd(param).then(d=>{
      if (d.data.code == 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'none'
        })
        typeof callback == "function" && callback()
      }
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
    // 判断是否展示消课
    this.ifShowClearHourView()
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
    if (!this.data.clearCourseHour) {
      return
    }
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
    wx.navigateTo({
      url: app.getPagePath('uploadVideo'),
    })
    return
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
    // return
    let index = e.currentTarget.dataset.index
    let file = this.data.files[index]
    let sourse = {
      url: file.serverPath,
      type: file.type,
    }
    // if (file.type == 'video') {
    //   sourse.poster = file.thumbTempFilePath
    // }
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
    this.submit(function (){
      wx.navigateBack({
        delta: 0,
      })
    })
  }
})