// const URI_base = "http://os.lingjun.net/" //测试域名
const URI_base = "https://wsg.lingjun.net/" // 正式域名

const URI = URI_base + 'api.php/'   //无版本V
const URI_V = URI + 'v8/'    //有版本V

const fetch = require('./fetch')

/*---------------------------------------------------测试整合版本------------------------------------------ */

/*---------------------------------------------URL(基础)---------------------------------------------*/
// 假人头像
function dummy() {
  return URI_base
}
// 新建日志 上传附件路径
function getRecordUploadPath_h5() {
  return URI_base+'static/uploadH5/uploadH5New.html'
}

// 7v1介绍 h5
function get7v1Intro_h5() {
  return URI_base+'static/7v1/index.html'
}

/*---------------------------------------------URL(无版本V)---------------------------------------------*/
// 答题上传图片（公用）
function addImg() {
  return URI + "/annex/upload"
}

// 获取专题
function gettoplist(params) {
  return fetch.olsfetchpost(URI, 'category/gettoplist', params,"获取专题")
}

// 获取全部错题
function wrong(params) {
  return fetch.olsfetchpost(URI, 'wrong/getlist', params,"全部错题")
}

//测评答题状态初始化
function setmark(params) {
  return fetch.olsfetchpost(URI, 'mark/setmark', params)
}

//试卷基本信息（课后作业、结课考试通用）
function ques_info(params) {
  return fetch.olsfetchpost(URI, 'paper/getpaper', params)
}

//试卷基本信息（测评）
function testques_info(params) {
  return fetch.olsfetchpost(URI, 'paper/gettestpaper', params)
}

//测评试卷答案提交
function cp_ans_submit(params) {
  return fetch.olsfetchpost(URI, 'mark/submittestquestion', params,"测评试卷答案提交")
}

//作业答案提交
function work_submit(params) {
  return fetch.olsfetchpost(URI, 'mark/submitquestion', params,"作业答案提交")
}

//更新测评试卷状态
function update_cpsubmit(params) {
  return fetch.olsfetchpost(URI, 'mark/submittestmark', params,"更新测评试卷状态")
}

//更新试卷状态
function update_testsubmit(params) {
  return fetch.olsfetchpost(URI, 'mark/submitmark', params,"更新试卷状态")
}

//错题详情id列表
function wrong_id(params) {
  return fetch.olsfetchpost(URI, 'wrong/getidlist', params)
}

//错题详情id列表
function wrong_detail(params) {
  return fetch.olsfetchpost(URI, 'wrong/getquestion', params)
}

/*-----------------------------------------------------URL(有版本V)-------------------------------------------- */
//登录（公用）
function login(params) {
  return fetch.olsfetchpost(URI_V, 'login/getphonelogin', params, true, '登录中')
}

//分享判断（公用）
function judge_share4(params) {
  return fetch.olsfetchpost(URI_V, 'share/getinterface', params,"分享判断",true,"分享加载中")
}

// 自定义分享标题title（公用）
function shareHead(params) {
  return fetch.olsfetchpost(URI_V, 'basic/getPublicData', params, '自定义分享标题title')
}

//权限对应老师信息（公用）
function couponTea(params) {
  return fetch.olsfetchpost(URI_V, 'basic/getteacherinfo', params,"权限对应老师信息")
}

// 获取广告弹窗数据（公用）
function getAdWindow(params) {
  return fetch.olsfetchpost(URI_V, 'ad/getlist', params, '获取广告弹窗数据')
}

//获取平台人数（公用）
function user_number(params) {
  return fetch.olsfetchpost(URI_V, 'basic/getmembernum', params)
}

// 小程序直播接入
function getclassroom(params) {
  return fetch.olsfetchpost(URI_V, 'classroom/getclassroom', params)
}

// 添加地址
function add_adress(params) {
  return fetch.olsfetchpost(URI_V, 'address/addinfo', params)
}

// 获取地址
function getdefault(params) {
  return fetch.olsfetchpost(URI_V, 'address/getdefault', params)
}

// 更新地址
function setinfo(params) {
  return fetch.olsfetchpost(URI_V, 'address/setinfo', params)
}

// 首页年级选择
function getlist(params) {
  return fetch.olsfetchpost(URI_V, 'grade/getlist', params,"首页年级")
}

// 获取学科
function discipline(params) {
  return fetch.olsfetchpost(URI_V, 'discipline/getlist', params,"获取学科")
}

// 获取全部订单
function order_all(params) {
  return fetch.olsfetchpost(URI_V, 'order/getlist', params,"全部订单")
}

// 获取全部订单(拼团)
function order_all3(params) {
  return fetch.olsfetchpost(URI_V, 'order/getlist', params)
}

//待支付
function order_wait(params) {
  return fetch.olsfetchpost(URI_V, 'order/getwaitlist', params)
}

//已支付
function order_ed(params) {
  return fetch.olsfetchpost(URI_V, 'order/getpaylist', params)
}

//已关闭
function order_close(params) {
  return fetch.olsfetchpost(URI_V, 'order/getcloselist', params)
}

// 获取测评试题（已登录）
function test_ques1(params) {
  return fetch.olsfetchpost(URI_V, 'paper/gettestlist', params)
}

// 获取测评试题（未登录）
function test_ques2(params) {
  return fetch.olsfetchpost(URI_V, 'paper/gettestlist', params)
}

//传年级
function grade_update(params) {
  return fetch.olsfetchpost(URI_V, 'member/update', params)
}

//视频页其他信息
function getplaypushlist(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getplaypushlist', params,"获取视频页附加信息")
}

//获取课程讲义列表
function handout(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getannex', params,"课程讲义")
}

//获取课程视频链接
function getvideo(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getvideo', params,"获取课程视频")
}

//获取课程视频断点时间——1.2
function getvideo_info(params) {
  return fetch.olsfetchpost(URI_V, 'study/getvideoline', params,"获取课程视频断点")
}

//课程预支付
function preorder(params) {
  return fetch.olsfetchpost(URI_V, 'wepay/preorder', params)
}

//拼团预支付
function group_preorder3(params) {
  return fetch.olsfetchpost(URI_V, 'wepay/pregrouporder', params,"拼团预支付")
}

//订单详情
function order_detail(params) {
  return fetch.olsfetchpost(URI_V, 'order/getinfo', params)
}

//视频结束更新状态——1.2
function video_end(params) {
  return fetch.olsfetchpost(URI_V, 'study/setfinishvideoline', params,'视频结束状态更新')
}

//视频开始更新状态——1.2
function video_start(params) {
  return fetch.olsfetchpost(URI_V, 'study/setbeginvideoline', params)
}

//测评试题id
function test_id(params) {
  return fetch.olsfetchpost(URI, 'paper/getidlist', params)
}

//测评试卷概要
function test_explain(params) {
  return fetch.olsfetchpost(URI_V, 'paper/getinfo', params)
}

//测评试卷单个试题详情
function ques_detail(params) {
  return fetch.olsfetchpost(URI_V, 'paper/getquestion', params)
}

//测评报告
function cp_report(params) {
  return fetch.olsfetchpost(URI_V, 'report/gettestchart', params)
}

//测评点评
function cp_comment(params) {
  return fetch.olsfetchpost(URI, 'report/getcommentlist', params,'测评试卷名师点评')
}

//测评某一试题详情
function cp_analysis(params) {
  return fetch.olsfetchpost(URI_V, 'report/getquestion', params)
}

//某个测评试卷答题卡数据列表
function cp_ans_id(params) {
  return fetch.olsfetchpost(URI_V, 'report/getmarkcard', params)
}

//课程直播链接获取
function get_live(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getmtcourseurl', params)
}

//（课后作业、结课考试）报告
function test_report(params) {
  return fetch.olsfetchpost(URI_V, 'report/getchart', params)
}

//结课报告1
function end_report1(params) {
  return fetch.olsfetchpost(URI_V, 'report/getstudyday', params)
}

//结课报告2
function end_report2(params) {
  return fetch.olsfetchpost(URI_V, 'report/getstudyearlynight', params)
}

//结课报告3
function end_report3(params) {
  return fetch.olsfetchpost(URI_V, 'report/getstudyinfo', params)
}

//结课报告4
function end_report4(params) {
  return fetch.olsfetchpost(URI_V, 'report/getstudyresult', params)
}

//获取免费课
function get_free(params) {
  return fetch.olsfetchpost(URI_V, 'wepay/freeorder', params,"免费课领取")
}


//获取试卷推荐课程数据
function getpushlist(params) {
  return fetch.olsfetchpost(URI, 'report/getpushlist', params,"获取试卷推荐课程数据")
}

//授权头像
function avatar_update(params) {
  return fetch.olsfetchpost(URI_V, 'member/upinfo', params,"获取头像")
}

//试卷开始学习记录
function test_start(params) {
  return fetch.olsfetchpost(URI_V, 'study/setbeginstudy', params,"试卷开始学习记录")
}

//试卷结束学习记录
function test_end(params) {
  return fetch.olsfetchpost(URI_V, 'study/setfinishstudy', params,"试卷结束学习记录")
}

//热门课程
function hot_list4(params) {
  return fetch.olsfetchpost(URI_V, 'group/gethotlist', params,"热门课程",false,"课程加载中...")
}

//拼团未支付删除v3
function group_del3(params) {
  return fetch.olsfetchpost(URI_V, 'order/deldata', params)
}

//拼团课程详情_团详情数据
function group_detail3(params) {
  return fetch.olsfetchpost(URI_V, 'group/getgrouplist', params,"团详情")
}

//团分享v3
function group_share3(params) {
  return fetch.olsfetchpost(URI_V, 'share/getinterface', params)
}

//获取全部拼团
function all_group3(params) {
  return fetch.olsfetchpost(URI_V, 'group/getlessongrouplist', params,"获取全部拼团")
}

//轮播图
function banner3(params) {
  return fetch.olsfetchpost(URI, 'v9/banner/getlist', params,"轮播")
}

// 老师端获取学员列表
function teacherGetStudentsList(params) {
  return fetch.olsfetchpost(URI_V, 'classes/getteacherstudentslist', params, "老师端获取学员列表", true)
}

// 获取日志标签列表
function getReocrdTagList(params) {
  return fetch.olsfetchpost(URI_V, 'log/log/getTags', params, "获取日志标签列表", true)
} 

// 提交日志
function submitReocrd(params) {
  return fetch.olsfetchpost(URI_V, 'studylog/addLog', params, '提交日志', true, "提交中")
}

// 获取学生某一天的日志列表
function getStudentRecordListByDay(params) {
  return fetch.olsfetchpost(URI_V, 'studylog/dayLog', params, "获取学生某一天的日志列表", true)
} 

// 查看日期段内学生日志情况
function getPeriodRecordStatusList(params) {
  return fetch.olsfetchpost(URI_V, 'log/log/dateLog', params, '查看日期段内学生日志情况', true)
}

// 获取学生课时信息
function getStudentCourseHourInfo(params) {
  return fetch.olsfetchpost(URI_V, 'log/log/stu_info', params, '获取学生课时信息')
}

// 获取消课记录列表
function getClearCourseHourList(params) {
  return fetch.olsfetchpost(URI_V, 'log/log/stu_XiaoCourse', params, '获取消课记录列表', true)
}

// 上传日志图片/视频
function recordUploadFile(filePath) {
  return fetch.olsfetchUpload(URI_V, 'log/upload/upload', filePath, '上传日志图片/视频')
}

// 获取学生最新日志
function getStudentNewRecord(params) {
  return fetch.olsfetchpost(URI_V, 'log/log/stu_xinLog', params, '获取学生最新日志')
}



// 判断用户和某个学生之间有无关系
function haveRelationWithStudent(params) {
  return fetch.olsfetchpost(URI_V, 'log/teacher/stu_isshow', params, '判断用户和某个学生之间有无关系', true)
}

//vip预支付
function v4_vipPreorder(params) {
  return fetch.olsfetchpost(URI_V, 'wepay/precardorder', params,"vip卡预支付",true,"请稍后")
}

// 家长获取自家孩子列表
function parentGetChildsList(params) {
  return fetch.olsfetchpost(URI_V, 'log/teacher/getChildrenList', params, '家长获取自家孩子列表', true)
}

// 刷新用户基本信息
function refreshUserInfo(params) {
  return fetch.olsfetchpost(URI_V, 'member/getinfo', params, '刷新用户基本信息')
}


// 获取名师列表
function v5_getTeacherList(params) {
  return fetch.olsfetchpost(URI_V, 'famousteacher/getlist', params, '获取名师列表', true)
}

// 获取名师列表
function v5_getTeacherIntro(params) {
  return fetch.olsfetchpost(URI_V, 'famousteacher/getinfo', params, '获取名师详情', true)
}

// 获取用户openid 与 session_key
function getLoginUserIdentify(params) {
  return fetch.olsfetchpost(URI_V, 'login/getpassword', params, '获取用户openid 与 session_key')
}

//消息订阅
function subMsg(params) {
  return fetch.olsfetchpost(URI_V, 'course_apply/addcourseapply', params,"订阅消息")
}
//优惠券列表
function couponList(params) {
  return fetch.olsfetchpost(URI_V, 'coupon/getcouponinfolist', params,"优惠券列表")
}
//优惠券开启状态
function couponShow(params) {
  return fetch.olsfetchpost(URI_V, 'coupon/getcouponstatus', params,"优惠券开启状态")
}

//试听课
function auditionVideo(params) {
  return fetch.olsfetchpost(URI_V, 'basic/getVideo', params,"试听课")
}

//会员列表
function v5_viplist(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getviplist', params,"会员卡列表")
}
//会员卡权益
function vipRight(params) {
  return fetch.olsfetchpost(URI_V, 'basic/vipcard_image', params,"会员卡权益")
}
//会员卡列表
function getVipList(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getKinfo', params,"会员卡列表")
}
//会员卡详情
function getVipInfo(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getInfo', params,"会员卡详情")
}

//全部会员卡优惠券
function allVipCoupon(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getCouponInfo', params,"全部会员卡优惠券")
}

// 获取我的全部课程（有到期时间及分页版）
function my_course_all(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getLessonlist', params,"全部课程")
}

// 获取课程详情v5
function course_info5(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getinfo', params,"课程详情介绍")
}

//获取课程目录v5(会员)
function course_cata5(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getoption', params,"课程详情目录")
}

// 权益包展示数据
function rightBagInfo(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getEquityPackage', params,"权益包展示数据")
}

// 兑换权益包
function exchangeRightBag(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/addEquityPackage', params,"兑换权益包")
}

//兑换码验证
function cheek_code5(params) {
  return fetch.olsfetchpost(URI_V, 'redeem/checkredeemcode', params,"兑换码验证")
}

//兑换码兑换
function exchange_code5(params) {
  return fetch.olsfetchpost(URI_V, 'redeem/exchangeredeem', params,"兑换码兑换")
}

//扫码一对多VIP信息
function info_1Vn_v5(params) {
  return fetch.olsfetchpost(URI_V, 'redeem/lookredeemonecode', params,"扫码一对多VIP信息")
}
//验证一对多VIP有效
function check_1Vn_v5(params) {
  return fetch.olsfetchpost(URI_V, 'redeem/checkredeemonecode', params,"验证一对多VIP有效")
}
//兑换一对多VIP
function exchange_1Vn_v5(params) {
  return fetch.olsfetchpost(URI_V, 'redeem/exchangeredeem2', params,"兑换一对多VIP")
}

// 获取该用户角色列表
function getRoles(params) {
  return fetch.olsfetchpost(URI_V, 'member/getmemberrolelist', params, '获取该用户角色列表')
}

// 获取老师端权限模块列表
function getTeacherAuth(params) {
  return fetch.olsfetchpost(URI_V, 'teacher/getteacherauth', params, '获取老师端权限模块列表', true)
}

// 获取老师关联的会员卡列表
function getTeacherVipList(params) {
  return fetch.olsfetchpost(URI_V, 'teacher/getteachervipcardslist', params, '获取老师关联的会员卡列表', true)
}

// 获取老师关联的优惠券列表
function getTeacherCouponList(params) {
  return fetch.olsfetchpost(URI_V, 'teacher/getteachercouponlist', params, '获取老师关联的优惠券列表', true)
}

// 获取老师关联的权益包列表
function getTeacherRightList(params) {
  return fetch.olsfetchpost(URI_V, 'teacher/getteacherpackagelist', params, '获取老师关联的权益包列表', true)
}

// 获取老师关联班级列表
function getTeacherClassList(params) {
  return fetch.olsfetchpost(URI_V, 'classes/getteacherclasslist', params, '获取老师关联班级列表', true)
}

// 老师端获取班级学员列表
function getTeacherClassStudentList(params) {
  return fetch.olsfetchpost(URI_V, 'classes/getclassesstudentslist', params, '老师端获取班级学员列表', true)
}

// 获取会员卡基础信息
function getVipCardBaseInfo(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getvipcardinfo', params, '获取会员卡基础信息', true)
}

// 获取会员卡关联优惠券权益列表
function getVipCardCouponList(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getvipcardcoupon', params, '获取会员卡关联优惠券权益列表')
}

// 获取会员卡关联的课程权益列表
function getVipCardCourseList(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getvipcardlesson', params, '获取会员卡关联的课程权益列表')
}

// 会员卡领取
function getVipCard(params) {
  return fetch.olsfetchpost(URI_V, 'exchange/exchangevipcard', params, '会员卡领取', true)
}

// 获取权益包详情
function getRightDetail(params) {
  return fetch.olsfetchpost(URI_V, 'package/getinfo', params, '获取权益包详情', true)
}

// 领取权益包
function getRightCard(params) {
  return fetch.olsfetchpost(URI_V, 'exchange/exchangepackage', params, '领取权益包')
}

// 获取优惠券详情
function getCouponDetail(params) {
  return fetch.olsfetchpost(URI_V, 'coupon/getinfo', params, '获取优惠券详情', true)
}

// 领取优惠券
function getCoupon(params) {
  return fetch.olsfetchpost(URI_V, 'exchange/exchangecoupon', params, '领取优惠券')
}

// 更新群ID
function updateWechatGroupID(params) {
  return fetch.olsfetchpost(URI_V, 'member/setgroupids', params, '更新群ID')
}

// 老师点评学习日志
function teacherEvaluateRecord(params) {
  return fetch.olsfetchpost(URI_V, 'teacher/setteacherlogscore', params, '老师点评学习日志', true, '提交中')
}

// 老师获取学习日志点评详情
function teacherGetEvaluateReocrdDetail(params) {
  return fetch.olsfetchpost(URI_V, 'teacher/getteacherlogscoreinfo', params, '老师获取学习日志点评详情', true)
}

// 评论/回复学习日志
function commentOrReplyStudyReocrd(params) {
  return fetch.olsfetchpost(URI_V, 'comment/setstudylogcommemt', params, '评论/回复学习日志', true, '提交中')
}

// 删除学习日志评论/回复
function deleteStudyReocrdComment(params) {
  return fetch.olsfetchpost(URI_V, 'comment/delstudylogcommemt', params, '删除学习日志评论/回复', true, '删除中')
}

// 课程详情页结课考试数据显示样式
function endTestShow(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getPaper', params, '课程详情页结课考试数据显示样式')
}

//我的学情
function learningSituation(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getCourseData', params,"我的学情",true,"学情加载中")
}
//后台推荐课程（关联后台推荐按钮）
function coursePushList(params) {
  return fetch.olsfetchpost(URI_V, 'coupon/getCodePushList', params,"后台推荐课程")
}
//全部会员卡课程
function allVipCourse(params) {
  return fetch.olsfetchpost(URI_V, 'vipcard/getLessonCourse', params,"全部会员课程")
}
//获取课程列表
function grade_course5(params) {
  return fetch.olsfetchpost(URI_V, 'lesson/getlist', params,"科目下课程列表")
}

//课后作业、结课考试时长统计
function setstudentstudy(params) {
  return fetch.olsfetchpost(URI_V, 'study/setstudentstudy', params,"课后作业、结课考试时长统计")
}

/*---------------------------------------------------测试整合版本------------------------------------------ */

/*---------------------------------------------------未整合版本正式------------------------------------------- */
// // 答题上传图片（公用）
// function addImg() {
//   return URI + "/annex/upload"
// }

// //分享判断（公用）
// function judge_share4(params) {
//   return fetch.olsfetchpost(URI, 'share/getinterface', params,"分享判断",true,"分享加载中")
// }

// // 自定义分享标题title（公用）
// function shareHead(params) {
//   return fetch.olsfetchpost(URI, 'basic/getPublicData', params, '自定义分享标题title')
// }

// //权限对应老师信息（公用）
// function couponTea(params) {
//   return fetch.olsfetchpost(URI, 'basic/getteacherinfo', params,"权限对应老师信息")
// }

// // 获取广告弹窗数据（公用）
// function getAdWindow(params) {
//   return fetch.olsfetchpost(URI, 'ad/getlist', params, '获取广告弹窗数据')
// }

// //获取平台人数（公用）
// function user_number(params) {
//   return fetch.olsfetchpost(URI, 'basic/getmembernum', params)
// }

// // 假人头像
// function dummy() {
//   return URI_base
// }
// // 新建日志 上传附件路径
// function getRecordUploadPath_h5() {
//   return URI_base+'static/uploadH5/uploadH5New.html'
// }

// // 7v1介绍 h5
// function get7v1Intro_h5() {
//   return URI_base+'static/7v1/index.html'
// }
  // // 小程序直播接入 
  // function getclassroom(params) { 
  //   return fetch.olsfetchpost(URI, 'classroom/getclassroom', params) 
  // //   return fetch.olsfetchpost(URI_V, 'classroom/getclassroom', params) 
  // } 
  //  
  // // 添加地址 
  // function add_adress(params) { 
  //   return fetch.olsfetchpost(URI, 'address/addinfo', params) 
  // //   return fetch.olsfetchpost(URI_V, 'address/addinfo', params) 
  // } 
  //  
  // // 获取地址 
  // function getdefault(params) { 
  //   return fetch.olsfetchpost(URI, 'address/getdefault', params) 
  // //   return fetch.olsfetchpost(URI_V, 'address/getdefault', params) 
  // } 
  //  
  // // 更新地址 
  // function setinfo(params) { 
  //   return fetch.olsfetchpost(URI, 'address/setinfo', params) 
  // //   return fetch.olsfetchpost(URI_V, 'address/setinfo', params) 
  // } 
  //  
  // // 答题上传图片 
  // function addImg() { 
  //   return URI + "/annex/upload" 
  // //   return URI_V + "/annex/upload" 
  // } 
  //  

  //  
  // // 首页年级选择 
  // function getlist(params) { 
  //   return fetch.olsfetchpost(URI, 'grade/getlist', params,"首页年级") 
  // //   return fetch.olsfetchpost(URI_V, 'grade/getlist', params,"首页年级") 
  // } 
  //  
  // // 获取学科 
  // function discipline(params) { 
  //   return fetch.olsfetchpost(URI, 'discipline/getlist', params,"获取学科") 
  // //   return fetch.olsfetchpost(URI_V, 'discipline/getlist', params,"获取学科") 
  // } 
  //  
  // // 获取专题 
  // function gettoplist(params) { 
  //   return fetch.olsfetchpost(URI, 'category/gettoplist', params,"获取专题") 
  //   return fetch.olsfetchpost(URI_, 'category/gettoplist', params,"获取专题") 
  // } 
  //  
  // // 获取全部订单 
  // function order_all(params) { 
  //   return fetch.olsfetchpost(URI, 'order/getlist', params,"全部订单") 
  // //   return fetch.olsfetchpost(URI_V, 'order/getlist', params,"全部订单") 
  // } 
  //  
  // // 获取全部订单(拼团) 
  // function order_all3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/order/getlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'order/getlist', params) 
  // } 
  //  
  // //待支付 
  // function order_wait(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/order/getwaitlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'order/getwaitlist', params) 
  // } 
  //  
  // //已支付 
  // function order_ed(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/order/getpaylist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'order/getpaylist', params) 
  // } 
  //  
  // //已关闭 
  // function order_close(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/order/getcloselist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'order/getcloselist', params) 
  // } 
  //  
  // // 获取全部错题 
  // function wrong(params) { 
  //   return fetch.olsfetchpost(URI, 'wrong/getlist', params,"全部错题") 
  // //   return fetch.olsfetchpost(URI_V, 'wrong/getlist', params,"全部错题") 
  // } 
  //  
  // // 获取测评试题（已登录） 
  // function test_ques1(params) { 
  //   return fetch.olsfetchpost(URI, 'paper/gettestlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/gettestlist', params) 
  // } 
  //  
  // // 获取测评试题（未登录） 
  // function test_ques2(params) { 
  //   return fetch.olsfetchpost(URI, 'v2/paper/gettestlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/gettestlist', params) 
  // } 
  //  
  
  //  
  // //传年级 
  // function grade_update(params) { 
  //   return fetch.olsfetchpost(URI, 'member/update', params) 
  // //   return fetch.olsfetchpost(URI_V, 'member/update', params) 
  // } 
  //  
 
  //  
  // //获取课程讲义列表 
  // function handout(params) { 
  //   return fetch.olsfetchpost(URI, 'lesson/getannex', params,"课程讲义") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getannex', params,"课程讲义") 
  // } 
  //  
  // //获取课程视频链接 
  // function getvideo(params) { 
  //   return fetch.olsfetchpost(URI, 'lesson/getvideo', params,"获取课程视频") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getvideo', params,"获取课程视频") 
  // } 
  //  
  // //获取课程视频断点时间——1.2 
  // function getvideo_info(params) { 
  //   return fetch.olsfetchpost(URI, 'study/getvideoline', params,"获取课程视频断点") 
  // //   return fetch.olsfetchpost(URI_V, 'study/getvideoline', params,"获取课程视频断点") 
  // } 
  //  
  // //课程预支付 
  // function preorder(params) { 
  //   return fetch.olsfetchpost(URI, 'wepay/preorder', params) 
  // //   return fetch.olsfetchpost(URI_V, 'wepay/preorder', params) 
  // } 
  //  
  // //拼团预支付 
  // function group_preorder3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/wepay/pregrouporder', params,"拼团预支付") 
  // //   return fetch.olsfetchpost(URI_V, 'wepay/pregrouporder', params,"拼团预支付") 
  // } 
  //  
  // //订单详情 
  // function order_detail(params) { 
  //   return fetch.olsfetchpost(URI, 'order/getinfo', params) 
  // //   return fetch.olsfetchpost(URI_V, 'order/getinfo', params) 
  // } 
  //  
  // //视频结束更新状态——1.2 
  // function video_end(params) { 
  //   return fetch.olsfetchpost(URI, 'study/setfinishvideoline', params) 
  // //   return fetch.olsfetchpost(URI_V, 'study/setfinishvideoline', params) 
  // } 
  //  
  // //视频开始更新状态——1.2 
  // function video_start(params) { 
  //   return fetch.olsfetchpost(URI, 'study/setbeginvideoline', params) 
  // //   return fetch.olsfetchpost(URI_V, 'study/setbeginvideoline', params) 
  // } 
  //  
  // //测评试题id 
  // function test_id(params) { 
  //   return fetch.olsfetchpost(URI, 'paper/getidlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/getidlist', params) 
  // } 
  //  
  // //测评答题状态初始化 
  // function setmark(params) { 
  //   return fetch.olsfetchpost(URI, 'mark/setmark', params) 
  // //   return fetch.olsfetchpost(URI_V, 'mark/setmark', params) 
  // } 
  //  
  // //测评试卷概要 
  // function test_explain(params) { 
  //   return fetch.olsfetchpost(URI, 'paper/getinfo', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/getinfo', params) 
  // } 
  //  
  // //测评试卷单个试题详情 
  // function ques_detail(params) { 
  //   return fetch.olsfetchpost(URI, 'paper/getquestion', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/getquestion', params) 
  // } 
  //  
  // //试卷基本信息（课后作业、结课考试通用） 
  // function ques_info(params) { 
  //   return fetch.olsfetchpost(URI, 'paper/getpaper', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/getpaper', params) 
  // } 
  //  
  // //试卷基本信息（测评） 
  // function testques_info(params) { 
  //   return fetch.olsfetchpost(URI, 'paper/gettestpaper', params) 
  // //   return fetch.olsfetchpost(URI_V, 'paper/gettestpaper', params) 
  // } 
  //  
  // //测评试卷答案提交 
  // function cp_ans_submit(params) { 
  //   return fetch.olsfetchpost(URI, 'mark/submittestquestion', params,"测评试卷答案提交") 
  // //   return fetch.olsfetchpost(URI_V, 'mark/submittestquestion', params,"测评试卷答案提交") 
  // } 
  //  
  // //作业答案提交 
  // function work_submit(params) { 
  //   return fetch.olsfetchpost(URI, 'mark/submitquestion', params,"作业答案提交") 
  // //   return fetch.olsfetchpost(URI_V, 'mark/submitquestion', params,"作业答案提交") 
  // } 
  //  
  // //更新测评试卷状态 
  // function update_cpsubmit(params) { 
  //   return fetch.olsfetchpost(URI, 'mark/submittestmark', params,"更新测评试卷状态") 
  // //   return fetch.olsfetchpost(URI_V, 'mark/submittestmark', params,"更新测评试卷状态") 
  // } 
  //  
  // //更新试卷状态 
  // function update_testsubmit(params) { 
  //   return fetch.olsfetchpost(URI, 'mark/submitmark', params,"更新试卷状态") 
  // //   return fetch.olsfetchpost(URI_V, 'mark/submitmark', params,"更新试卷状态") 
  // } 
  //  
  // //测评报告 
  // function cp_report(params) { 
  //   return fetch.olsfetchpost(URI, 'report/gettestchart', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/gettestchart', params) 
  // } 
  //  
  // //测评点评 
  // function cp_comment(params) { 
  //   return fetch.olsfetchpost(URI, 'report/getcommentlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getcommentlist', params) 
  // } 
  //  
  // //测评某一试题详情 
  // function cp_analysis(params) { 
  //   return fetch.olsfetchpost(URI, 'report/getquestion', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getquestion', params) 
  // } 
  //  
  // //某个测评试卷答题卡数据列表 
  // function cp_ans_id(params) { 
  //   return fetch.olsfetchpost(URI, 'report/getmarkcard', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getmarkcard', params) 
  // } 
  //  
  // //错题详情id列表 
  // function wrong_id(params) { 
  //   return fetch.olsfetchpost(URI, 'wrong/getidlist', params) 
  // //   return fetch.olsfetchpost(URI_V, 'wrong/getidlist', params) 
  // } 
  //  
  // //错题详情id列表 
  // function wrong_detail(params) { 
  //   return fetch.olsfetchpost(URI, 'wrong/getquestion', params) 
  // //   return fetch.olsfetchpost(URI_V, 'wrong/getquestion', params) 
  // } 
  //  
  // //课程直播链接获取 
  // function get_live(params) { 
  //   return fetch.olsfetchpost(URI, 'lesson/getmtcourseurl', params) 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getmtcourseurl', params) 
  // } 
  //  
  // //（课后作业、结课考试）报告 
  // function test_report(params) { 
  //   return fetch.olsfetchpost(URI, 'report/getchart', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getchart', params) 
  // } 
  //  
  // //结课报告1 
  // function end_report1(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/report/getstudyday', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getstudyday', params) 
  // } 
  //  
  // //结课报告2 
  // function end_report2(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/report/getstudyearlynight', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getstudyearlynight', params) 
  // } 
  //  
  // //结课报告3 
  // function end_report3(params) { 
  //   return fetch.olsfetchpost(URI, 'report/getstudyinfo', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getstudyinfo', params) 
  // } 
  //  
  // //结课报告4 
  // function end_report4(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/report/getstudyresult', params) 
  // //   return fetch.olsfetchpost(URI_V, 'report/getstudyresult', params) 
  // } 
  //  
  // //获取免费课 
  // function get_free(params) { 
  //   return fetch.olsfetchpost(URI, 'wepay/freeorder', params,"免费课领取") 
  // //   return fetch.olsfetchpost(URI_V, 'wepay/freeorder', params,"免费课领取") 
  // } 
  //  
  //  
  // //获取试卷推荐课程数据 
  // function getpushlist(params) { 
  //   return fetch.olsfetchpost(URI, 'report/getpushlist', params,"获取试卷推荐课程数据") 
  // //   return fetch.olsfetchpost(URI_V, 'report/getpushlist', params,"获取试卷推荐课程数据") 
  // } 
  //  
  // //视频页其他信息 
  // function getplaypushlist(params) { 
  //   return fetch.olsfetchpost(URI, 'lesson/getplaypushlist', params,"获取视频页附加信息") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getplaypushlist', params,"获取视频页附加信息") 
  // } 
  //  
  // //授权头像 
  // function avatar_update(params) { 
  //   return fetch.olsfetchpost(URI, 'member/upinfo', params,"获取头像") 
  // //   return fetch.olsfetchpost(URI_V, 'member/upinfo', params,"获取头像") 
  // } 
  //  
  // //试卷开始学习记录 
  // function test_start(params) { 
  //   return fetch.olsfetchpost(URI, 'study/setbeginstudy', params,"试卷开始学习记录") 
  // //   return fetch.olsfetchpost(URI_V, 'study/setbeginstudy', params,"试卷开始学习记录") 
  // } 
  //  
  // //试卷结束学习记录 
  // function test_end(params) { 
  //   return fetch.olsfetchpost(URI, 'study/setfinishstudy', params,"试卷结束学习记录") 
  // //   return fetch.olsfetchpost(URI_V, 'study/setfinishstudy', params,"试卷结束学习记录") 
  // } 
  //  
  // //热门课程 
  // function hot_list4(params) { 
  //   return fetch.olsfetchpost(URI, 'v4/group/gethotlist', params,"热门课程",false,"课程加载中...") 
  // //   return fetch.olsfetchpost(URI_V, 'group/gethotlist', params,"热门课程",false,"课程加载中...") 
  // } 
  //  
  // //拼团未支付删除v3 
  // function group_del3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/order/deldata', params) 
  // //   return fetch.olsfetchpost(URI_V, 'order/deldata', params) 
  // } 
  //  
  // //拼团课程详情_团详情数据 
  // function group_detail3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/group/getgrouplist', params,"团详情") 
  // //   return fetch.olsfetchpost(URI_V, 'group/getgrouplist', params,"团详情") 
  // } 
  //  
  // //团分享v3 
  // function group_share3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/share/getinterface', params) 
  // //   return fetch.olsfetchpost(URI_V, 'share/getinterface', params) 
  // } 
  //  
  // //获取全部拼团 
  // function all_group3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/group/getlessongrouplist', params,"获取全部拼团") 
  // //   return fetch.olsfetchpost(URI_V, 'group/getlessongrouplist', params,"获取全部拼团") 
  // } 
  //  
  // //轮播图 
  // function banner3(params) { 
  //   return fetch.olsfetchpost(URI, 'v3/banner/getlist', params,"轮播") 
  // //   return fetch.olsfetchpost(URI_V, 'banner/getlist', params,"轮播") 
  // } 
  //  
  // // 老师端获取学员列表 
  // function teacherGetStudentsList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/classes/getteacherstudentslist', params, "老师端获取学员列表", true) 
  // //   return fetch.olsfetchpost(URI_V, 'classes/getteacherstudentslist', params, "老师端获取学员列表", true) 
  // } 
  //  
  // // 获取日志标签列表 
  // function getReocrdTagList(params) { 
  //   return fetch.olsfetchpost(URI, 'log/log/getTags', params, "获取日志标签列表", true) 
  // //   return fetch.olsfetchpost(URI_V, 'log/log/getTags', params, "获取日志标签列表", true) 
  // }  
  //  
  // // 提交日志 
  // function submitReocrd(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/studylog/addLog', params, '提交日志', true, "提交中") 
  // //   return fetch.olsfetchpost(URI_V, 'studylog/addLog', params, '提交日志', true, "提交中") 
  // } 
  //  
  // // 获取学生某一天的日志列表 
  // function getStudentRecordListByDay(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/studylog/dayLog', params, "获取学生某一天的日志列表", true) 
  // //   return fetch.olsfetchpost(URI_V, 'studylog/dayLog', params, "获取学生某一天的日志列表", true) 
  // }  
  //  
  // // 查看日期段内学生日志情况 
  // function getPeriodRecordStatusList(params) { 
  //   return fetch.olsfetchpost(URI, 'log/log/dateLog', params, '查看日期段内学生日志情况', true) 
  // //   return fetch.olsfetchpost(URI_V, 'log/log/dateLog', params, '查看日期段内学生日志情况', true) 
  // } 
  //  
  // // 获取学生课时信息 
  // function getStudentCourseHourInfo(params) { 
  //   return fetch.olsfetchpost(URI, 'log/log/stu_info', params, '获取学生课时信息') 
  // //   return fetch.olsfetchpost(URI_V, 'log/log/stu_info', params, '获取学生课时信息') 
  // } 
  //  
  // // 获取消课记录列表 
  // function getClearCourseHourList(params) { 
  //   return fetch.olsfetchpost(URI, 'log/log/stu_XiaoCourse', params, '获取消课记录列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'log/log/stu_XiaoCourse', params, '获取消课记录列表', true) 
  // } 
  //  
  // // 上传日志图片/视频 
  // function recordUploadFile(filePath) { 
  //   return fetch.olsfetchUpload(URI, 'log/upload/upload', filePath, '上传日志图片/视频') 
  // //   return fetch.olsfetchUpload(URI_V, 'log/upload/upload', filePath, '上传日志图片/视频') 
  // } 
  //  
  // // 获取学生最新日志 
  // function getStudentNewRecord(params) { 
  //   return fetch.olsfetchpost(URI, 'log/log/stu_xinLog', params, '获取学生最新日志') 
  // //   return fetch.olsfetchpost(URI_V, 'log/log/stu_xinLog', params, '获取学生最新日志') 
  // } 
  //  
  // // 新建日志 上传附件路径 

  //  
  // // 判断用户和某个学生之间有无关系 
  // function haveRelationWithStudent(params) { 
  //   return fetch.olsfetchpost(URI, 'log/teacher/stu_isshow', params, '判断用户和某个学生之间有无关系', true) 
  // //   return fetch.olsfetchpost(URI_V, 'log/teacher/stu_isshow', params, '判断用户和某个学生之间有无关系', true) 
  // } 
  //  
  // //vip预支付 
  // function v4_vipPreorder(params) { 
  //   return fetch.olsfetchpost(URI, 'v4/wepay/precardorder', params,"vip卡预支付",true,"请稍后") 
  // //   return fetch.olsfetchpost(URI_V, 'wepay/precardorder', params,"vip卡预支付",true,"请稍后") 
  // } 
  //  
  // // 家长获取自家孩子列表 
  // function parentGetChildsList(params) { 
  //   return fetch.olsfetchpost(URI, 'log/teacher/getChildrenList', params, '家长获取自家孩子列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'log/teacher/getChildrenList', params, '家长获取自家孩子列表', true) 
  // } 
  //  
  // // 刷新用户基本信息 
  // function refreshUserInfo(params) { 
  //   return fetch.olsfetchpost(URI, 'v4/member/getinfo', params, '刷新用户基本信息') 
  // //   return fetch.olsfetchpost(URI_V, 'member/getinfo', params, '刷新用户基本信息') 
  // } 
  //  
 
  // // 获取名师列表 
  // function v5_getTeacherList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/famousteacher/getlist', params, '获取名师列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'famousteacher/getlist', params, '获取名师列表', true) 
  // } 
  //  
  // // 获取名师列表 
  // function v5_getTeacherIntro(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/famousteacher/getinfo', params, '获取名师详情', true) 
  // //   return fetch.olsfetchpost(URI_V, 'famousteacher/getinfo', params, '获取名师详情', true) 
  // } 
  //  
  //  
  //  
  // // 获取用户openid 与 session_key 
  // function getLoginUserIdentify(params) { 
  //   return fetch.olsfetchpost(URI, 'v4/login/getpassword', params, '获取用户openid 与 session_key') 
  // //   return fetch.olsfetchpost(URI_V, 'login/getpassword', params, '获取用户openid 与 session_key') 
  // } 
  //  
  // //消息订阅 
  // function subMsg(params) { 
  //   return fetch.olsfetchpost(URI, 'v4/course_apply/addcourseapply', params,"订阅消息") 
  // //   return fetch.olsfetchpost(URI_V, 'course_apply/addcourseapply', params,"订阅消息") 
  // } 
  // //优惠券列表 
  // function couponList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/coupon/getcouponinfolist', params,"优惠券列表") 
  // //   return fetch.olsfetchpost(URI_V, 'coupon/getcouponinfolist', params,"优惠券列表") 
  // } 
  // //优惠券开启状态 
  // function couponShow(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/coupon/getcouponstatus', params,"优惠券开启状态") 
  // //   return fetch.olsfetchpost(URI_V, 'coupon/getcouponstatus', params,"优惠券开启状态") 
  // } 
  //  
  //  
  //  
  // //试听课 
  // function auditionVideo(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/basic/getVideo', params,"试听课") 
  // //   return fetch.olsfetchpost(URI_V, 'basic/getVideo', params,"试听课") 
  // } 
  //  
  //  
  // //会员列表（预弃用） 
  // // function v4_viplist(params) { 
  // //   return fetch.olsfetchpost(URI, 'v4/vipcard/getviplist', params,"会员卡列表") 
  // // } 
  // //我的页面vip信息（预弃用） 
  // // function v4_myVip(params) { 
  // //   return fetch.olsfetchpost(URI, 'v4/vipcard/getvipcard', params,"我的vip") 
  // // } 
  //  
  // //会员列表 
  // function v5_viplist(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getviplist', params,"会员卡列表") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getviplist', params,"会员卡列表") 
  // } 
  // //会员卡权益 
  // function vipRight(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/basic/vipcard_image', params,"会员卡权益") 
  // //   return fetch.olsfetchpost(URI_V, 'basic/vipcard_image', params,"会员卡权益") 
  // } 
  // //会员卡列表 
  // function getVipList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getKinfo', params,"会员卡列表") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getKinfo', params,"会员卡列表") 
  // } 
  // //会员卡详情 
  // function getVipInfo(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getInfo', params,"会员卡详情") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getInfo', params,"会员卡详情") 
  // } 
  //  
  // //全部会员卡优惠券 
  // function allVipCoupon(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getCouponInfo', params,"全部会员卡优惠券") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getCouponInfo', params,"全部会员卡优惠券") 
  // } 

  //  
  // // 获取我的全部课程（有到期时间及分页版） 
  // function my_course_all(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getLessonlist', params,"全部课程") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getLessonlist', params,"全部课程") 
  // } 

  //  
  // // 获取课程详情v5 
  // function course_info5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/lesson/getinfo', params,"课程详情介绍") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getinfo', params,"课程详情介绍") 
  // } 
  //  

  //  
  // //获取课程目录v5(会员) 
  // function course_cata5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/lesson/getoption', params,"课程详情目录") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getoption', params,"课程详情目录") 
  // } 
 
  //  
  // // 权益包展示数据 
  // function rightBagInfo(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getEquityPackage', params,"权益包展示数据") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getEquityPackage', params,"权益包展示数据") 
  // } 
  //  
  // // 兑换权益包 
  // function exchangeRightBag(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/addEquityPackage', params,"兑换权益包") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/addEquityPackage', params,"兑换权益包") 
  // } 
  //  

  // //兑换码验证 
  // function cheek_code5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/redeem/checkredeemcode', params,"兑换码验证") 
  // //   return fetch.olsfetchpost(URI_V, 'redeem/checkredeemcode', params,"兑换码验证") 
  // } 
  //  
 
  // //兑换码兑换 
  // function exchange_code5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/redeem/exchangeredeem', params,"兑换码兑换") 
  // } 
  //  
  // //扫码一对多VIP信息 
  // function info_1Vn_v5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/redeem/lookredeemonecode', params,"扫码一对多VIP信息") 
  // //   return fetch.olsfetchpost(URI_V, 'redeem/lookredeemonecode', params,"扫码一对多VIP信息") 
  // } 
  // //验证一对多VIP有效 
  // function check_1Vn_v5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/redeem/checkredeemonecode', params,"验证一对多VIP有效") 
  // //   return fetch.olsfetchpost(URI_V, 'redeem/checkredeemonecode', params,"验证一对多VIP有效") 
  // } 
  // //兑换一对多VIP 
  // function exchange_1Vn_v5(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/redeem/exchangeredeem2', params,"兑换一对多VIP") 
  // //   return fetch.olsfetchpost(URI_V, 'redeem/exchangeredeem2', params,"兑换一对多VIP") 
  // } 
  //  
  //  
  // // 获取该用户角色列表 
  // function getRoles(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/member/getmemberrolelist', params, '获取该用户角色列表') 
  // //   return fetch.olsfetchpost(URI_V, 'member/getmemberrolelist', params, '获取该用户角色列表') 
  // } 
  //  
  // // 获取老师端权限模块列表 
  // function getTeacherAuth(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/teacher/getteacherauth', params, '获取老师端权限模块列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'teacher/getteacherauth', params, '获取老师端权限模块列表', true) 
  // } 
  //  
  // // 获取老师关联的会员卡列表 
  // function getTeacherVipList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/teacher/getteachervipcardslist', params, '获取老师关联的会员卡列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'teacher/getteachervipcardslist', params, '获取老师关联的会员卡列表', true) 
  // } 
  //  
  // // 获取老师关联的优惠券列表 
  // function getTeacherCouponList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/teacher/getteachercouponlist', params, '获取老师关联的优惠券列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'teacher/getteachercouponlist', params, '获取老师关联的优惠券列表', true) 
  // } 
  //  
  // // 获取老师关联的权益包列表 
  // function getTeacherRightList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/teacher/getteacherpackagelist', params, '获取老师关联的权益包列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'teacher/getteacherpackagelist', params, '获取老师关联的权益包列表', true) 
  // } 
  //  
  // // 获取老师关联班级列表 
  // function getTeacherClassList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/classes/getteacherclasslist', params, '获取老师关联班级列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'classes/getteacherclasslist', params, '获取老师关联班级列表', true) 
  // } 
  //  
  // // 老师端获取班级学员列表 
  // function getTeacherClassStudentList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/classes/getclassesstudentslist', params, '老师端获取班级学员列表', true) 
  // //   return fetch.olsfetchpost(URI_V, 'classes/getclassesstudentslist', params, '老师端获取班级学员列表', true) 
  // } 
  //  
  // // 获取会员卡基础信息 
  // function getVipCardBaseInfo(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getvipcardinfo', params, '获取会员卡基础信息', true) 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getvipcardinfo', params, '获取会员卡基础信息', true) 
  // } 
  //  
  // // 获取会员卡关联优惠券权益列表 
  // function getVipCardCouponList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getvipcardcoupon', params, '获取会员卡关联优惠券权益列表') 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getvipcardcoupon', params, '获取会员卡关联优惠券权益列表') 
  // } 
  //  
  // // 获取会员卡关联的课程权益列表 
  // function getVipCardCourseList(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getvipcardlesson', params, '获取会员卡关联的课程权益列表') 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getvipcardlesson', params, '获取会员卡关联的课程权益列表') 
  // } 
  //  
  // // 会员卡领取 
  // function getVipCard(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/exchange/exchangevipcard', params, '会员卡领取', true) 
  // //   return fetch.olsfetchpost(URI_V, 'exchange/exchangevipcard', params, '会员卡领取', true) 
  // } 
  //  
  // // 获取权益包详情 
  // function getRightDetail(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/package/getinfo', params, '获取权益包详情', true) 
  // //   return fetch.olsfetchpost(URI_V, 'package/getinfo', params, '获取权益包详情', true) 
  // } 
  //  
  // // 领取权益包 
  // function getRightCard(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/exchange/exchangepackage', params, '领取权益包') 
  // //   return fetch.olsfetchpost(URI_V, 'exchange/exchangepackage', params, '领取权益包') 
  // } 
  //  
  // // 获取优惠券详情 
  // function getCouponDetail(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/coupon/getinfo', params, '获取优惠券详情', true) 
  // //   return fetch.olsfetchpost(URI_V, 'coupon/getinfo', params, '获取优惠券详情', true) 
  // } 
  //  
  // // 领取优惠券 
  // function getCoupon(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/exchange/exchangecoupon', params, '领取优惠券') 
  // //   return fetch.olsfetchpost(URI_V, 'exchange/exchangecoupon', params, '领取优惠券') 
  // } 
  //  
  // // 更新群ID 
  // function updateWechatGroupID(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/member/setgroupids', params, '更新群ID') 
  // //   return fetch.olsfetchpost(URI_V, 'member/setgroupids', params, '更新群ID') 
  // } 
  //  
  // // 老师点评学习日志 
  // function teacherEvaluateRecord(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/teacher/setteacherlogscore', params, '老师点评学习日志', true, '提交中') 
  // //   return fetch.olsfetchpost(URI_V, 'teacher/setteacherlogscore', params, '老师点评学习日志', true, '提交中') 
  // } 
  //  
  // // 老师获取学习日志点评详情 
  // function teacherGetEvaluateReocrdDetail(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/teacher/getteacherlogscoreinfo', params, '老师获取学习日志点评详情', true) 
  // //   return fetch.olsfetchpost(URI_V, 'teacher/getteacherlogscoreinfo', params, '老师获取学习日志点评详情', true) 
  // } 
  //  
  // // 评论/回复学习日志 
  // function commentOrReplyStudyReocrd(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/comment/setstudylogcommemt', params, '评论/回复学习日志', true, '提交中') 
  // //   return fetch.olsfetchpost(URI_V, 'comment/setstudylogcommemt', params, '评论/回复学习日志', true, '提交中') 
  // } 
  //  
  // // 删除学习日志评论/回复 
  // function deleteStudyReocrdComment(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/comment/delstudylogcommemt', params, '删除学习日志评论/回复', true, '删除中') 
  // //   return fetch.olsfetchpost(URI_V, 'comment/delstudylogcommemt', params, '删除学习日志评论/回复', true, '删除中') 
  // } 
  //  
  // // 课程详情页结课考试数据显示样式 
  // function endTestShow(params) { 
  //   return fetch.olsfetchpost(URI, 'v6/lesson/getPaper', params, '课程详情页结课考试数据显示样式') 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getPaper', params, '课程详情页结课考试数据显示样式') 
  // } 
  //  
  // //我的学情 
  // function learningSituation(params) { 
  //   return fetch.olsfetchpost(URI, 'v7/lesson/getCourseData', params,"我的学情",true,"学情加载中") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getCourseData', params,"我的学情",true,"学情加载中") 
  // } 
  // //后台推荐课程（关联后台推荐按钮） 
  // function coursePushList(params) { 
  //   return fetch.olsfetchpost(URI, 'v7/coupon/getCodePushList', params,"后台推荐课程") 
  // //   return fetch.olsfetchpost(URI_V, 'coupon/getCodePushList', params,"后台推荐课程") 
  // } 
  // //全部会员卡课程 
  // function allVipCourse(params) { 
  //   return fetch.olsfetchpost(URI, 'v5/vipcard/getLessonCourse', params,"全部会员课程") 
  // //   return fetch.olsfetchpost(URI_V, 'vipcard/getLessonCourse', params,"全部会员课程") 
  // } 
  // //获取课程列表 
  // function grade_course5(params) { 
  //   return fetch.olsfetchpost(URI, 'v7/lesson/getlist', params,"科目下课程列表") 
  // //   return fetch.olsfetchpost(URI_V, 'lesson/getlist', params,"科目下课程列表") 
  // } 
  //  
  // //课后作业、结课考试时长统计 
  // function setstudentstudy(params) { 
  //   return fetch.olsfetchpost(URI, '/study/setstudentstudy', params,"课后作业、结课考试时长统计") 
  // //   return fetch.olsfetchpost(URI_V, '/study/setstudentstudy', params,"课后作业、结课考试时长统计") 
  // } 
   
  



module.exports = { login, getclassroom, add_adress, getdefault, setinfo, getlist, discipline, gettoplist, order_all, wrong, test_ques1, test_ques2, grade_update, handout, getvideo, getvideo_info, preorder, order_detail, order_wait, order_ed, order_close, test_id, setmark, test_explain, ques_detail, ques_info, cp_ans_submit, update_cpsubmit, cp_report, cp_analysis, cp_ans_id, wrong_id, wrong_detail, get_live, work_submit, cp_comment, update_testsubmit, test_report, end_report1, end_report2, end_report3, end_report4, get_free, user_number, getpushlist, testques_info, getplaypushlist, avatar_update, video_end, video_start, test_start, test_end,hot_list4,group_preorder3,order_all3,group_del3,group_detail3,group_share3,all_group3,banner3,v4_vipPreorder,judge_share4, teacherGetStudentsList, getReocrdTagList, submitReocrd, getStudentRecordListByDay, getPeriodRecordStatusList, getStudentCourseHourInfo, getClearCourseHourList, recordUploadFile, getStudentNewRecord, getRecordUploadPath_h5, haveRelationWithStudent,addImg,parentGetChildsList,dummy,refreshUserInfo, get7v1Intro_h5,v5_getTeacherList,v5_getTeacherIntro, getAdWindow, getLoginUserIdentify,subMsg,couponList,couponShow,couponTea,coursePushList,auditionVideo,v5_viplist,vipRight,getVipList,getVipInfo,allVipCourse,allVipCoupon,my_course_all,course_info5,rightBagInfo,exchangeRightBag,course_cata5,grade_course5,cheek_code5,exchange_code5,info_1Vn_v5,check_1Vn_v5,exchange_1Vn_v5, getRoles, getTeacherAuth, getTeacherVipList, getTeacherCouponList, getTeacherRightList, getTeacherClassList, getTeacherClassStudentList, getVipCardBaseInfo, getVipCardCouponList, getVipCardCourseList, getVipCard, getRightDetail, getRightCard, getCouponDetail, getCoupon, updateWechatGroupID, teacherEvaluateRecord, teacherGetEvaluateReocrdDetail, commentOrReplyStudyReocrd, deleteStudyReocrdComment,shareHead,endTestShow,learningSituation,setstudentstudy }
