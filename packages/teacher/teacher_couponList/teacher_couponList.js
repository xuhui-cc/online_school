// packages/teacher/teacher_couponList/teacher_couponList.js
let app = getApp()
Page({

  // 选中去分享的优惠券
  selectedCoupon: null,

  // 分享卡片路径
  shareImagePath: '',

  // 分享图片生成中
  shareImage_creating: false,

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
    this.getCouponList()

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
    this.getCouponList(function(success){
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
    this.getCouponList(function(success){
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
    let userinfo = wx.getStorageSync('userinfo')
    let paramsStr = 'id='+this.selectedCoupon.id + '&gid=' + wx.getStorageSync('gid') + '&tid=' + userinfo.id
    return app.shareTool.getShareReturnInfo('all', 'couponDetail', paramsStr, this.shareImagePath, wx.getStorageSync('shareHead').coupon + this.selectedCoupon.title)
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
  drawShareImage: function (callback, count) {
    this.setData({
      showCanvas: true
    })
    const ctx = wx.createCanvasContext('shareCanvas')
    // 底图
    ctx.drawImage('./resource/share_img.png', 0, 0, 421, 338)

    // 名字
    ctx.setTextAlign('left')
    ctx.setTextAlign('center')
    ctx.setFillStyle('#0A0A0A')
    ctx.setFontSize(32)
    ctx.fillText(this.selectedCoupon.title, 210.5, 68.5, 361)
    ctx.stroke()

    // 有效期
    ctx.setTextAlign('left')
    ctx.setFillStyle('#AAAAAA')
    ctx.setTextAlign('center')
    ctx.setFontSize(24)
    ctx.fillText('领取后'+this.selectedCoupon.days+'天内有效', 210.5, 110.5, 361)
    ctx.stroke()

    // 价格
    ctx.setTextAlign('left')
    ctx.setFillStyle('#FF5327')
    ctx.setFontSize(40)
    ctx.fillText("¥", 105, 191)
    ctx.stroke()

    ctx.setTextAlign('left')
    ctx.setFillStyle('#FF5327')
    ctx.setFontSize(80)
    ctx.fillText(this.selectedCoupon.money, 137, 221)
    ctx.stroke()

    // 立即查看
    ctx.drawImage('./resource/share_getButton.png', 83, 219, 255, 128)

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
          if (!count || count < 5) {
            that.drawShareImage(callback, count ? count + 1 : 1)
          } else {
            that.setData({
              showCanvas: false
            })
            wx.showToast({
              title: '生成分享图片失败',
              icon: 'none'
            })
            typeof callback == 'function' && callback(false, '')
          }
          
        }
      })
    })

  },


  //------------------------------------------------接口------------------------------------------------------
  /**
   * 获取优惠券列表
  */
  getCouponList: function(callback) {
    let params = {
      token: wx.getStorageSync('token'),
      num: this.pageData.perpage,
      page: this.pageData.page
    }
    let that = this
    app.ols.getTeacherCouponList(params).then(d=>{
      if (d.data.code == 0) {
        let couponList = d.data.data.lists
        for (var i = 0; i < couponList.length; i++) {
          let coupon = couponList[i]
          coupon.open = false
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
        if (couponList.length < that.pageData.perpage) {
          that.pageData.canLoadNextPage = false
        } else {
          that.pageData.canLoadNextPage = true
        }
        let newList = []
        if (that.pageData.page == 1) {
          newList = couponList
        } else {
          newList = that.data.list.concat(couponList)
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
   * 优惠券 单元格 点击事件
  */
  couponCellClicked: function(e) {
    let index = e.currentTarget.dataset.index
    let coupon = this.data.list[index]
    // wx.navigateTo({
    //   url: app.getPagePath('couponDetail') + "?id=" + coupon.id,
    // })
    let openStr = 'list[' + index + '].open'
    this.setData({
      [openStr] : !coupon.open
    })
  },

  /**
   * 去分享 按钮 点击事件
  */
  shareButtonClciked: function(e) {
    if(this.shareImage_creating) {
      return
    }
    this.shareImage_creating = true
    let index = e.currentTarget.dataset.index
    let coupon = this.data.list[index]
    this.selectedCoupon = coupon
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
            that.shareImage_creating = false
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