
const app = getApp()
Page({
  data: {
    // grade: ["初三", "高三 文科", "高三 理科"],
    // grade_index: 1,
    classify: ["推荐", "语文", "数学", "英语", "政治", "历史", "地理"],
    current_classify:0,
  },
  onLoad: function () {
    let that = this
    var params = {

    }
    app.ols.getlist(params).then(d => {
      console.log(d)
      if (d.data.code == 200) {
        console.log(d.data.data)
        let arr1 = [];
        for (let i in d.data.data) {
          //var o={};
          //o[i]=d.data.data[i];
          arr1.push(d.data.data[i]);
        }
        console.log(arr1)
        that.setData({
          grade: arr1
        })
      }
    })
    that.setData({
      grade_index: wx.getStorageSync("grade")
    })

    var params = {

    }
    app.ols.discipline(params).then(d => {
      console.log(d)
      if (d.data.code == 200) {
        console.log(d.data.data)
        
      }
    })
    // var grade = wx.getStorageSync("grade")

  },

  swichNav: function (e) {
    var that = this
    var cur = e.target.dataset.current;
        
    that.setData({
      current_classify: cur
    })
      
  },

  to_course_detail:function(){
    let that = this
    wx.navigateTo({
      url: '../../pages/course_detail/course_detail',
    })
  },

  grade_picker: function (e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      grade_index: e.detail.value
    })
    // console.log(that.data.grade[that.data.grade_index])
    wx.setStorageSync("grade", that.data.grade_index)
    
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。 
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
    
})
