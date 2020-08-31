// pages/course_file/course_file.js
const app = getApp()
Page({
  // 打开的文件路径 在onShow中删除文件
  openFilePath: '',
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
          } else if (that.data.handout[i].annex.indexOf(".docx") != -1) {
            that.setData({
              [suffix]: "docx"
            })
          }
          else if (that.data.handout[i].annex.indexOf(".doc") != -1) {
            that.setData({
              [suffix]: "doc"
            })
          }else if (that.data.handout[i].annex.indexOf(".pptx") != -1) {
            that.setData({
              [suffix]: "pptx"
            })
          }
          else if (that.data.handout[i].annex.indexOf(".ppt") != -1) {
            that.setData({
              [suffix]: "ppt"
            })
          }
          else if (that.data.handout[i].annex.indexOf(".xlsx") != -1) {
            that.setData({
              [suffix]: "xlsx"
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

      var fileName = that.data.handout[xb].name + "." + that.data.handout[xb].suffix
      that.setData({
        fileName: fileName
      })
      let customFilePath = wx.env.USER_DATA_PATH + "/" + that.data.fileName
      console.log('得到自定义路径：')
      console.log(customFilePath)

      wx.downloadFile({
        url: that.data.handout[xb].annex, //仅为示例，并非真实的资源
        filePath: customFilePath,
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

          console.log(res)
          var filePath = res.filePath
          console.log('返回自定义路径：')
          console.log(filePath)

          that.openFilePath = filePath
          wx.openDocument({
            showMenu: true,
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
              wx.hideLoading()
            },
            fail: function (res) {
              console.log("打开文档失败");
              console.log(res)
              wx.hideLoading({
                complete: (res) => {
                  wx.showToast({
                    title: '文件打开失败',
                    icon: 'none'
                  })
                },
              })
            },
            complete: function (res) {
              console.log("complete");
              console.log(res)
            }
          })
        },
        fail: function (res) {
          console.log('文件下载失败')
          console.log(res)
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '文件下载失败',
                icon: 'none'
              })
            },
          })

        }
      })
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
   * 清除本地保存的文件
  */
  clearLocalFile: function () {
    let that = this

    if (this.openFilePath == '') {
      return
    }

    let fs = wx.getFileSystemManager()
    let filePath = this.openFilePath
    fs.unlink({
      filePath: filePath,
      success(res) {
        console.log("文件删除成功" + filePath)
        that.openFilePath = ''
      },
      fail(res) {
        console.log("文件删除失败" + filePath)
        console.log(res)
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
    this.clearLocalFile()   //清除本地文件缓存
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