// pages/add_adress/add_adress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var type = options.type
    that.setData({
      type :type
    })
    if(type == 2){
      var params = {
        "token": wx.getStorageSync("token"),
      }
      app.ols.getdefault(params).then(d => {
        console.log(d)
        if (d.data.code == 0) {
          var cs0 = "region[0]"
          var cs1 = "region[1]"
          var cs2 = "region[2]"
          that.setData({
            id:d.data.data.id,
            name : d.data.data.name,
            phone: d.data.data.phone,
            detail_adress: d.data.data.title,
            [cs0]: d.data.data.prov,
            [cs1]: d.data.data.city,
            [cs2]: d.data.data.area
          })
        } 
      })
    }
  },

  name:function(e){
    let that = this
    var name = e.detail.value
    that.setData({
      name : name
      })
  },
  phone: function (e) {
    let that = this
    var phone = e.detail.value
    that.setData({
      phone : phone
      })
  },
  detail_adress: function (e) {
    let that = this
    var detail_adress = e.detail.value
    that.setData({
      detail_adress : detail_adress
      })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  save:function(){
    let that = this
    if(that.data.phone != undefined && that.data.phone.length == 11 ){
      if ((that.data.region != '' && that.data.region != undefined ) && (that.data.name != '' && that.data.name != undefined) && (that.data.detail_adress != '' && that.data.detail_adress != undefined) && (that.data.phone != '' && that.data.phone != undefined)){
        if (that.data.type == 1) {
          var params = {
            "token": wx.getStorageSync("token"),
            "prov": that.data.region[0],
            "city": that.data.region[1],
            "area": that.data.region[2],
            "name": that.data.name,
            "title": that.data.detail_adress,
            "phone": that.data.phone,
            "active": 1,
          }
          app.ols.add_adress(params).then(d => {
            console.log(d)
            if (d.data.code == 0) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else if (that.data.type == 2) {
          var params = {
            "id": that.data.id,
            "token": wx.getStorageSync("token"),
            "prov": that.data.region[0],
            "city": that.data.region[1],
            "area": that.data.region[2],
            "name": that.data.name,
            "title": that.data.detail_adress,
            "phone": that.data.phone,
            "active": 1,
          }
          app.ols.setinfo(params).then(d => {
            console.log(d)
            if (d.data.code == 0) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }else{
        wx.showToast({
          title: '信息完善后才能提交哦~',
          icon:"none",
          duration:3000,
        })
      }
    }else{
      wx.showToast({
        title: '手机号输入有误哦~',
        icon:"none",
        duration:3000,
      })
    }
    
    
      
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