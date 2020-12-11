// packages/common/learningSituation/learningSituation.js
const app = getApp()
Page({

  // 分享图片的路径
  shareImagePath: '',

  /**
   * 页面的初始数据
   */
  data: {
    showCanvas:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // that.setData({
    //   login:'',
    //   gid:1,
    //   isshare:1
    // })
    that.setData({
      login:wx.getStorageSync('login'),
      // gid:wx.getStorageSync('gid'),
    })
    if(options.isshare == 1){
      wx.setStorageSync('gid', options.gid)
      that.setData({
        // login:wx.getStorageSync('login'),
        gid:options.gid,
        isshare:options.isshare
      })
      console.log("学情分享打开",that.data.login,that.data.gid)
    }
    that.getLastDate()
    
    
  },

  getLastDate:function(){
    let that = this
    var myDate = new Date();
    var weekDate = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000);// 计算开始时间用
    var weekDate2 = new Date(myDate.getTime() - 7 * 24 * 3600 * 1000);// 计算结束时间用
    var day = weekDate.getDay();
    var time = weekDate.getDate()-day+(day===0?-6:1);
    var startDate = new Date(weekDate.setDate(time));
    var endDate = new Date(weekDate2.setDate(time+6));
    if(startDate.getFullYear() == endDate.getFullYear()){
      that.setData({
        lastDateYear:startDate.getFullYear() + "年",
        lastStartDate:(startDate.getMonth() + 1) +'月' +startDate.getDate() + "日",
        lastEndDate:(endDate.getMonth() + 1) +'月' +endDate.getDate()+ "日"
      })
    }else{
      that.setData({
        lastStartDate:startDate.getFullYear() +'年' +(startDate.getMonth() + 1) +'月' +startDate.getDate()+ "日",
        lastEndDate:endDate.getFullYear() +'年' +(endDate.getMonth() + 1) +'月' +endDate.getDate()+ "日"
      })
    }
    
  
    
  //   let endDateTime =endTime.getFullYear() +'-' +(endTime.getMonth() + 1) +'-' +endTime.getDate()
  },

  learningSituation:function(){
    let that = this 
    var params = {
      "token": wx.getStorageSync("token"),
    }
    app.ols.learningSituation(params).then(d => {
      if (d.data.code == 0) {
        let h = Math.floor(d.data.data.weektime / 3600) < 10 ? '0' + Math.floor(d.data.data.weektime / 3600) : Math.floor(d.data.data.weektime / 3600);
        let m = Math.ceil((d.data.data.weektime / 60 % 60)) < 10 ? '0' + Math.ceil((d.data.data.weektime / 60 % 60)) : Math.ceil((d.data.data.weektime / 60 % 60));
        if(h>0){
          d.data.data.weektime1 = h
          d.data.data.weektime2 = m 
        }else{
          d.data.data.weektime2 = m 
        }
        let h_todat = Math.floor(d.data.data.todaynumtime / 3600) < 10 ? '0' + Math.floor(d.data.data.todaynumtime / 3600) : Math.floor(d.data.data.todaynumtime / 3600);
        let m_todat = Math.ceil((d.data.data.todaynumtime / 60 % 60)) < 10 ? '0' + Math.ceil((d.data.data.todaynumtime / 60 % 60)) : Math.ceil((d.data.data.todaynumtime / 60 % 60));
        if(h>0){
          d.data.data.todaynumtime1 = h_todat
          d.data.data.todaynumtime2 = m_todat 
        }else{
          d.data.data.todaynumtime1 = 0
          d.data.data.todaynumtime2 = m_todat
        }
        console.log(d.data.data.list)
        var array = []
        array= d.data.data.list
        console.log(array)
        var todayTimeHour = 0
        var todayTimeMin = 0
        for(var i = 0;i<d.data.data.list.length;i++){
          console.log("循环")
          let h1 = Math.floor(d.data.data.list[i].studytime / 3600) < 10 ? '0' + Math.floor(d.data.data.list[i].studytime / 3600) : Math.floor(d.data.data.list[i].studytime / 3600);
          let m1 = Math.ceil((d.data.data.list[i].studytime / 60 % 60)) < 10 ? '0' + Math.ceil((d.data.data.list[i].studytime / 60 % 60)) : Math.ceil((d.data.data.list[i].studytime / 60 % 60));
          if(h1>0){
            d.data.data.list[i].studytime1 = h1
            d.data.data.list[i].studytime2 = m1
            
          }else{
            d.data.data.list[i].studytime2 = m1
           
          }
          
          let h2 = Math.floor(d.data.data.list[i].todaytime / 3600) < 10 ? '0' + Math.floor(d.data.data.list[i].todaytime / 3600) : Math.floor(d.data.data.list[i].todaytime / 3600);
          let m2 = Math.ceil((d.data.data.list[i].todaytime / 60 % 60)) < 10 ? '0' + Math.ceil((d.data.data.list[i].todaytime / 60 % 60)) : Math.ceil((d.data.data.list[i].todaytime / 60 % 60));
          if(h2>0){
            d.data.data.list[i].todaytime1 = h2
            d.data.data.list[i].todaytime2 = m2
            todayTimeHour += parseInt(h1)
            todayTimeMin += parseInt(m2)
          }else{
            d.data.data.list[i].todaytime2 = m2
            todayTimeMin += parseInt(m2)
          }
        }
        console.log(parseInt(todayTimeHour),parseInt(todayTimeMin))
        if(todayTimeMin > 60){
          todayTimeMin = todayTimeMin % 60
          todayTimeHour += todayTimeMin / 60
        }
        that.setData({
          learningSituation:d.data.data,
          todayTimeMin:todayTimeMin < 10 ? "0" + todayTimeMin : todayTimeMin,
          todayTimeHour:todayTimeHour < 10 ? "0"+todayTimeHour : todayTimeHour
        })
        that.drawShareImage()
      } else{
        that.setData({
          learningSituation:''
        })
      }
    })
  },

  /**
   * 绘制分享图片
  */
 drawShareImage: function (ques_info) {
  this.setData({
    showCanvas: true
  })
  
  const ctx = wx.createCanvasContext('shareCanvas')

  


  ctx.drawImage("./resource/share.png", 0, 0, 375, 340)
  
  
  ctx.restore()
  ctx.beginPath()
  ctx.setFontSize(16)
  ctx.setFillStyle('#B5B7BE')
  ctx.setTextAlign('left')
  if(this.data.learningSituation.percentage == 0){
    ctx.fillText("今天还没有学习喔，要加油鸭！",20,80,300)
  }else{
    ctx.fillText("已超过" + this.data.learningSituation.percentage + "%的同学，继续加油鸭！",20,80,300)
  }
  
  ctx.stroke()

  
  if(this.data.learningSituation.todaynumtime == 0){
    ctx.restore()
    ctx.beginPath()
    ctx.translate(0,0);//其实这步是这重要的，定好中心点好，旋转起来就剪刀了
    ctx.rotate( 5* Math.PI/180);//我这步最后操作，等你中心点定好，移动到你自己想要的位置，再调角度
    ctx.setFontSize(24)
    ctx.setFillStyle('#EF653A')
    // ctx.font = "bold 12px sans-serif";
    ctx.setTextAlign('left')
    // ctx.fillText(title1, 190, 140,300)
    ctx.fillText("今天还没学习哦~", 170, 210,300)
    ctx.stroke()
  }else if(this.data.todayTimeHour == 0){
    ctx.translate(0,0);//其实这步是这重要的，定好中心点好，旋转起来就剪刀了
    ctx.rotate( 5* Math.PI/180);//我这步最后操作，等你中心点定好，移动到你自己想要的位置，再调角度
    ctx.restore()
    ctx.beginPath()
    ctx.setFontSize(60)
    // ctx.font = "bold 60px sans-serif";
    ctx.setFillStyle('#EF653A')
    ctx.setTextAlign('left')
    ctx.fillText(this.data.todayTimeMin, 190, 220,80)
    ctx.stroke()

    ctx.restore()
    ctx.beginPath()
    ctx.setFontSize(30)
    ctx.setFillStyle('#EF653A')
    ctx.setTextAlign('left')
    ctx.fillText("分钟", 260, 220,70)
    ctx.stroke()
  }else{
    ctx.translate(0,0);//其实这步是这重要的，定好中心点好，旋转起来就剪刀了
    ctx.rotate( 5* Math.PI/180);//我这步最后操作，等你中心点定好，移动到你自己想要的位置，再调角度
    ctx.restore()
    ctx.beginPath()
    ctx.setFontSize(50)
    // ctx.font = "bold 60px sans-serif";
    ctx.setFillStyle('#EF653A')
    ctx.setTextAlign('center')
    ctx.fillText(this.data.todayTimeHour, 185, 220,80)
    ctx.fillText(this.data.todayTimeMin, 295, 220,80)
    ctx.stroke()
    ctx.restore()
    ctx.beginPath()
    ctx.setFontSize(24)
    ctx.setFillStyle('#EF653A')
    ctx.setTextAlign('left')
    ctx.fillText("小时", 215, 220,70)
    ctx.fillText("分", 330, 220,70)
    ctx.stroke()
  }
  

  // var content = ques_info.remark.substr(0,14)
  // ctx.restore()
  // ctx.beginPath()
  // ctx.setFontSize(18)
  // ctx.setFillStyle('#122C62')
  // ctx.setTextAlign('center')
  // if(title2){
  //   if(content.length == 14){
  //     ctx.fillText(content + "...", 200,220 ,300)
  //   }else{
  //     ctx.fillText(content, 200,220 ,300)
  //   }
  // }else{
  //   if(content.length == 14){
  //     ctx.fillText(content + "...", 200,200 ,300)
  //   }else{
  //     ctx.fillText(content, 200,200 ,300)
  //   }
  // }
  
  
  ctx.stroke()
  console.log("画图完成")

  let that = this
  ctx.draw(true,function(e) {
    console.log("开始生成图片地址")
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
        that.setData({
          showCanvas: false,
          teacher_info:true
        })
      },
      fail (res) {
        console.log("图片地址生成失败")
        that.setData({
          showCanvas: false,
          teacher_info:true
        })
      }
    })
  })

},

getPhoneNumber: function (e) {
  var that = this
  app.loginTool.getPhoneNumber(e, that.data.gid, function(success, message){
    if (success) {
      that.setData({
        login: true
      })
      that.onShow()
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
    let that= this
    if(wx.getStorageSync('login')){
      that.learningSituation()
    }
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
    let params = 'isshare=1&gid=' + wx.getStorageSync("gid") 
    return app.shareTool.getShareReturnInfo('0,1', 'learningSituation', params, this.shareImagePath ? this.shareImagePath : '', wx.getStorageSync('shareHead').learning + wx.getStorageSync('userinfo').nick + "的学情分析")
  }
})