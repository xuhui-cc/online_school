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




module.exports = { login, getclassroom, add_adress, getdefault, setinfo, getlist, discipline}