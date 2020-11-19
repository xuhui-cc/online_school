// packages/teacher/teacher_vipCardList/teacher_vipCardList.js
let app = getApp()
Page({

  // 选中分享的vip卡片
  selectedVip: null,

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

    // 是否展示画布
    showCanvas: false,

    showSureView: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemSize()
    this.getVipList()
    wx.hideShareMenu({
      success: (res) => {
        wx.updateShareMenu({
          withShareTicket: true,
          isPrivateMessage: true
        })
      },
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
    this.getVipList(function(success){
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
    this.getVipList(function(success){
      if (!success) {
        that.pageData.page = oldPage
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log(options)
    this.setData({
      showSureView: false
    })
    let paramsStr = 'id='+this.selectedVip.id + '&gid=' + wx.getStorageSync('gid')
    return app.shareTool.getShareReturnInfo('all', 'vipCardDetail_share', paramsStr, this.shareImagePath, '分享会员')
    
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

    if (this.selectedVip) {
      // 名字
      ctx.setTextAlign('left')
      ctx.setFillStyle('#0A0A0A')
      ctx.setFontSize(32)
      ctx.fillText(this.selectedVip.title, 37, 83, 347)
      ctx.stroke()

      // 有效期
      this.roundRectColor(ctx, 301, 0, 120, 41, 10, '#FFEBCC')
      ctx.setTextAlign('left')
      ctx.setFillStyle('#FF9A02')
      ctx.setFontSize(20)
      ctx.fillText(this.selectedVip.valid_days == 0 ? '永久有效' : '有效期'+this.selectedVip.valid_days+'天', 306, 31, 110)
      ctx.stroke()

      // 课程权益
      if (this.selectedVip.open_course) {

        // point
        ctx.drawImage('./resource/vipCard_point.png', 37, 118, 16.49, 19.57)

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
        ctx.fillText(this.selectedVip.lesson_num + '门', 186, 143.5)
        ctx.stroke()
      }

      // 优惠券
      if (this.selectedVip.open_coupon) {
        // point
        ctx.drawImage('./resource/vipCard_point.png', 37, 170, 16.49, 19.57)

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
        ctx.fillText(this.selectedVip.coupon_num + '张', 186, 194)
        ctx.stroke()
      }
    }

    // 立即查看
    ctx.drawImage('./resource/share_img_showButton.png', 2, 207, 255, 128)

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
            console.log('分享图片生成失败')
            console.log(res)
            typeof callback == 'function' && callback(false, '')
          }
        }
      })
    })

  },

  roundRectColor: function (context, x, y, w, h, r, color) {  //绘制圆角矩形（纯色填充）
    context.save();
    context.setFillStyle(color); 
    context.setStrokeStyle(color)
    context.setLineJoin('round');  //交点设置成圆角
    context.setLineWidth(r);
    context.strokeRect(x + r/2, y + r/2, w - r , h - r );
    context.fillRect(x + r, y + r, w - r * 2, h - r * 2);
    context.stroke();
    context.closePath();
  },

  //------------------------------------------------接口------------------------------------------------------
  /**
   * 获取会员卡列表
  */
  getVipList: function(callback) {
    let params = {
      token: wx.getStorageSync('token'),
      num: this.pageData.perpage,
      page: this.pageData.page
    }
    let that = this
    app.ols.getTeacherVipList(params).then(d=>{
      if (d.data.code == 0) {
        let vipList = d.data.data.lists
        for (var i = 0; i < vipList.length; i++) {
          let vip = vipList[i]
          // // 拆分课程ID
          // if (vip.course_ids) {
          //   vip.courses = vip.course_ids.split(',')
          // } else {
          //   vip.courses = []
          // }
          // // 拆分优惠券ID
          // if (vip.coupon_id) {
          //   vip.coupons = vip.coupon_id.split(',')
          // } else {
          //   vip.coupons = []
          // }
        }
        if (vipList.length < that.pageData.perpage) {
          that.pageData.canLoadNextPage = false
        } else {
          that.pageData.canLoadNextPage = true
        }
        let newList = []
        if (that.pageData.page == 1) {
          newList = vipList
        } else {
          newList = that.data.list.concat(vipList)
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
  showVipDetail: function(e) {
    let index = e.currentTarget.dataset.index
    let vip = this.data.list[index]
    wx.navigateTo({
      url: app.getPagePath('vipCardDetail_share') + '?id=' + vip.id,
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
    let vip = this.data.list[index]
    this.selectedVip = vip
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