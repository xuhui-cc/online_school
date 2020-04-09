// const URI = ''    //测试接口

const URI = ''    //正式接口


const fetch = require('./fetch')

//登录
function login(params) {
  return fetch.dshfetchpost(URI, 'login/tologin', params)
}




module.exports = { login }