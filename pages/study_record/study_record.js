const ols = require("../../utils/ols")

// pages/study_record/study_record.js
const app = getApp()
Page({

  // 最新日志
  newRecord: null,

  // 分享图片的路径
  shareImagePath: '',

  // 分页数据
  pageData: {
    // 日志列表分页数据
    page: 1,
    perpage: 5,
    canLoadNextPage: false,

    // 消课记录分页数据
    clearPage: 1,
    clearPerpage: 10,
    clearCanLoadNextPage: false,
  },

  // 学生ID
  sid: null,

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

    // 日期打点数据
    dots:[],

    // 学生信息
    studentInfo: {
      avatar: '../../images/my_head.png',
      name: '',
      total_coursetime: 0,
      left_coursetime: 0,
    },

    // 是否展示消课记录弹框
    showClearHourView: false,

    // 销课记录列表
    clearList: [],

    // 是否展示画布，生成分享图片
    showCanvas: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sid = options.sid
    this.getSystemSize()
    this.getStudentInfo()
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
    let shareInfo = {
      title: '查看日志',
      path: '/pages/study_record/study_record?sid='+this.sid,
      success (res) {
        console.log('转发成功', res)
      },
      fail (res) {
        console.log('转发失败', res)
      }
    }
    if (this.shareImagePath && this.shareImagePath != '') {
      shareInfo.imageUrl = this.shareImagePath
    }
    return shareInfo
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

  /**
   * 绘制分享图片
  */
  drawShareImage: function () {
    this.setData({
      showCanvas: true
    })
    const ctx = wx.createCanvasContext('shareCanvas')
    // 底图
    ctx.drawImage('../../images/study_record/record_share.png', 0, 0, 421, 338)

    // 学生名字
    ctx.setTextAlign('center')
    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(26)
    ctx.fillText(this.data.studentInfo.name + "的学习日志", 421/2.0, 62, 280)
    ctx.stroke()

    if (this.newRecord != null) {

      // 时间图标
      ctx.drawImage('../../images/study_record/record_lock.png', 51, 124, 22, 22)

      // 时间
      ctx.setTextAlign('left')
      ctx.setFillStyle('#AF5800')
      ctx.setFontSize(24)
      ctx.fillText(this.newRecord.timeStr, 80, 143, 280)
      ctx.stroke()

      // 详情
      ctx.setTextAlign('left')
      ctx.setFillStyle('#000934')
      ctx.setFontSize(24)
      var chr = this.newRecord.memo.split("")
      var row = []
      var temp = ""
      for(var i = 0; i < chr.length; i++) {
        if( ctx.measureText(temp).width < 326 && ctx.measureText(temp+(chr[i])).width <= 326){
          temp += chr[i];
        }//context.measureText(text).width  测量文本text的宽度
        else{
          if (row.length == 1) {
            temp = temp + '...'
          }
          row.push(temp);
          if (row.length == 2){
            break
          }
          temp = chr[i];
        }
      }
      if (row.length < 2) {
        row.push(temp);
      }
      for(var b = 0; b < row.length; b++){
        ctx.fillText(row[b],48,168+(b+1)*36, 326);//字体20，间隔24。类似行高
      }
      // ctx.fillText(this.newRecord.memo, 48, 192, 326)
      ctx.stroke()
    } else {
      // 空页面
      ctx.drawImage('../../images/study_record/share_noRecord.png', 94, 152, 234, 94)
    }

    let that = this
    ctx.draw(false, function(e) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 421,
        height: 338,
        canvasId: 'shareCanvas',
        success(res) {
          // console.log(res.tempFilePath)
          that.shareImagePath = res.tempFilePath
          that.setData({
            showCanvas: false
          })
        },
        fail (res) {
          that.setData({
            showCanvas: false
          })
        }
      })
    })

  },

  //--------------------------------------------------------接口--------------------------------------------------
  /**
   * 获取学生某一天的日志列表
   * 参数：
   *    riqi：日期：0000-00-00
  */
  getStudentRecordList: function(riqi) {
    let params = {
      token: wx.getStorageSync('token'),
      sid: this.sid,
      riqi: riqi,
      num: this.pageData.perpage,
      pager: this.pageData.page
    }
    let that = this
    app.ols.getStudentRecordListByDay(params).then(d=>{
      if (d.data.code == 0) {
        let recordArray = d.data.data.data
        for(var i = 0; i < recordArray.length; i++) {
          let record = recordArray[i]
          if (record.file && record.file != '' && record.file.length != 0) {
            let fileItemArray = []
            for (var j = 0; j < record.file.length; j++) {
              let filePath = record.file[j]
              let filePathArray = filePath.split('.')
              if (filePathArray.length >= 2) {
                let fileTypeStr = filePathArray[filePathArray.length-1]
                let fileType = 'video'
                if (fileTypeStr == 'png' || fileTypeStr == 'jpg' || fileTypeStr == 'jpeg') {
                  fileType = 'image'
                }
                fileItemArray.push({
                  url: filePath,
                  type: fileType
                })
              }
            }
            record.file = fileItemArray
          }
        }
        that.setData({
          recordList: recordArray
        })
      } else {
        if (that.pageData.page == 1) {
          this.setData({
            recordList: []
          })
        }
      }
    })
  },

  /**
   * 查看某个时间段内每一天是否有学习日志
   * 参数：
   *   beginriqi：开始日期 0000-00-00
   *   endriqi：结束日期 0000-00-00
  */
  getrecordStuatusList: function(beginriqi, endriqi) {
    let params = {
      token: wx.getStorageSync('token'),
      sid: this.sid,
      beginriqi: beginriqi,
      endriqi: endriqi
    }
    let that = this
    app.ols.getPeriodRecordStatusList(params).then(d=>{
      let dots = []
      if (d.data.code == 0) {
        let data = d.data.data
        let dotDateArray = data.data
        if (dotDateArray && dotDateArray != '' && dotDateArray.length != 0) {
          for (var i = 0; i < dotDateArray.length; i++) {
            let dateStr = dotDateArray[i]
            dots.push({
              riqi: dateStr,
              type: 1
            })
          }
        }
      }
      that.setData({
        dots: dots
      })
    })
  },

  /**
   * 获取学生课时信息
  */
  getStudentInfo: function() {
    let params = {
      token: wx.getStorageSync('token'),
      sid: this.sid
    }
    let that = this
    app.ols.getStudentCourseHourInfo(params).then(d=>{
      if (d.data.code == 0) {
        let studentInfo = d.data.data.data
        if (studentInfo && studentInfo != '') {
          let info = {
            avatar: studentInfo.avatar && studentInfo.avatar != '' ? studentInfo.avatar : '../../images/my_head.png',
            name: studentInfo.nick,
            total_coursetime: studentInfo.total_coursetime,
            left_coursetime: studentInfo.coursetime*1,
          }
          that.setData({
            studentInfo: info
          })
        }
      }
      that.getStudentNewRecordInfo()
    })
  },

  /**
   * 获取消课记录列表
  */
  getClearList: function (callback) {
    let params = {
      token: wx.getStorageSync('token'),
      sid: this.sid,
      num: this.pageData.clearPerpage,
      page: this.pageData.clearPage
    }
    let that = this
    app.ols.getClearCourseHourList(params).then(d=>{
      if (d.data.code == 0) {
        let clearList = d.data.data.data
        that.setData({
          clearList: clearList
        })
        typeof callback == "function" && callback(true)
      } else {
        typeof callback == "function" && callback(false)
      }
    })
  },

  /**
   * 获取该学生最新的日志
  */
  getStudentNewRecordInfo: function() {
    let param = {
      token: wx.getStorageSync('token'),
      sid: this.sid,
    }
    let that = this
    app.ols.getStudentNewRecord(param).then(d=>{
      if (d.data.code == 0) {
        let record = d.data.data.data
        if (record && record != '') {

          // 处理时间
          let nowDate = new Date()
          nowDate = nowDate.setHours(0, 0, 0, 0)
          let nowTimestamp = nowDate/1000
          let recordDate = new Date(record.createtime*1000)
          
          let recordTimeStr = ''
          if(record.createtime >= nowTimestamp && record.createtime < nowTimestamp + 24*60*60) {
            let createTimeStr = app.util.customFormatTimeByDate(recordDate, 'hh:mm')
            recordTimeStr = '今天  ' + createTimeStr
          } else if (record.createtime >= nowTimestamp - 24*60*60 && record.createtime < nowTimestamp) {
            let createTimeStr = app.util.customFormatTimeByDate(recordDate, 'hh:mm')
            recordTimeStr = '昨天  ' + createTimeStr
          } else {
            recordTimeStr = app.util.customFormatTimeByDate(recordDate, 'MM/dd  hh:mm')
          }
          record.timeStr = recordTimeStr
          that.newRecord = record
        }
      }
      that.drawShareImage()
    })
  },

  //------------------------------------------------------交互事件------------------------------------------------
  /**
   * 日历 天点击 回调
  */
  dayClicked: function(e) {
    if (!this.sid || this.sid == '') {
      return
    }
    // console.log("点击了天")
    // console.log(e)
    let dateStr = e.detail.dateStr
    this.getStudentRecordList(dateStr)
  },

  /**
   * 日历 日期范围改变 回调
  */
  datePeriodChange: function(e) {
    if (!this.sid || this.sid == '') {
      return
    }
    // console.log("日期区间改变")
    // console.log(e)
    let startDateStr = e.detail.startDate.dateStr
    let endDateStr = e.detail.endDate.dateStr
    this.getrecordStuatusList(startDateStr, endDateStr)
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
  },

  /**
   * 查看销课记录 按钮 点击事件
  */
  showClearCourseHourList: function() {
    let that = this
    this.pageData.clearPage = 1
    this.getClearList(function (success) {
      if (success) {
        that.setData({
          showClearHourView: true
        })
      }
    })
  },

  /**
   * 消课记录弹框 关闭按钮 点击事件
  */
  closeClearHourViewButtonClciked: function () {
    this.setData({
      showClearHourView: false
    })
  },

  /**
   * 附件 图片/视频 点击事件
  */
  fileClicked: function (e) {
    console.log(e)
    let recordIndex = e.currentTarget.dataset.recordindex
    let fileIndex = e.currentTarget.dataset.fileindex
    let record = this.data.recordList[recordIndex]
    let selectedFile = record.file[fileIndex]
    if (selectedFile.type == 'image') {
      // 图片
      wx.previewImage({
        urls: [selectedFile.url],
        current: selectedFile.url
      })
    } else {
      // 视频
    }
  }
})