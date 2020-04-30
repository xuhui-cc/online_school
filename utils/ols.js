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





module.exports = { login, getclassroom, add_adress, getdefault, setinfo, getlist, discipline, gettoplist, order_all, wrong, my_course_all, test_ques, grade_course, course_info, grade_update, course_cata, handout, getvideo, getvideo_info, preorder}