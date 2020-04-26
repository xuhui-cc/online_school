//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  
  onLoad: function () {
    let that = this

    //获取年级
    var params = {

    }
    app.ols.getlist(params).then(d => {
      console.log(d)
      if (d.data.code == 200) {
        // console.log(d.data.data)
        let arr1 = [];
        for (let i in d.data.data) {
          arr1.push(d.data.data[i]);
        }
        console.log(arr1)
        that.setData({
          grade: arr1
        })
      }
    })
    that.setData({
      grade_index: wx.getStorageSync("grade"),
      grade_id: wx.getStorageSync("grade_id")
    })

    //获取年级
    var params = {
      // "token":
      // "gid":
      "num":10,
      "page":1

    }
    app.ols.getlist(params).then(d => {
      console.log(d)
      if (d.data.code == 200) {
        // console.log(d.data.data)
        let arr1 = [];
        for (let i in d.data.data) {
          arr1.push(d.data.data[i]);
        }
        console.log(arr1)
        that.setData({
          grade: arr1
        })
      }
    })







  },
  
})
