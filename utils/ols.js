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




module.exports = { login, getclassroom }