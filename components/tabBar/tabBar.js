Component({

  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        "text": "课程",
        "pagePath": "/packages/tabbar/pages/logs/logs",
        "iconPath": "/packages/tabbar/resource/course2.png",
        "selectedIconPath": "/packages/tabbar/resource/course1.png"
      },
      {
        "text": "智慧课堂",
        "pagePath": "/packages/tabbar/pages/index/index",
        "iconPath": "/packages/tabbar/resource/test2.png",
        "selectedIconPath": "/packages/tabbar/resource/test1.png"
      },
      {
        "text": "我的",
        "pagePath": "/packages/tabbar/pages/my/my",
        "iconPath": "/packages/tabbar/resource/my2.png",
        "selectedIconPath": "/packages/tabbar/resource/my1.png"
      }
    ]
  },
  properties: {
    selected: {
      type: Number, // 接收父组件传过来的值
      value: ''
    }
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index
      console.log(index)
      if(index != 1){
        wx.switchTab({url})
      }else{
        wx.navigateToMiniProgram({
          appId: 'wx4925dffedbcc70e4',
          path: 'pages/first_page/first_page',
          // extraData: {
          //   foo: 'bar'
          // // },
          // envVersion: 'trial',
          // success(res) {
          //   // 打开成功
          // }
        })
      }
      
      
    }
  }
})