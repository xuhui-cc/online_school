// pages/my_wrongbook/my_wrongbook.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    current_subject:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
   
    that.setData({
      gid: wx.getStorageSync("gid")
    })

    that.getsubject()   //获取科目
    
    
  },

  //获取错题
  get_wrong:function(did){
    let that = this
    var params = {
      "token": wx.getStorageSync("token"),
      "gid": wx.getStorageSync("gid"),
      "did": did
    }
    app.ols.wrong(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        
        for (var i = 0; i < d.data.data.length; i++) {
          if (d.data.data[i].children != '') {
            d.data.data[i].fold1 = false
              for (var j = 0; j < d.data.data[i].children.length; j++) {
                if (d.data.data[i].children[j].children != '') {
                d.data.data[i].children[j].fold2 = false
              }
            }
          }
          
        }
        console.log("获取试题成功")
        that.setData({
          wrong: d.data.data
        })
      }else{
        that.setData({
          wrong: ''
        })
        console.log("获取试题失败")
      }
    })
  },

  //获取科目接口
  getsubject: function () {
    let that = this
    //获取科目
    var params = {
      "gid": that.data.gid
    }
    app.ols.discipline(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        let arr2 = [];
        for (let i in d.data.data) {
          arr2.push(d.data.data[i]);
        }
        console.log(arr2)
        that.setData({
          subject: arr2
        })
        that.get_wrong(that.data.subject[that.data.current_subject].id)   //初始化获取试题
        console.log("获取科目成功")
      } else {
        console.log(d.data.msg, "获取科目失败")
      }
    })
  },


  //第一层折叠
  fold1:function(e){
    let that = this
    var xb1 = e.currentTarget.dataset.xb1
    console.log(xb1)
    for(var i=0;i<that.data.wrong.length;i++){
      if(xb1 == i){
        var cs1 = "wrong[" + i + "].fold1"
        that.setData({
          [cs1]: !that.data.wrong[i].fold1
        }) 
      }
    }
  },

  //第二层折叠
  fold2: function (e) {
    let that = this
    var xb1 = e.currentTarget.dataset.xb1
    var xb2 = e.currentTarget.dataset.xb2
    console.log(xb1,xb2)
    for (var i = 0; i < that.data.wrong.length; i++) {
      if (xb1 == i) {
        for(var j=0;j<that.data.wrong[i].children.length;j++){
          if(xb2 == j){
            var cs2 = "wrong[" + i + "].children[" + j + "].fold2"
            that.setData({
              [cs2]: !that.data.wrong[i].children[j].fold2
            })
          }
        }
       
      }
    }
  },

  rank1_dump:function(e){
    let that = this
    var xb1 = e.currentTarget.dataset.xb1
    console.log(xb1)
    var id = that.data.wrong[xb1].id
    console.log(id)
    wx.navigateTo({
      url: app.getPagePath('wrong') + '?id=' + id,
    })
  },

  rank2_dump: function (e) {
    let that = this
    var xb1 = e.currentTarget.dataset.xb1
    var xb2 = e.currentTarget.dataset.xb2
    console.log(xb1,xb2)
    var id = that.data.wrong[xb1].children[xb2].id
    console.log(id)
    wx.navigateTo({
      url: app.getPagePath('wrong') + '?id=' + id,
    })
  },

  //错题详情跳转
  to_wrong:function(e){
    let that = this 
    var xb1 = e.currentTarget.dataset.xb1
    var xb2 = e.currentTarget.dataset.xb2
    var xb3 = e.currentTarget.dataset.xb3
    console.log(xb1, xb2,xb3)
    
    var id = that.data.wrong[xb1].children[xb2].children[xb3].id
    console.log(id)
    wx.navigateTo({
      url: app.getPagePath('wrong') + '?id=' + id,
    })
          
  },

  swichNav_subject: function (e) {
    var that = this

    var cur = e.target.dataset.current;

    that.setData({
      current_subject: cur
    })
    that.get_wrong(that.data.subject[cur].id)
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

  //   let that = this;
  //   return {
  //     title: '领军网校', // 转发后 所显示的title
  //     path: '/packages/firstpage/first_page/first_page', // 相对的路径
  //     imageUrl: '/images/other/share1.png',  //用户分享出去的自定义图片大小为5:4,
  //     success: (res) => {    // 成功后要做的事情
  //       console.log("成功")

  //     },
  //     fail: function (res) {
  //       // 分享失败
  //       console.log(res, "分享失败")
  //     }
  //   }
  // }
})