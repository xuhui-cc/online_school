const URI = 'http://os.lingjun.net/api.php/'    //测试接口

// const URI = ''    //正式接口


const fetch = require('./fetch')

//登录
function login(params) {
  return fetch.olsfetchpost(URI, 'login/phonelogin', params)
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

//待支付
function order_wait(params) {
  return fetch.olsfetchpost(URI, 'order/getwaitlist', params)
}

//已支付
function order_ed(params) {
  return fetch.olsfetchpost(URI, 'order/getpaylist', params)
}

//已关闭
function order_close(params) {
  return fetch.olsfetchpost(URI, 'order/getcloselist', params)
}

// 获取全部错题
function wrong(params) {
  return fetch.olsfetchpost(URI, 'wrong/getlist', params)
}

// 获取我的全部课程
function my_course_all(params) {
  return fetch.olsfetchpost(URI, 'order/getLessonlist', params)
}

// 获取测评试题
function test_ques(params) {
  return fetch.olsfetchpost(URI, 'paper/gettestlist', params)
}

// 获取课程页课程
function grade_course(params) {
  return fetch.olsfetchpost(URI, 'lesson/getlist', params)
}

// 获取课程详情介绍
function course_info(params) {
  return fetch.olsfetchpost(URI, 'lesson/getinfo', params)
}

//传年级
function grade_update(params) {
  return fetch.olsfetchpost(URI, 'member/update', params)
}

//获取课程目录
function course_cata(params) {
  return fetch.olsfetchpost(URI, 'lesson/getOption', params)
}

//获取课程讲义列表
function handout(params) {
  return fetch.olsfetchpost(URI, 'lesson/getannex', params)
}

//获取课程视频链接
function getvideo(params) {
  return fetch.olsfetchpost(URI, 'lesson/getvideo', params)
}

//获取课程视频断点时间
function getvideo_info(params) {
  return fetch.olsfetchpost(URI, 'lesson/getvideoline', params)
}

//课程预支付
function preorder(params) {
  return fetch.olsfetchpost(URI, 'wepay/preorder', params)
}

//订单详情
function order_detail(params) {
  return fetch.olsfetchpost(URI, 'order/getinfo', params)
}

//更新视频观看状态
function study_pro(params) {
  return fetch.olsfetchpost(URI, 'lesson/setloginfo', params)
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


// //上传图片
// function upload_img(params) {
//   return fetch.olsfetchpostimg(URI, 'annex/upload', params)
// }

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




module.exports = { login, getclassroom, add_adress, getdefault, setinfo, getlist, discipline, gettoplist, order_all, wrong, my_course_all, test_ques, grade_course, course_info, grade_update, course_cata, handout, getvideo, getvideo_info, preorder, order_detail, order_wait, order_ed, order_close, study_pro, test_id, setmark, test_explain, ques_detail, ques_info, cp_ans_submit, update_cpsubmit, cp_report, cp_analysis, cp_ans_id, wrong_id, wrong_detail, get_live, work_submit, cp_comment, update_testsubmit, test_report, end_report1, end_report2, end_report3, end_report4, get_free}