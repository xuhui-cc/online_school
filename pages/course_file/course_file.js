// pages/course_file/course_file.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var id = options.id
    console.log(id)
    //课程讲义接口
    var params = {
      "token": wx.getStorageSync("token"),
      "id": id
    }
    app.ols.handout(params).then(d => {
      console.log(d)
      if (d.data.code == 0) {
        console.log(d.data.data)
        that.setData({
          handout: d.data.data
        })
        for(var i=0;i<that.data.handout.length;i++){
          var suffix = "handout[" + i + "].suffix"
          if (that.data.handout[i].annex.indexOf(".pdf") != -1){
            that.setData({
              [suffix]:"pdf"
            })
          } else if (that.data.handout[i].annex.indexOf(".doc") != -1){
            that.setData({
              [suffix]: "doc"
            })
          }
          else if (that.data.handout[i].annex.indexOf(".ppt") != -1) {
            that.setData({
              [suffix]: "ppt"
            })
          }
          else if (that.data.handout[i].annex.indexOf(".xls") != -1) {
            that.setData({
              [suffix]: "xls"
            })
          }
          else if (that.data.handout[i].annex.indexOf(".png") != -1 || that.data.handout[i].annex.indexOf(".jpg") != -1) {
            that.setData({
              [suffix]: "img"
            })
          }
          
        }
        console.log("课程讲义接口调取成功")
      } else {
        console.log("课程讲义==============" + d.data.msg)
      }
    })
  },


  //打开文档
  open_file: function (e) {
    let that = this
    var xb = e.currentTarget.dataset.xb
    console.log(xb)
    that.setData({
      xb:xb
    })
    if (that.data.handout[xb].annex.indexOf(".png") != -1 || that.data.handout[xb].annex.indexOf(".jpg") != -1) {
      that.previewImage()
      console.log("图")
    }else {
      wx.showLoading({
        title: '资料打开中...',
      })

      wx.downloadFile({
        // 示例 url，并非真实存在
        url: that.data.handout[xb].annex,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })

      
      // var fileName = that.data.handout[xb].name + "." + that.data.handout[xb].suffix
      // that.setData({
      //   fileName: fileName
      // })
      // wx.downloadFile({
      //   url: that.data.handout[xb].annex,
      //   filePath: wx.env.USER_DATA_PATH + "/" + that.data.fileName,
      //   success(res) {
      //     console.log("下载文档成功 =>", res);
      //     if (res.statusCode === 200) {
      //       wx.hideLoading();
            
      //       wx.openDocument({
      //         filePath: res.filePath,
      //         showMenu: true,
      //         success(e) {
      //           console.log("打开文档成功 =>", e);
      //         },
      //         fail(e) {
      //           console.log("打开文档失败 =>", e);
      //           wx.showToast({
      //             title: "打开文档失败，请重试！",
      //             icon: "none"
      //           });
      //         }
      //       });
      //     }
      //   },
      //   fail(err) {
      //     console.log("打开文档失败 =>", err);
      //     wx.showToast({
      //       title: "打开文档失败，请重试！",
      //       icon: "none"
      //     });
      //   }
      // });
    }
  },

  //打开图片
  previewImage: function () {
    let that = this
    
    var image = []

    image.push(that.data.handout[that.data.xb].annex)
    wx.previewImage({
      current: image[0],
      urls: image
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

  }
})