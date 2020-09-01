

// pages/teacher_studentList/teacher_studentList.js
const app = getApp()

Page({

  // 是否是页面第一次出现
  firstShow: true,

  pageData: {
    page: 1,
    perpage: 10,
    canLoadNextPage: false,
  },

  /**
   * 页面的初始数据
   */
  data: {
    //学员列表
    studentList: [],

    // 表头是否悬停
    headerFixed: false,

    // 老师信息
    teacherUserinfo: {
      avatar: '/images/defaultHead/my_head.png',
      name: '',
    },

    // 年级样式
    gradeStyleDictionary: {
      "初一": {
        backgroundColor: '#ECE5FF',
        borderColor: '#8B60FF',
        textColor: '#8B60FF'
      },
      "初二": {
        backgroundColor: '#EBF8FF',
        borderColor: '#54C5FF',
        textColor: '#54C5FF'
      },
      "初三": {
        backgroundColor: '#FFEFE8',
        borderColor: '#FF4F01',
        textColor: '#FF4F01'
      },
      "高一": {
        backgroundColor: '#ECE5FF',
        borderColor: '#8B60FF',
        textColor: '#8B60FF'
      },
      "高二": {
        backgroundColor: '#EBF8FF',
        borderColor: '#54C5FF',
        textColor: '#54C5FF'
      },
      "高三": {
        backgroundColor: '#FFEFE8',
        borderColor: '#FF4F01',
        textColor: '#FF4F01'
      },
      "一年级": {
        backgroundColor: '#ECE5FF',
        borderColor: '#8B60FF',
        textColor: '#8B60FF'
      },
      "二年级": {
        backgroundColor: '#EBF8FF',
        borderColor: '#54C5FF',
        textColor: '#54C5FF'
      },
      "三年级": {
        backgroundColor: '#FFEFE8',
        borderColor: '#FF4F01',
        textColor: '#FF4F01'
      },
      "四年级": {
        backgroundColor: '#EFFFFB',
        borderColor: '#47D4AD',
        textColor: '#47D4AD'
      },
      "五年级": {
        backgroundColor: '#FFFAE8',
        borderColor: '#EBC034',
        textColor: '#EBC034'
      },
      "六年级": {
        backgroundColor: '#FFF2F6',
        borderColor: '#EB5D84',
        textColor: '#FE5281'
      },
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options = app.shareTool.getShareOption()
    
    let that = this
    this.getSystemSize()
    this.setUserInfo()

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
    let that = this
    this.pageData.page = 1
    this.teacherGetStudentList()
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
    app.notificationCenter.removeNotification(app.notiNameDic.userinfoChange, this)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let oldPage = this.pageData.page
    this.pageData.page = 1
    let that = this
    this.teacherGetStudentList(function(success){
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
      if (!success) {
        that.pageData.page = oldPage
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.pageData.canLoadNextPage) {
      return
    }
    let oldPage = this.pageData.page
    this.pageData.page += 1
    let that = this
    this.teacherGetStudentList(function(success){
      if (!success) {
        that.pageData.page = oldPage
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.shareTool.getShareReturnInfo('all', 'first_page','','/images/other/share1.png', '领军网校')
  },

  // 页面滚动时触发
  onPageScroll: function (e) {
    // console.log(e)
    let scrollTopConstant = e.scrollTop
    if (scrollTopConstant >= this.data.headerTop && !this.data.headerFixed) {
      this.setData({
        headerFixed: true
      })
      // console.log("悬停")
    } else if (scrollTopConstant < this.data.headerTop && this.data.headerFixed) {
      this.setData({
        headerFixed: false
      })
      // console.log("不悬停")
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

  /**
   * 给页面data设置用户信息
  */
  setUserInfo: function() {
    let userinfo = wx.getStorageSync('userinfo')
    let teacherUserInfo = {
      avatar: userinfo.avatar && userinfo.avatar != '' ? userinfo.avatar : '/images/defaultHead/my_head.png',
      name: userinfo.nick
    }
    this.setData({
      teacherUserinfo: teacherUserInfo,
    })

    let that = this
    app.notificationCenter.addNotification(app.notiNameDic.userinfoChange, function(userinfo){
      console.log('用户信息改变:\n', userinfo)
      that.setData({
        teacherUserinfo: {
          avatar: userinfo.avatar,
          name: userinfo.nick
        }
      })
      app.notificationCenter.removeNotification(app.notiNameDic.userinfoChange, that)
    }, this)
  },

  //--------------------------------------------------接口-------------------------------------
  /**
   * 老师端获取学员列表
  */
  teacherGetStudentList: function(callback) {
    let param = {
      token: wx.getStorageSync('token'),
      num: this.pageData.perpage,
      page: this.pageData.page,
    }
    let that = this
    app.ols.teacherGetStudentsList(param).then(d=>{
      let code = d.data.code
      if(code == 0) {
        let studentList = d.data.data.data
        // 分页处理
        var newList = []
        if (that.pageData.page == 1) {
          newList = studentList
        } else {
          newList = that.data.studentList.concat(studentList)
        }
        // 判断是否可以加载下一页
        if (!studentList || studentList == '' || studentList.length < that.pageData.perpage) {
          that.pageData.canLoadNextPage = false
        } else {
          that.pageData.canLoadNextPage = true
        }
        that.setData({
          studentList: newList
        })
        // 第一次加载 若有学员 计算表头高度
        if (studentList && studentList.length != 0) {
          if (that.firstShow) {
            that.getStudentListHeaderTop()
            that.firstShow = false
          }
        }
        typeof callback == "function" && callback(true)
      } else {
        if (that.pageData.page == 1) {
          that.setData({
            studentList: []
          })
        }
        typeof callback == "function" && callback(false)
      }
    })
  },

  //-------------------------------------------------交互事件-----------------------------------
  /**
   * 学员添加日志按钮 点击事件
  */
  addRecordButtonClciked: function(e){
    // console.log(e)
    let index = e.currentTarget.dataset.index
    let student = this.data.studentList[index]
    wx.navigateTo({
      url: app.getPagePath('teacher_addRecord') + '?sid='+student.sid+"&studentname="+student.nick,
    })
  },

  /**
   * 学员列表单元格 点击事件
  */
  studentCellClicked: function (e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
    let student = this.data.studentList[index]
    wx.navigateTo({
      url: app.getPagePath('study_record') + '?sid='+student.sid,
    })
  }
})