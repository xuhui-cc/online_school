// packages/common/auditionVideo/auditionVideo.js
const app = getApp()
Page({

  currentPlay:-1,

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.getAuditionVideo()
  },


  aboutVideoStrate:function(e){
    var that = this;
    var curIdx = e.currentTarget.dataset.index;
    var id = e.currentTarget.id
    that.currentPlay = curIdx
    
      for (var i = 0; i < that.data.auditionVideoList.length; i++) {
        if (id === 'myVideo' + i) {
        //console.log('播放视频不做处理');
      } else {
        
          var videoContext = wx.createVideoContext("myVideo"+i, that);
          videoContext.pause();
        
        
        //console.log('暂停其他正在播放的视频');
        
      }
    }
    
  

},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    
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

  // }



  /*-------------------------------------------------------接口------------------------------------------------- */
  getAuditionVideo:function(){
    let that = this
    var params = {
      // "token": wx.getStorageSync("token"),
      // "kid": that.data.kid
    }
    app.ols.auditionVideo(params).then(d => {
      // console.log(d)
      if (d.data.code == 0) {
        that.setData({
          auditionVideoList:d.data.data.res
        })
        
      } else {
        
      }
    })
  }
})