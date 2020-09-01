// pages/teacherIntro/teacherIntro.js
const app = getApp()
let col1H = 0;
let col2H = 0;
Page({
  
  // 分享图片的路径
  shareImagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    scrollTop: null,
    showCanvas:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    if(options.isshare){
      that.setData({
        isshare:options.isshare
      })
    }
    that.setData({
      tea_id:options.id
    })
    if(options.gid){
      that.setData({
        gid:options.gid
      })
      wx.setStorageSync('gid', options.gid)
    }
    
    that.getTeacherIntro()   //获取名师详情
    wx.getSystemInfo({
      success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
              scrollH: scrollH,
              imgWidth: imgWidth
          });

          
      }
  })
  
  },


  /*---------------------------------------------------------方法------------------------------------------------*/


    //滚动条监听
    scroll: function (e) {
      console.log(e.detail.scrollTop,"scrollTop")
      // if(e.detail.scrollTop >300){

      // }
      this.setData({ scrollTop: e.detail.scrollTop })
    },

    //返回
  back:function(){
    let that = this
    if(that.data.isshare){
      wx.redirectTo({
        url: app.getPagePath('teacherList'),
      })
    }else{
      wx.navigateBack({
        delta: 0,
      })
    }
    
    // wx.navigateTo({
    //   url: '../../pages/teacherList/teacherList',
    // })
    
  },

    //名师视频跳转
    to_teaVideo:function(e){
      let that = this
      var url = e.currentTarget.dataset.url
      console.log(url)
      wx.navigateTo({
        url: app.getPagePath('teacherVideo') + '?url=' + url,
      })
    },

  onImageLoad: function (e) {
    
    // console.log("分组图")
    // console.log(this.data.images)
    let imageId = e.currentTarget.dataset.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let imgHeight =0;      //自适应高度
    if(oImgW>oImgH){
      imgHeight = 129
    }else{
      imgHeight = 282
    }
    // let scale = imgWidth / oImgW;        //比例计算
    // let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.video1;
    let imageObj = null;
    console.log(imageId,"imageId")

    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (i == imageId) {
            imageObj = img;
            break;
        }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if(col1H == 0){
      col1H += imgHeight;
      col1.push(imageObj);
      console.log("col1H==0")
    }else{
      if(col2H == 0){
        col2H += imgHeight;
        col2.push(imageObj);
        console.log("col2H==0")
      }else{
        if (col1H <= col2H) {
          col1H += imgHeight;
          col1.push(imageObj);
      } else {
          col2H += imgHeight;
          col2.push(imageObj);
      }
      }
    }
    // if (col1H <= col2H) {
    //     col1H += imgHeight;
    //     col1.push(imageObj);
    // } else {
    //     col2H += imgHeight;
    //     col2.push(imageObj);
    // }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
        data.images = [];
    }

    this.setData(data);
},

loadImages: function () {
  let that = this

  let images = that.data.video

  // let baseId = "img-" + (+new Date());

  // for (let i = 0; i < images.length; i++) {
  //   images[i].csid = baseId + "-" + i;
  // }

  this.setData({
    loadingCount: images.length,
    video1: images
  });
},



// 处理图片
dealAva:function(){
  let that = this 
  
    wx.getImageInfo({
      src: wx.getStorageSync('ava'),
      success: function (res) {
        console.log(res,"res");
        var ava = res.path
        that.drawShareImage(ava)
      }
    })
    // console.log(promise3,"promise3")
  
},


/**
   * 绘制分享图片
  */
 drawShareImage: function (ava) {
  this.setData({
    showCanvas: true
  })
  const ctx = wx.createCanvasContext('shareCanvas')
  ctx.drawImage('./resource/share_teaInfo.png', 0, 0, 375, 320)

  //画头像
  ctx.save();
  ctx.beginPath();
  ctx.arc(187 , 80, 37, 0, 2 * Math.PI);
  ctx.setStrokeStyle('white')
  ctx.stroke()
  ctx.clip()
  ctx.drawImage(ava, 150, 43, 80, 100)

  //画昵称
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(26)
  ctx.setFillStyle('#13E0B2')
  ctx.setTextAlign('center')
  ctx.fillText(this.data.teacherIntro.name, 187, 150 ,120)
  ctx.stroke()

  //画职位
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(16)
  ctx.setFillStyle('#13E0B2')
  ctx.setTextAlign('center')
  ctx.fillText(this.data.teacherIntro.discipline, 187, 175 ,120)
  ctx.stroke()

  //画简介
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(17)
  ctx.setFillStyle('#FFFFFF')
  ctx.setTextAlign('left')
  ctx.fillText(this.data.teacherIntro.intro, 40,260)
  ctx.stroke()


  // ctx.beginPath();
  
  // ctx.closePath();
  //   // ctx.fill();
  // ctx.clip()
  // // 底图
  
  
  

  

  

  console.log("画图完成")

  let that = this
  ctx.draw(true,function(e) {
    console.log("开始画图")
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 375,
      height: 320,
      canvasId: 'shareCanvas',
      success(res) {
        console.log(res.tempFilePath)
        that.shareImagePath = res.tempFilePath
        console.log(that.shareImagePath,"图片地址")
        // wx.previewImage({
        //   urls: [that.shareImagePath],
        // })
        that.setData({
          showCanvas: false,
          teacher_info:true
        })
      },
      fail (res) {
        console.log("失败")
        that.setData({
          showCanvas: false,
          teacher_info:true
        })
      }
    })
  })

},

/*---------------------------------------------------------接口------------------------------------------------*/

  //获取名师详细介绍
  getTeacherIntro:function(e){
    let that = this
    var params = {
      "id":that.data.tea_id
    }
    app.ols.v5_getTeacherIntro(params).then(d => {
      if (d.data.code == 0) {
        that.setData({
          teacherIntro: d.data.data
        })
        wx.setStorageSync('ava', d.data.data.avatar)
        for(var i=0;i<that.data.teacherIntro.video.length;i++){
          var csheight = "teacherIntro.video[" + i + "].height"
          that.setData({
            [csheight]:0
          })
        }
        
        that.setData({
          video: d.data.data.video
        })
        that.loadImages();
        that.dealAva()
        
      } else {
        // console.log("结课考试试卷结束记录接口==============" + d.data.msg)
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
    let that = this
    
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
    let that = this
    col1H = 0;
    col2H = 0;
    that.setData({
      scrollH: 0,
      imgWidth: 0,
      loadingCount: 0,
      images: [],
      col1: [],
      col2: [],
    })
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
    let paramStr = 'isshare=1'+ '&gid=' + wx.getStorageSync('gid') + '&id=' + this.data.tea_id
    return app.shareTool.getShareReturnInfo('0,1', 'teacherIntro', paramStr, this.shareImagePath ? this.shareImagePath : '', '名师介绍')
  }
})