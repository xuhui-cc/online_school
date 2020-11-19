// packages/teacher/teacher_rightList/teacher_rightList.js
let app = getApp()
Page({

  // 选中分享的权益包
  selectedRight: null,

  // 分享的卡片路径
  shareImagePath: '',

  pageData: {
    perpage: 10,
    page: 1,
    canLoadNextPage: false,
  },

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * open_log: 0-没有学习日志功能  1-有学习日志功能
     * valid_days：有效期天数  0-永久有效
    */
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemSize()
    this.getRightList()

    wx.hideShareMenu({
      success: (res) => {},
    })
    wx.updateShareMenu({
      withShareTicket: true,
      isPrivateMessage: true
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
    this.pageData.page = 1
    this.getRightList(function(success){
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
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
    this.getRightList(function(success){
      if (!success) {
        that.pageData.page = oldPage
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.setData({
      showSureView: false
    })
    let paramsStr = 'id='+this.selectedRight.id
    return app.shareTool.getShareReturnInfo('all', 'rightCardDetail', paramsStr, this.shareImagePath, '分享权益包')
  },
  //----------------------------------------------私有方法----------------------------------------------------
  /**
   * 获取系统辅助尺寸
  */
  getSystemSize: function() {
    let systemInfo = wx.getSystemInfoSync()
    let menuBound = wx.getMenuButtonBoundingClientRect()
    
    let naviHeight = menuBound.bottom + 10
    let naviContentHeight = naviHeight - systemInfo.statusBarHeight
    let safeAreaBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom
    this.setData({
      naviHeight: naviHeight,
      naviContentHeight: naviContentHeight,
      safeAreaBottom: safeAreaBottom
    })
  },

  /**
   * 绘制分享图片
  */
  drawShareImage: function (callback) {
    this.setData({
      showCanvas: true
    })
    const ctx = wx.createCanvasContext('shareCanvas')
    // 底图
    ctx.drawImage('./resource/share_img.png', 0, 0, 421, 338)

    // 名字
    ctx.setTextAlign('left')
    ctx.setFillStyle('#0A0A0A')
    ctx.setFontSize(32)
    ctx.fillText(this.selectedRight.title, 37, 83, 347)
    ctx.stroke()

    // 课程权益

      // point
      ctx.drawImage('./resource/right_point.png', 37, 118, 16.49, 19.57)

      // 名字
      ctx.setTextAlign('left')
      ctx.setFillStyle('#6A6A6A')
      ctx.setFontSize(24)
      ctx.fillText('课程权益', 65, 140)
      ctx.stroke()

      // 数量
      ctx.setTextAlign('left')
      ctx.setFillStyle('#FF9A02')
      ctx.setFontSize(28)
      ctx.fillText(this.selectedRight.lesson_num + '门', 186, 143.5)
      ctx.stroke()

    // 优惠券
      // point
      ctx.drawImage('./resource/right_point.png', 37, 170, 16.49, 19.57)

      // 名字
      ctx.setTextAlign('left')
      ctx.setFillStyle('#6A6A6A')
      ctx.setFontSize(24)
      ctx.fillText('优惠券', 65, 192)
      ctx.stroke()

      // 数量
      ctx.setTextAlign('left')
      ctx.setFillStyle('#FF9A02')
      ctx.setFontSize(28)
      ctx.fillText(this.selectedRight.coupon_num + '张', 186, 194)
      ctx.stroke()

    // 立即领取
    ctx.drawImage('./resource/share_getButton.png', 2, 207, 255, 128)

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
          // that.shareImagePath = res.tempFilePath
          that.setData({
            showCanvas: false
          })
          typeof callback == 'function' && callback(true, res.tempFilePath)
        },
        fail (res) {
          that.setData({
            showCanvas: false
          })
          typeof callback == 'function' && callback(false, '')
        }
      })
    })

  },

  //------------------------------------------------接口------------------------------------------------------
  /**
   * 获取权益包列表
  */
  getRightList: function(callback) {
    let params = {
      token: wx.getStorageSync('token'),
      num: this.pageData.perpage,
      page: this.pageData.page
    }
    let that = this
    app.ols.getTeacherRightList(params).then(d=>{
      if (d.data.code == 0) {
        let rightList = d.data.data.lists
        for (var i = 0; i < rightList.length; i++) {
          let right = rightList[i]
          // 拆分课程ID
          // if (vip.course_ids) {
          //   vip.courses = vip.course_ids.split(',')
          // } else {
          //   vip.courses = []
          // }
          // 拆分优惠券ID
          // if (vip.coupon_id) {
          //   vip.coupons = vip.coupon_id.split(',')
          // } else {
          //   vip.coupons = []
          // }
        }
        if (rightList.length < that.pageData.perpage) {
          that.pageData.canLoadNextPage = false
        } else {
          that.pageData.canLoadNextPage = true
        }
        let newList = []
        if (that.pageData.page == 1) {
          newList = rightList
        } else {
          newList = that.data.list.concat(rightList)
        }
        that.setData({
          list: newList
        })
        typeof callback == 'function' && callback(true)
      } else {
        if (that.pageData.page == 1) {
          that.setData({
            list: [],
          })
        }
        typeof callback == 'function' && callback(false)
      }
    })
  },

  //-----------------------------------------------交互事件----------------------------------------------------
  /**
   * 导航栏 返回按钮 点击事件
  */
  backItemClciked: function() {
    wx.navigateBack()
  },

  /**
   * 查看详情按钮 点击事件
  */
  showDetailButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let right = this.data.list[index]
    wx.navigateTo({
      url: app.getPagePath('rightCardDetail') + '?id='+right.id,
    })
  },

  /**
   * 去分享 按钮 点击事件
  */
  shareButtonClciked: function(e) {
    let index = e.currentTarget.dataset.index
    let right = this.data.list[index]
    this.selectedRight = right
    let that = this
    wx.showLoading({
      title: '分享图片生成中...',
    })
    this.drawShareImage(function(success, imagePath){
      wx.hideLoading({
        success: (res) => {
          if (success) {
            that.shareImagePath = imagePath
            that.setData({
              showSureView: true
            })
          }
        },
      })
    })
  },

  /**
   * 确认弹框 取消按钮 点击事件
  */
  sureCancelViewClicked: function() {
    this.setData({
      showSureView: false
    })
  }
})