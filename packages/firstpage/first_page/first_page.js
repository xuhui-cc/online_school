// pages/first_page/first_page.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade_index:0,
    bg:"https://onlineschool-1256006778.cos.ap-beijing.myqcloud.com/first_bg.png",

    // 是否展示页面内容
    showPageContent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.reLaunch({
    //   url: '../../pages/teacher_studentList/teacher_studentList',
    // })
    // return
    app.shareTool.setShareOption
    let that = this
    let login = wx.getStorageSync('login')
    if (login) {
      // 已登陆
      let userinfo = wx.getStorageSync('userinfo')
      if (options.share == 1) {
        app.shareTool.getFirstPageShareParam(options, userinfo.role)
      }
      switch(userinfo.role*1) {
        case 1:{
          // 学生
          wx.switchTab({
            url: app.getPagePath('index'),
          })
          break
        }
        case 2: {
          // 家长
          wx.reLaunch({
            url: '/pages/parent_childList/parent_childList',
          })
          break
        }
        case 3: {
          // 老师
          wx.reLaunch({
            url: '/pages/teacher_studentList/teacher_studentList',
          })
          break
        }
      }
    } else {
      // 未登录
      let gid = 0
      if (options.share == 1) {
        app.shareTool.getFirstPageShareParam(options, 0)
      }
      if (options.gid) {
        gid = options.gid
      } else {
        gid = wx.getStorageSync("gid")
      }
      
      if (gid != null && gid != 0) {
        // 已选择过年级
        wx.switchTab({
          url: app.getPagePath('index'),
        })
      } else {
        // 未选择过年级
        that.setData({
          gid: gid,
          showPageContent: true
        })
        that.get_grade()
        that.getJoinNumber()
      }
    }
  },

  //关闭弹框
  del:function(){
    let that = this
    that.setData({
      grade_select: false
    })
  },


  //年级选择弹框
  grade_select:function(){
    let that = this
    that.setData({
      grade_select: true
    })
  },


  //年级选择 
  subject_sel:function(e){
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    
        wx.setStorageSync('gid', that.data.grade[xb].id)
        wx.switchTab({
          url: app.getPagePath('index'),   //更新年级后跳转测评页
        })
        
    //   }
    // })
  },

  
  //获取微信绑定手机号登录
  getPhoneNumber: function (e) {
    var that = this
    app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
      if (success) {
        that.setData({
          login: true
        })
        if (d.data.data.gid != null && d.data.data.gid != 0){
          that.setData({
            grade_select:false
          })
          console.log(d.data.data.gid,"d.data.data.gid")
          wx.setStorageSync("gid", d.data.data.gid)
          wx.switchTab({
            url: app.getPagePath('index'),   //测评页跳转
          })
        }else{
          that.setData({
            grade_select: true    //选择年级弹框
          })
        }
      }
    })
  },

  //获取年级
  get_grade:function(){
    let that = this
    var params = {
    }
   
    app.ols.getlist(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d,"获取年级接口数据")
        let arr1 = [];
        for (let i in d.data.data) {
          
          arr1.push(d.data.data[i]);
        }
        console.log(arr1)
        that.setData({
          grade: arr1
        })
        console.log("获取年级成功")
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

    let that = this;
    return app.ols.getShareReturnInfo('all', app.getPagePath('first_page'))
  },

  //----------------------------------------------接口------------------------------------
  /**
   * 获取参与评测人数
  */
  getJoinNumber: function() {
    let that = this
    var params = {
    
    }
    app.ols.user_number(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          num: d.data.data.res,
        })
        
        console.log("人数成功")
      } else {
        console.log(d.data.msg, "人数失败")
      }
    })
  }
})
