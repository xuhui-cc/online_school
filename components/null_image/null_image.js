// components/null_image/null_image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type: String,
      value: ''
    },
    /**
     * 1，暂无学员
     * 2，暂无日志
    */
    type: {
      type: Number,
      value: 1
    },

    z_index: {
      type: Number,
      value: -1
    },
    /**
     * 1, fixed,
     * 2, absolute,
    */
    position_type: {
      type: Number,
      value: 1
    },

    /**
     * 顶部高度
    */
    top: {
      type: String,
      value: "25%"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    srcDic: {
      // 暂无学员
      1: {
        iconPath: './images_null/null_student.png',
        iconHeight: '280.32rpx',
        defaultTitle: '暂无学员',
        icon_title_space: '30rpx',
      },
      // 暂无日志
      2: {
        iconPath: './images_null/null_record.png',
        iconHeight: '284.08rpx',
        defaultTitle: '暂无日志',
        icon_title_space: '24rpx',
      },
    },
    postion_typeDic: {
      1: "fixed",
      2: "absolute"
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
