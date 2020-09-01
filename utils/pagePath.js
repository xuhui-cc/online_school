
function showPay() {
  // true-显示课程支付  false-不显示课程支付
  var showPay = true
  let platform = wx.getSystemInfoSync().platform
  switch(platform) {
    case 'devtools': {
      // 开发工具
      showPay = true
      break
    }
    case 'ios': {
      // iphone/ipad
      showPay = false
      break
    }
    case 'android': {
      // 安卓
      showPay = true
      break
    }
    case 'mac': {
      showPay = true
      break
    }
    case 'windows': {
      showPay = true
      break
    }
  }
  return showPay
}

let pathDic = {
  // 启动页面
  first_page: '/packages/firstpage/first_page/first_page',

  // tabbar
  index: '/packages/tabbar/pages/index/index',
  logs: '/packages/tabbar/pages/logs/logs',
  my: '/packages/tabbar/pages/my/my',

  // 学生-测评-common
  cp_test: '/packages/student/test/comment/cp_test/cp_test',
  cp_report: '/packages/student/test/comment/cp_report/cp_report',
  cp_analysis: '/packages/student/test/comment/cp_analysis/cp_analysis',
  homework: '/packages/student/test/comment/homework/homework',
  homework_report: '/packages/student/test/comment/homework_report/homework_report',
  test: '/packages/student/test/comment/test/test',
  test_report: '/packages/student/test/comment/test_report/test_report',
  analysis: '/packages/student/test/comment/analysis/analysis',
  share_analysis: '/packages/student/test/comment/share_analysis/share_analysis',

  // 学生-课程-common
  endcourse_report: '/packages/student/course/common/endcourse_report/endcourse_report',
  group_share: '/packages/student/course/common/group_share/group_share',
  file_scan: '/packages/student/course/common/file_scan/file_scan',
  course_file: '/packages/student/course/common/course_file/course_file',
  add_adress: '/packages/student/course/common/add_adress/add_adress',
  video: '/packages/student/course/common/video/video',
  live: '/packages/student/course/common/live/live',

  // 学生-课程-安卓
  course_detail: '/packages/student/course/android/course_detail/course_detail',
  pay: '/packages/student/course/android/pay/pay',
  groupBuy: '/packages/student/course/android/groupBuy/groupBuy',
  groupPay: '/packages/student/course/android/groupPay/groupPay',
  group_detail: '/packages/student/course/android/group_detail/group_detail',
  open_course: '/packages/student/course/android/open_course/open_course',
  open_detail: '/packages/student/course/android/open_detail/open_detail',
  course_seckill: '/packages/student/course/android/course_seckill/course_seckill',

  // 学生-课程-iOS
  course_detail_ios: '/packages/student/course/iOS/course_detail_ios/course_detail_ios',
  pay_ios: '/packages/student/course/iOS/pay_ios/pay_ios',
  groupBuy_ios: '/packages/student/course/iOS/groupBuy_ios/groupBuy_ios',
  groupPay_ios: '/packages/student/course/iOS/groupPay_ios/groupPay_ios',
  group_detail_ios: '/packages/student/course/iOS/group_detail_ios/group_detail_ios',
  open_course_ios: '/packages/student/course/iOS/open_course_ios/open_course_ios',
  open_detail_ios: '/packages/student/course/iOS/open_detail_ios/open_detail_ios',
  course_seckill_ios: '/packages/student/course/iOS/course_seckill_ios/course_seckill_ios',

  // 学生-我的-common
  my_course: '/packages/student/my/common/my_course/my_course',
  my_wrongbook: '/packages/student/my/common/my_wrongbook/my_wrongbook',
  wrong: '/packages/student/my/common/wrong/wrong',
  my_about: '/packages/student/my/common/my_about/my_about',

  // 学生-我的-安卓
  my_order: '/packages/student/my/android/my_order/my_order',
  order_detail: '/packages/student/my/android/order_detail/order_detail',

  // 学生-我的-iOS
  my_order_ios: '/packages/student/my/iOS/my_order_ios/my_order_ios',
  order_detail_ios: '/packages/student/my/iOS/order_detail_ios/order_detail_ios',

  // vip-安卓
  vip_detail: '/packages/student/vip/android/vip_detail/vip_detail',

  // vip-iOS
  vip_detail_ios: '/packages/student/vip/iOS/vip_detail_ios/vip_detail_ios',

  // 名师团
  teacherIntro: '/packages/goodTeacher/teacherIntro/teacherIntro',
  teacherVideo: '/packages/goodTeacher/teacherVideo/teacherVideo',
  teacherList: '/packages/goodTeacher/teacherList/teacherList',

  // 老师端
  teacher_studentList: '/packages/teacher/teacher_studentList/teacher_studentList',
  teacher_addRecord: '/packages/teacher/teacher_addRecord/teacher_addRecord',
  uploadVideo: '/packages/teacher/uploadVideo/uploadVideo',

  // 家长端
  parent_childList: '/packages/parent/parent_childList/parent_childList',

  // 通用页面
  study_record: '/packages/common/study_record/study_record',
}

function getPagePath(pageName, notIos) {
  let showPay = this.showPay()
  if (!showPay && !notIos) {
    let iOSPageName = pageName + '_ios'
    let iOSPagePath = pathDic[iOSPageName]
    if (iOSPagePath) {
      return iOSPagePath
    }
  }
  return pathDic[pageName]
}

module.exports = {
  showPay,
  getPagePath
}
