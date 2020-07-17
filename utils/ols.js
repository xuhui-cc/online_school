const URI = 'http://os.lingjun.net/api.php/'    //测试接口
// const URI = 'https://wsg.lingjun.net/api.php/'    //正式接口


const fetch = require('./fetch')

//登录
function login(params) {
  return fetch.olsfetchpost(URI, 'v2/login/phonelogin', params)
}

//分享判断
function judge_share(params) {
  return fetch.olsfetchpost(URI, 'share/getinterface', params)
}

// 小程序直播接入
function getclassroom(params) {
  return fetch.olsfetchpost(URI, 'classroom/getclassroom', params)
}

// 添加地址
function add_adress(params) {
  return fetch.olsfetchpost(URI, 'address/addinfo', params)
}

// 获取地址
function getdefault(params) {
  return fetch.olsfetchpost(URI, 'address/getdefault', params)
}

// 更新地址
function setinfo(params) {
  return fetch.olsfetchpost(URI, 'address/setinfo', params)
}

// 首页年级选择
function getlist(params) {
  return fetch.olsfetchpost(URI, 'grade/getlist', params)
}

// 获取学科
function discipline(params) {
  return fetch.olsfetchpost(URI, 'discipline/getlist', params)
}

// 获取专题
function gettoplist(params) {
  return fetch.olsfetchpost(URI, 'category/gettoplist', params)
}

// 获取全部订单
function order_all(params) {
  return fetch.olsfetchpost(URI, 'order/getlist', params)
}

// 获取全部订单(拼团)
function order_all3(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getlist', params)
}

//待支付
function order_wait(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getwaitlist', params)
}

//已支付
function order_ed(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getpaylist', params)
}

//已关闭
function order_close(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getcloselist', params)
}

// 获取全部错题
function wrong(params) {
  return fetch.olsfetchpost(URI, 'wrong/getlist', params)
}

// 获取我的全部课程
function my_course_all3(params) {
  return fetch.olsfetchpost(URI, 'v3/order/getLessonlist', params)
}

// 获取测评试题（已登录）
function test_ques1(params) {
  return fetch.olsfetchpost(URI, 'paper/gettestlist', params)
}

// 获取测评试题（未登录）
function test_ques2(params) {
  return fetch.olsfetchpost(URI, 'v2/paper/gettestlist', params)
}

//获取课程列表
function grade_course3(params) {
  return fetch.olsfetchpost(URI, 'v3/lesson/getlist', params)
}

// 获取课程页课程(已登录)
function grade_course1(params) {
  return fetch.olsfetchpost(URI, 'lesson/getlist', params)
}

// 获取课程页课程(未登录)
function grade_course2(params) {
  return fetch.olsfetchpost(URI, 'v2/lesson/getlist', params)
}

// 获取课程详情介绍(已登录)
function course_info1(params) {
  return fetch.olsfetchpost(URI, 'lesson/getinfo', params)
}

// 获取课程详情介绍(未登录)
function course_info2(params) {
  return fetch.olsfetchpost(URI, 'v2/lesson/getinfo', params)
}

// 获取课程详情v3(拼团)
function course_info3(params) {
  return fetch.olsfetchpost(URI, 'v3/lesson/getinfo', params)
}

//传年级
function grade_update(params) {
  return fetch.olsfetchpost(URI, 'member/update', params)
}

//获取课程目录(已购买)
function course_cata1(params) {
  return fetch.olsfetchpost(URI, 'lesson/getOption', params)
}

//获取课程目录(未购买)
function course_cata2(params) {
  return fetch.olsfetchpost(URI, 'v2/lesson/getoption', params)
}

//获取课程目录v3(拼团)
function course_cata3(params) {
  return fetch.olsfetchpost(URI, 'v3/lesson/getoption', params)
}

//获取课程讲义列表
function handout(params) {
  return fetch.olsfetchpost(URI, 'lesson/getannex', params)
}

//获取课程视频链接
function getvideo(params) {
  return fetch.olsfetchpost(URI, 'lesson/getvideo', params)
}

//获取课程视频断点时间——1.2
function getvideo_info(params) {
  return fetch.olsfetchpost(URI, 'study/getvideoline', params)
}


//课程预支付
function preorder(params) {
  return fetch.olsfetchpost(URI, 'wepay/preorder', params)
}

//拼团预支付
function group_preorder3(params) {
  return fetch.olsfetchpost(URI, 'v3/wepay/pregrouporder', params)
}

//订单详情
function order_detail(params) {
  return fetch.olsfetchpost(URI, 'order/getinfo', params)
}

//视频结束更新状态——1.2
function video_end(params) {
  return fetch.olsfetchpost(URI, 'study/setfinishvideoline', params)
}

//视频开始更新状态——1.2
function video_start(params) {
  return fetch.olsfetchpost(URI, 'study/setbeginvideoline', params)
}

//测评试题id
function test_id(params) {
  return fetch.olsfetchpost(URI, 'paper/getidlist', params)
}

//测评答题状态初始化
function setmark(params) {
  return fetch.olsfetchpost(URI, 'mark/setmark', params)
}

//测评试卷概要
function test_explain(params) {
  return fetch.olsfetchpost(URI, 'paper/getinfo', params)
}

//测评试卷单个试题详情
function ques_detail(params) {
  return fetch.olsfetchpost(URI, 'paper/getquestion', params)
}

//试卷基本信息（测评、课后作业、结课考试通用）
function ques_info(params) {
  return fetch.olsfetchpost(URI, 'paper/getpaper', params)
}

//试卷基本信息（测评、课后作业、结课考试通用）
function testques_info(params) {
  return fetch.olsfetchpost(URI, 'paper/gettestpaper', params)
}

//测评试卷答案提交
function cp_ans_submit(params) {
  return fetch.olsfetchpost(URI, 'mark/submittestquestion', params)
}

//作业答案提交
function work_submit(params) {
  return fetch.olsfetchpost(URI, 'mark/submitquestion', params)
}

//更新测评试卷状态
function update_cpsubmit(params) {
  return fetch.olsfetchpost(URI, 'mark/submittestmark', params)
}

//更新试卷状态
function update_testsubmit(params) {
  return fetch.olsfetchpost(URI, 'mark/submitmark', params)
}

//测评报告
function cp_report(params) {
  return fetch.olsfetchpost(URI, 'report/gettestchart', params)
}

//测评点评
function cp_comment(params) {
  return fetch.olsfetchpost(URI, 'report/getcommentlist', params)
}

//测评某一试题详情
function cp_analysis(params) {
  return fetch.olsfetchpost(URI, 'report/getquestion', params)
}

//某个测评试卷答题卡数据列表
function cp_ans_id(params) {
  return fetch.olsfetchpost(URI, 'report/getmarkcard', params)
}

//错题详情id列表
function wrong_id(params) {
  return fetch.olsfetchpost(URI, 'wrong/getidlist', params)
}

//错题详情id列表
function wrong_detail(params) {
  return fetch.olsfetchpost(URI, 'wrong/getquestion', params)
}

//课程直播链接获取
function get_live(params) {
  return fetch.olsfetchpost(URI, 'lesson/getmtcourseurl', params)
}


//（课后作业、结课考试）报告
function test_report(params) {
  return fetch.olsfetchpost(URI, 'report/getchart', params)
}

//结课报告1
function end_report1(params) {
  return fetch.olsfetchpost(URI, 'report/getstudyday', params)
}

//结课报告2
function end_report2(params) {
  return fetch.olsfetchpost(URI, 'report/getstudyearlynight', params)
}

//结课报告3
function end_report3(params) {
  return fetch.olsfetchpost(URI, 'report/getstudyinfo', params)
}

//结课报告4
function end_report4(params) {
  return fetch.olsfetchpost(URI, 'report/getstudyresult', params)
}

//获取免费课
function get_free(params) {
  return fetch.olsfetchpost(URI, 'wepay/freeorder', params)
}

//获取平台人数
function user_number(params) {
  return fetch.olsfetchpost(URI, 'basic/getmembernum', params)
}

//获取平台人数
function getpushlist(params) {
  return fetch.olsfetchpost(URI, 'report/getpushlist', params)
}

//视频页其他信息
function getplaypushlist(params) {
  return fetch.olsfetchpost(URI, 'lesson/getplaypushlist', params)
}

//授权头像
function avatar_update(params) {
  return fetch.olsfetchpost(URI, 'member/upinfo', params)
}

//试卷开始学习记录
function test_start(params) {
  return fetch.olsfetchpost(URI, 'study/setbeginstudy', params)
}

//试卷开始学习记录
function test_end(params) {
  return fetch.olsfetchpost(URI, 'study/setfinishstudy', params)
}

//获取拼团数据列表v3
function hot_list3(params) {
  return fetch.olsfetchpost(URI, 'v3/group/gethotlist', params)
}


//拼团未支付删除v3
function group_del3(params) {
  return fetch.olsfetchpost(URI, 'v3/order/deldata', params)
}

//团详情v3
function group_detail3(params) {
  return fetch.olsfetchpost(URI, 'v3/group/getgrouplist', params)
}

//团分享v3
function group_share3(params) {
  return fetch.olsfetchpost(URI, 'v3/share/getinterface', params)
}

//团分享v3
function all_group3(params) {
  return fetch.olsfetchpost(URI, 'v3/group/getlessongrouplist', params)
}


//轮播图
function banner3(params) {
  return fetch.olsfetchpost(URI, 'v3/banner/getlist', params)
}


module.exports = { login, getclassroom, add_adress, getdefault, setinfo, getlist, discipline, gettoplist, order_all, wrong, my_course_all3, test_ques1, test_ques2, grade_course1, grade_course2, course_info1, course_info2, grade_update, course_cata1, course_cata2, handout, getvideo, getvideo_info, preorder, order_detail, order_wait, order_ed, order_close, test_id, setmark, test_explain, ques_detail, ques_info, cp_ans_submit, update_cpsubmit, cp_report, cp_analysis, cp_ans_id, wrong_id, wrong_detail, get_live, work_submit, cp_comment, update_testsubmit, test_report, end_report1, end_report2, end_report3, end_report4, get_free, user_number, getpushlist, testques_info, getplaypushlist, avatar_update, video_end, video_start, test_start, test_end,judge_share,grade_course3,course_info3,course_cata3,hot_list3,group_preorder3,order_all3,group_del3,group_detail3,group_share3,all_group3,banner3}





// //已关闭
// function order_close(params) {
//   return fetch.olsfetchpost(URI, 'order/getcloselist', params)
// }

// //已支付
// function order_ed(params) {
//   return fetch.olsfetchpost(URI, 'order/getpaylist', params)
// }

// //更新视频观看状态——1.1
// function study_pro(params) {
//   return fetch.olsfetchpost(URI, 'lesson/setloginfo', params)
// }

// //待支付
// function order_wait(params) {
//   return fetch.olsfetchpost(URI, 'order/getwaitlist', params)
// }

// //上传图片
// function upload_img(params) {
//   return fetch.olsfetchpostimg(URI, 'annex/upload', params)
// }

//获取课程视频断点时间 ——1.1
// function getvideo_info(params) {
//   return fetch.olsfetchpost(URI, 'lesson/getvideoline', params)
// }