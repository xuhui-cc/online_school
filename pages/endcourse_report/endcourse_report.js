//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    page: 1,//无限下拉分页
    videoData: [],
    videoSrc: '', //当前视频的地址
    ty: 0, //手指开始触摸时的位置
    idx: 0, //当前视频索引
    scrollTop: 0, //用来隐藏video 标签
    scrollStart: '', //滚动动画
    // totalNum: 10, //视频总数，用来加载更多
    height: 0, //设备高度


    mask2: false,
    isftf: true,
    isptp: false,

    kslx: ['国考', '事业单位', '国企', '高校招聘面试', '其他编制类面试'],
    kslx_select: "请选择考场类型",
    date: '请选择测评日期',
    cptime: ['08:00 - 09:00', '09:00 -10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00'],
    cp_time: "请选择测评时间"
  },

  onLoad: function (options) {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
    // that.setData({

    //   cp_sub: wx.getStorageSync("cp_sub")
    // })
    // var type = options.type
    // console.log(type + '==============type')
    // if (type == 1) {
    //   var type_name = "自我认知"
    // } else if (type == 2) {
    //   var type_name = "综合分析"
    // } else if (type == 3) {
    //   var type_name = "应急处理"
    // } else if (type == 4) {
    //   var type_name = "计划组织"
    // } else {
    //   var type_name = "人际关系"
    // }

    // var params = {
    //   type: type_name,

    // }
    //获取pdf文件
    // app.ljgk.xcxGetVideoList(params).then(d => {
    //   if (d.data.status == 1) {
    //     that.setData({
    //       videoData: d.data.data
    //     })
        this.animation = wx.createAnimation();//可根据文档，获得满足自己需求的实例
    //     this.video = wx.createVideoContext('myVideo');
    //     that.setData({
    //       videoSrc: that.data.videoData[0].url,
    //       isplay: true
    //     })
    //     console.log(that.data.videoSrc)

    //     console.log(d.data.msg)

    //   }
    //   else {
    //     console.log('失败')
    //   }
    // })

    // var dd = new Date();
    // var now_y = dd.getFullYear();
    // var now_m = dd.getMonth() + 1;//获取当前月份的日期 
    // var now_d = dd.getDate()
    // var now_date = now_y + "-" + now_m + "-" + now_d;
    // console.log(now_date)
    // that.setData({
    //   now_date: now_date
    // })
    // dd.setDate(dd.getDate() + 7);//获取AddDayCount天后的日期 
    // var future_y = dd.getFullYear();
    // var future_m = dd.getMonth() + 1;//获取当前月份的日期 
    // var future_d = dd.getDate();
    // var future_date = future_y + "-" + future_m + "-" + future_d;
    // console.log(future_date)
    // that.setData({
    //   future_date: future_date
    // })

  },
  /**
   * 开始触摸
   * @param e
   */
  onTouchStart: function (e) {
    let that = this
    let tp = e.changedTouches[0]; //记录手指位置
    that.setData({
      ty: tp.y
    })
    // that.setData({
    //   isplay: !that.data.isplay
    // })
    // console.log(that.data.isplay + '==========isplay')
    // if (that.data.isplay == false) {
    //   that.video.stop(); //停止当前视频
    //   console.log("暂停")
    // } else {
    //   that.video.play(); //停止当前视频
    //   console.log("开始")
    // }
  },
  /**
   * 手指离开
   * @param e
   */
  onTouchEnd: function (e) {
    let that = this


    let {
      ty,
      idx,
      videoData,
      // totalNum,
      page
    } = that.data;
    let tp = e.changedTouches[0]; //手指结束时位置
    console.log(idx)
    console.log(tp.y + 'tp.y')
    console.log(ty + 'ty')
    console.log(tp.y - ty)
    if (tp.y - ty < -100) {  //向下滚动时的处理 -100为触发条件，可写在data中，统一处理
      that.setData({
        scrollTop: 0, //更改这个值为了隐藏video显示image，开始动画
      })
      idx += 1;
      // if (idx >= that.data.videoData.length) { //当滑到倒数第二个视频时，开始请求数据
      //   wx.showToast({
      //     title: '没有更多了哦',
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   idx -= 1;
      //   // that.setData({
      //   //   page: page + 1,
      //   //   totalNum: totalNum + totalNum,
      //   //   videoData: videoData.concat(videoData) //此时可以调用请求视频列表的方法，例如that.getVideoList(),y由于没有接口支持，模拟无限加载的效果
      //   // })


      // }
      console.log("下滑")
      console.log(idx)
      that.animation.translateY(-idx * that.data.height).step(); //创建动画
      // that.video.play(); //停止当前视频
    } else if (tp.y - ty > 100 && idx > 0) { //向上滚动的判断，要区分是否将滚到第一个视频，添加不同动画
      idx -= 1;
      console.log("上一个")
      // that.setData({
      //   scrollTop: 1,
      // })
      that.animation.top(-idx*100-100+'vh').step()
      // if (idx == 0) {
      //   that.animation.translateY(-that.data.height).step()
      // } else {
      //   that.animation.translateY(-idx * that.data.height).step()
      // }
      // that.video.play(); //停止当前视频
    } else if (tp.y - ty > 100 && idx == 0) { //已经是第一个视频的时候的提示
      wx.showToast({
        title: '已经是第一个咯',
        icon: 'none',
        duration: 2000
      })
      // that.video.play(); //停止当前视频
    } else if (tp.y - ty == 0) { //之前预留的到底提示，后不需要所以未加

    }
    console.log(idx)
    that.setData({
      idx: idx,
      // videoSrc: videoData[idx].url,
      // video: videoData[idx],
      tx: tp.x,
      ty: tp.y,
      scrollStart: that.animation.export()
    })
    // console.log(that.data.videoSrc)

    // setTimeout(() => {
    //   that.setData({
    //     scrollTop: 0
    //   })
    //   that.video.play()
    // }, 1300); //1.3秒后显示video标签，播放视频，可根据实际情况调整
  },


  onHide: function () {
    // this.video.stop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.video.stop()
  },




})
