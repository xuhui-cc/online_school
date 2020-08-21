// pages/teacherIntro/teacherIntro.js
const app = getApp()
let col1H = 0;
let col2H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cs:["../../images/teacherFile/video1.png","../../images/teacherFile/video2.png","../../images/teacherFile/video2.png","../../images/teacherFile/video1.png"],
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    scrollTop: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this 
    that.setData({
      tea_id:options.id
    })
    that.getTeacherIntro()   //获取名师详情
    wx.getSystemInfo({
      success: (res) => {
          let ww = res.windowWidth;
          // let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          // let scrollH = wh;

          this.setData({
              // scrollH: scrollH,
              imgWidth: imgWidth
          });

          
      }
  })
  },


  /*---------------------------------------------------------方法------------------------------------------------*/


    //滚动条监听
    scroll: function (e) {
      console.log(e.detail.scrollTop,"scrollTop")
      this.setData({ scrollTop: e.detail.scrollTop })
    },

    //名师视频跳转
    to_teaVideo:function(e){
      let that = this
      var url = e.currentTarget.dataset.url
      console.log(url)
      wx.navigateTo({
        url: '../../pages/teacherVideo/teacherVideo?url=' + url,
      })
    },

  onImageLoad: function (e) {
    // console.log("分组图")
    // console.log(this.data.images)
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.video1;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.csid === imageId) {
            imageObj = img;
            break;
        }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
        col1H += imgHeight;
        col1.push(imageObj);
    } else {
        col2H += imgHeight;
        col2.push(imageObj);
    }

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
  // let images = [
  //   { pic: "../../images/teacherFile/video1.png", height: 0,id:1 },
  //   { pic: "../../images/teacherFile/video2.png", height: 0,id:1  },
  //   { pic: "../../images/teacherFile/video2.png", height: 0 ,id:1 },
  //   { pic: "../../images/teacherFile/video1.png", height: 0,id:1  },
  //   { pic: "../../images/teacherFile/video1.png", height: 0 ,id:1 },
  //   { pic: "../../images/teacherFile/video2.png", height: 0,id:1  },
  //   { pic: "../../images/teacherFile/video1.png", height: 0 ,id:1 },
  //   { pic: "../../images/teacherFile/video2.png", height: 0 ,id:1 },
  //   { pic: "../../images/teacherFile/video1.png", height: 0 ,id:1 },
  // ];

  let images = that.data.video

  let baseId = "img-" + (+new Date());

  for (let i = 0; i < images.length; i++) {
    images[i].csid = baseId + "-" + i;
  }

  this.setData({
    loadingCount: images.length,
    video1: images
  });
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