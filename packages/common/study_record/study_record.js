

// pages/study_record/study_record.js
const app = getApp()
Page({

  // 是否正在执行中
  Loading: false,
  // 即将删除评论的日志索引
  willDeleteReocrdIndex: null,
  // 即将删除评论的索引
  willDeleteCommentIndex: null,

  // 选中的天 0000-00-00
  selectedDayStr: '',
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
    // 当前角色 1-学生 2-家长 3-老师
    role: 1,
    // 是否展示学生日志页面内容
    showContent: false,

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
      avatar: '/images/defaultHead/my_head.png',
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

    // 日志列表 是否正在下拉刷新
    recordListPullRefershing: false,

    // 消课记录列表 是否正在下拉刷新
    clearListPullRefershing: false,

    // 7v1介绍 h5地址
    url7v1: null,

    // 评论输入框 获取聚焦
    commentFocus: false,
    // 即将评论的
    commentRecordIndex: null,
    // 评论类型 1-评论 2-回复
    commentType: 1,
    // 评论内容
    commentContent: '',
    // 即将回复的评论索引
    commentReplyIndex: null,

    // 评论删除按钮 bottom
    deleteCommentButtonBottom: 0,
    // 是否展示删除按钮
    deleteButtonShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sid = options.sid
    this.getSystemSize()
    let userinfo = wx.getStorageSync('userinfo')
    this.setData({
      role: wx.getStorageSync('role'),
      uid: userinfo.id
    })
    let that = this
    this.relationWithStudent(function(show){
      if (show) {
        // 展示日志页面
        that.getStudentInfo()
      } else {
        // 展示7v1介绍图片
        let url7v1 = app.ols.get7v1Intro_h5() + "?timestamp=" + (new Date()).getTime()
        that.setData({
          url7v1: url7v1
        })
      }
    })
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
    let paramStr = 'sid='+this.sid
    return app.shareTool.getShareReturnInfo('1,2,3', 'study_record', paramStr, this.shareImagePath ? this.shareImagePath : '', '查看日志')
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
    ctx.drawImage('./resource/record_share.png', 0, 0, 421, 338)

    // 学生名字
    ctx.setTextAlign('center')
    ctx.setFillStyle('#FFFFFF')
    ctx.setFontSize(26)
    ctx.fillText(this.data.studentInfo.name + "的学习日志", 421/2.0, 62, 280)
    ctx.stroke()

    if (this.newRecord != null) {

      // 时间图标
      ctx.drawImage('./resource/record_lock.png', 51, 124, 22, 22)

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
      ctx.drawImage('./resource/share_noRecord.png', 94, 152, 234, 94)
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

  /**
   * 关闭评论删除按钮
  */
  closeReplayDeleteButton: function() {
    if (this.willDeleteReocrdIndex == null) {
      return
    }
    let commentSelectedStr = 'recordList[' + this.willDeleteReocrdIndex + "].comment[" + this.willDeleteCommentIndex + "].selected"
    this.setData({
      deleteButtonShow: false,
      deleteCommentButtonBottom: 0,
      [commentSelectedStr]: false,
    })
    this.willDeleteCommentIndex = null
    this.willDeleteReocrdIndex = null
  },

  //--------------------------------------------------------接口--------------------------------------------------
  /**
   * 获取学生某一天的日志列表
   * 参数：
   *    riqi：日期：0000-00-00
  */
  getStudentRecordList: function(riqi, callback) {
    let params = {
      token: wx.getStorageSync('token'),
      sid: this.sid,
      riqi: riqi,
      num: this.pageData.perpage,
      page: this.pageData.page
    }
    let that = this
    app.ols.getStudentRecordListByDay(params).then(d=>{
      if (d.data.code == 0) {
        let recordArray = d.data.data.data

        // 遍历日志列表
        for(var i = 0; i < recordArray.length; i++) {
          let record = recordArray[i]
          // 处理附件
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
          // 老师更多功能按钮默认关闭
          if (that.data.role == 3) {
            record.showMoreAction = false
          }
        }
        // 分页数据处理
        let newRecordArray = []
        if(that.pageData.page == 1) {
          newRecordArray = recordArray
        } else {
          newRecordArray = that.data.recordList.concat(recordArray)
        }

        // 判断是否可以加在下一页
        if (!recordArray || recordArray == '' || recordArray.length < that.pageData.perpage) {
          that.pageData.canLoadNextPage = false
        } else {
          that.pageData.canLoadNextPage = true
        }
        that.setData({
          recordList: newRecordArray
        })
        typeof callback == "function" && callback(true)
      } else if (d.data.code == 5) {
        if (that.pageData.page == 1) {
          this.setData({
            recordList: []
          })
        }
        that.pageData.canLoadNextPage = false
        typeof callback == "function" && callback(false)
      } else {
        if (that.pageData.page == 1) {
          this.setData({
            recordList: []
          })
        }
        typeof callback == "function" && callback(false)
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
            avatar: studentInfo.avatar && studentInfo.avatar != '' ? studentInfo.avatar : '/images/defaultHead/my_head.png',
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
        // 处理分页数据
        let newList = []
        if (that.pageData.clearPage == 1) {
          newList = clearList
        } else {
          newList = that.data.clearList.concat(clearList)
        }
        // 判断是否可以加载下一页
        if (!clearList || clearList == '' || clearList.length < that.pageData.clearPerpage) {
          that.pageData.clearCanLoadNextPage = false
        } else {
          that.pageData.clearCanLoadNextPage = true
        }
        that.setData({
          clearList: newList
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

  /**
   * 判断登录用户与该学生之间是否有关系
  */
  relationWithStudent: function(callback) {
    let params ={
      token: wx.getStorageSync('token'),
      sid: this.sid
    }
    let that = this
    app.ols.haveRelationWithStudent(params).then(d=>{
      if (d.data.code == 0) {
        let relation = d.data.data.relation
        if (relation) {
          that.setData({
            showContent: true
          })
          typeof callback == 'function' && callback(true)
        } else {
          typeof callback == 'function' && callback(false)
        }
      } else {
        typeof callback == 'function' && callback(false)
      }
    })
  },

  /**
   * 评论/回复 接口
  */
  commentOrReplySubmit: function() {
    let record = this.data.recordList[this.data.commentRecordIndex]
    let params = {
      token: wx.getStorageSync('token'),
      logid: record.id,
      content: this.data.commentContent,
      touid: this.data.commentType == 1 ? "0" : record.comment[this.data.commentReplyIndex].uid
    }
    let that = this
    app.ols.commentOrReplyStudyReocrd(params).then(d=>{
      if (d.data.code == 0) {
        let comment = d.data.data
        record.comment.push(comment)
        let commnetStr = 'recordList[' + that.data.commentRecordIndex + '].comment'
        that.setData({
          [commnetStr]: record.comment
        })
      }
    })
  },

  /**
   * 删除评论/回复 接口
  */
  deleteCommnet: function(id, callback) {
    let params = {
      token: wx.getStorageSync('token'),
      id: id
    }
    let that = this
    app.ols.deleteStudyReocrdComment(params).then(d=>{
      if (d.data.code == 0) {
        typeof callback == 'function' && callback(true)
      } else {
        typeof callback == 'function' && callback(false)
      }
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
    this.selectedDayStr = dateStr
    this.pageData.page = 1
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
    // console.log(e)
    let recordIndex = e.currentTarget.dataset.recordindex
    let fileIndex = e.currentTarget.dataset.fileindex
    let record = this.data.recordList[recordIndex]
    let selectedFile = record.file[fileIndex]
    if (selectedFile.error) {
      return
    }
    if(wx.previewMedia) {
      // 支持previewMidia
      wx.previewMedia({
        sources: record.file,
        current: fileIndex,
        // showmenu: true,
        fail(res) {
          wx.showToast({
            title: '预览附件失败',
            icon: 'none'
          })
        }
      })
    } else {
      // 不支持previewMidia
      if (selectedFile.type == 'image') {
        // 图片
        let image_urls = []
        for(var i = 0; i < record.file.length; i++) {
          let file = record.file[i]
          if (file.type == 'image') {
            image_urls.push(file.url)
          }
        }
        wx.previewImage({
          urls: image_urls,
          current: selectedFile.url
        })
      } else {
        // 视频
        wx.navigateTo({
          url: app.getPagePath('videoPlay'),
          success (res) {
            res.eventChannel.emit('videoPlay', {url:selectedFile.url})
          }
        })
      }
    }
    
      // if (wx.previewMedia) {
      //   wx.previewMedia({
      //     sources: [{url: selectedFile.url, type: 'video'}],
      //   })
      // } else {
      //   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      //   wx.showModal({
      //     title: '提示',
      //     content: '当前微信版本过低，无法播放该视频，请升级到最新微信版本后重试。',
      //     success (res) {
      //       if (res.confirm) {
      //         console.log('用户点击确定')
      //         wx.updateWeChatApp()
      //       } else if (res.cancel) {
      //         console.log('用户点击取消')
      //       }
      //     }
      //   })
      // }
  },

  /**
   * 日志列表 下拉刷新
  */
  pullRefresh: function(res) {
    // console.log('触发下拉刷新')
    this.pageData.page = 1
    let that = this
    this.getStudentRecordList(this.selectedDayStr, function(success){
      that.setData({
        recordListPullRefershing : false
      })
    })
  },

  /**
   * 日志列表滚动到底部
  */
  recordListScrollReachBottom: function() {
    if (!this.pageData.canLoadNextPage) {
      return
    }
    let oldPage = this.pageData.page
    this.pageData.page += 1
    let that = this
    this.getStudentRecordList(this.selectedDayStr, function(success){
      if (!success) {
        that.pageData.page = oldPage
      }
    })
  }, 

  /**
   * 消课记录列表 下拉刷新
  */
  clearListPullRefresh: function() {
    let oldPage = this.pageData.clearPage
    this.pageData.clearPage = 1
    let that = this
    this.getClearList(function(success){
      that.setData({
        clearListPullRefershing: false
      })
      if (!success){
        that.pageData.clearPage = oldPage
      }
    })
  },

  /**
   * 消课记录列表 上拉加载
  */
  clearListReachBottom: function() {
    if (!this.pageData.clearCanLoadNextPage) {
      return
    }
    let oldPage = this.pageData.clearPage
    this.pageData.clearPage += 1
    let that = this
    this.getClearList(function(success){
      if (!success){
        that.pageData.clearPage = oldPage
      }
    })
  },

  /**
   * 视频播放出错
  */
  videoPlayError: function(e) {
    let fileIndex = e.currentTarget.dataset.index
    let recordIndex = e.currentTarget.dataset.recordindex

    let recordFileStr = "recordList[" + recordIndex + "].file["+fileIndex+"].error"
    this.setData({
      [recordFileStr]: true
    })
  },


  /**
   * 日志单元格 展示更多功能按钮（老师） 点击事件
  */
  moreActionButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.recordList[index]
    let showMoreActionStr = 'recordList[' + index + '].showMoreAction'
    this.setData({
      [showMoreActionStr] : record.showMoreAction ? false : true
    })
  },

  /**
   * 日志单元格 点评按钮 点击事件
  */
  evaluateButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.recordList[index]
    wx.navigateTo({
      url: app.getPagePath('record_evaluate') + "?logid=" + record.id + '&studentname=' + this.data.studentInfo.name + '&type=1',
    })
  },

  /**
   * 日志单元格 批改按钮 点击事件
  */
  checkButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.recordList[index]
    wx.showToast({
      title: '功能开发中, 敬请期待',
      icon: 'none'
    })
  },

  /**
   * 日志单元格 评论按钮 点击事件
  */
  commentButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    // let record = this.data.recordList[index]
    this.setData({
      commentFocus: true,
      commentRecordIndex: index,
      commentType: 1,
      commentContent: '',
      commentReplyIndex: null,
    })
  },

  /**
   * 日志单元格 点评展开/收回按钮 点击事件
  */
  evaluateOpenButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.recordList[index]
    let score = record.score[0]
    let openStr = 'recordList[' + index + '].score[0].open'
    this.setData({
      [openStr]: score.open ? false : true
    })
    this.closeReplayDeleteButton()
  },

  /**
   * 日志单元格 点评修改按钮 点击事件
  */
  evaluateChangeButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let record = this.data.recordList[index]
    wx.navigateTo({
      url: app.getPagePath('record_evaluate') + "?logid=" + record.id + '&studentname=' + this.data.studentInfo.name + '&type=2',
    })
  },

  /**
   * 评论输入框 失去聚焦
  */
  commentCancelInput: function(){
    this.setData({
      commentFocus: false,
    })
  },

  /**
   * 评论输入框 输入
  */
  commentInputChange: function(e) {
    let value = e.detail.value
    // var regStr = /([\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|[\u3030])[ ]?/gi; 
    // value = value.replace(regStr, "")
    if (value == ' ') {
      value = ''
    }
    this.setData({
      commentContent: value
    })
  },

  /**
   * 评论输入框 提交按钮
  */
  commentInputConfirmButtonClciked: function() {
    if(this.data.commentContent.length == 0) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    this.commentOrReplySubmit()
  },


  /**
   * 评论单元格 点击事件
  */
  replyCellClciked: function(e) {
    let reocrdIndex = e.currentTarget.dataset.index
    let commentIndex = e.currentTarget.dataset.commentindex
    let record = this.data.recordList[reocrdIndex]
    let comment = record.comment[commentIndex]
    let userinfo = wx.getStorageSync('userinfo')
    // 自己不能回复自己
    if (comment.uid == userinfo.id) {
      return
    }
    this.setData({
      commentFocus: true,
      commentRecordIndex: reocrdIndex,
      commentType: 2,
      commentContent: '',
      commentReplyIndex: commentIndex
    })
  },

  /**
   * 评论单元格 长按事件
  */
  replayCellLongTap: function(e) {

    let reocrdIndex = e.currentTarget.dataset.index
    let commentIndex = e.currentTarget.dataset.commentindex
    let record = this.data.recordList[reocrdIndex]
    let comment = record.comment[commentIndex]

    let canDelete = false
    if (this.data.role == 3) {
      // 老师
      canDelete = true
    } else {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo.id == comment.uid) {
        // 自己发的评论/回复
        canDelete = true
      }
    }
    if(!canDelete) {
      return
    }

    this.willDeleteReocrdIndex = reocrdIndex
    this.willDeleteCommentIndex = commentIndex

    let pageItemId = "#record" + reocrdIndex + "_replyCell" + commentIndex
    let commentSelectedStr = 'recordList[' + reocrdIndex + "].comment[" + commentIndex + "].selected"
    var query = wx.createSelectorQuery();
    var that = this;
    query.select(pageItemId).boundingClientRect(function (rect) {
      let top = rect.top
      console.log('top:', top)
      that.setData({
        deleteCommentButtonBottom: that.data.screenHeight - top,
        deleteButtonShow: true,
        [commentSelectedStr] : true,
      })
    }).exec()
  },

  /**
   * 评论删除按钮 点击事件
  */
  deleteCommentButtonClciked: function() {
    if(this.Loading) {
      return
    }
    this.Loading = true
    
    let that = this
    let reocrdIndex = this.willDeleteReocrdIndex
    let commentIndex = this.willDeleteCommentIndex
    let record = this.data.recordList[reocrdIndex]
    let comment = record.comment[commentIndex]

    this.closeReplayDeleteButton()

    let canDelete = false
    if (this.data.role == 3) {
      // 老师
      canDelete = true
    } else {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo.id == comment.uid) {
        // 自己发的评论/回复
        canDelete = true
      }
    }

    if (canDelete) {
      this.deleteCommnet(comment.id, function(success){
        let commentList = record.comment
        commentList.splice(commentIndex, 1)
        let commentStr = 'recordList[' + reocrdIndex + '].comment'
        that.setData({
          [commentStr]: commentList
        })
        that.Loading = false
      })
    }
  },

  /**
   * 背景视图 点击事件
  */
  backgroundClciked: function() {
    this.closeReplayDeleteButton()
  },

  /**
   * 滚动控件 滚动事件
  */
  srcollViewScroll: function() {
    this.closeReplayDeleteButton()
  }
})