let pagePath = require('./pagePath.js')
// 存储的分享参数
let shareOption = {}

// first_page页面路径
let firstPageName = 'first_page'

// 各角色首页路径
let homePageName = [
  'index',
  'teacher_studentList',
  'parent_childList'
]
// tabbar各首页路径
let tabbarPageName = [
  'logs',
  'my',
]

/**
 * 获取分享信息
 * 参数：
 *    role: 有查看分享页面权限的角色，字符串 0-未登录 1-学生 2-家长 3-老师 all-所有角色 多个角色用‘,’隔开
 *    targetPageName：分享的目标页面名字 字符串
 *    paramsStr：参数字符串  key=value&key=value&...
 *    imageUrl: 分享图片的地址
*/
function getShareReturnInfo(role, targetPageName ,paramsStr, imageUrl, title) {
  // 启动页路径
  let path = pagePath.getPagePath(firstPageName)

  // 拼接 share参数 用于打开分享卡片时在启动页判断是否是 启动页本身
  if (targetPageName == firstPageName) {
    path = path + "?share=0"
  } else {
    path = path + "?share=1"
  }
  // 拼接 role参数
  if (role && role != '' && role != null) {
    path += "&role=" + role
  } else {
    path += "&role=all"
  }
  
  // 拼接 targethome参数 用于打开分享卡片时在启动页判断是否是 各角色首页
  if (homePageName.indexOf(targetPageName) != -1) {
    path += "&targethome=1"
  }
  
  // 拼接 target参数  目标页面名字
  if (targetPageName && targetPageName != '') {
    path += "&target=" + targetPageName
  }

  // 拼接 其他传入参数
  if (paramsStr && paramsStr != '') {
    path = path + '&' + paramsStr
  }
  console.log("获取分享源路径：\n", path)
  return {
    title: title ? title : '领军网校',
    path: path,
    imageUrl: (imageUrl && imageUrl != '') ? imageUrl : '/images/other/share1.png',
    success (res) {
      console.log('分享成功')
    },
    fail (res) {
      console.log("分享失败:\n", res)
    }
  }
}

/**
 * 在firstPage页面得到跳转首页的参数
 * 参数：
 *    options：firstPage页面onLoad方法的参数对象
 *    role： 当前角色 0-未登录 1-学生 2-家长 3-老师
 * 返回值：
 *    处理后的options
*/
function getFirstPageShareParam(options, role) {
  
  if (options.role != 'all' && options.role.indexOf(String(role)) == -1) {
    // 用户角色不能查看分享页面
    console.log("用户没有查看分享页面权限")
    shareOption = {}
  } else {
    // 用户角色可以查看分享的页面
    if (homePageName.indexOf(options.target) != -1) {
      // 分享目标页为角色首页  将share变为0，以便在各角色首页判断是其本身
      options.share = 0
    }
    console.log("获取分发首页时的分享参数：\n", options)
    shareOption = options
  }
  return shareOption
}

/**
 * 处理分享跳转至目标页面
*/
function shareTarget () {
  if (shareOption.target && shareOption.share) {
    if (tabbarPageName.indexOf(shareOption.target) != -1) {
      // 分享页面为tabbar页面
      shareOption.share = 0
    }
    if (shareOption.share) {
      // 分享的页面不为tabbar页面，跳转过去
      let sharePath = getShareTargetPath()
      wx.navigateTo({
        url: sharePath,
      })
      shareOption = {}
    } else {
      // 分享的页面为 tabbar页面 切换tabbar选中item
      setTimeout(function(){
        wx.switchTab({
          url: app.getPagePath(shareOption.target),
        })
      }, 100)
    }
  } else {
    shareOption = {}
  }
}


function setShareOption(options) {
  shareOption = options
}

function getShareOption() {
  return shareOption
}

//----------------------------------------------------私有方法-------------------------------------------
/**
 * 拼接options参数
*/
function appendOptions(options) {
  let paramsStr = ''
  for(let key in options) {
    if (key == 'target' || key == 'targethome' || key == 'role' || key == 'share') {
      continue
    }
    let value = options[key]
    if (paramsStr == '') {
      paramsStr = key + '=' + value
    } else {
      paramsStr += "&" + key + "=" + value
    }
  }
  return paramsStr
}

/**
 * 各角色首页获取要分享的页面路径
 * 参数：
 *    options：onLoad回调的参数
 * 返回值：
 *    分享的目标页面路径
*/
function getShareTargetPath() {
  if (shareOption.target) {
    let targetPath = pagePath.getPagePath(shareOption.target)
    let paramsStr = appendOptions(shareOption)
    targetPath += "?" + paramsStr
    console.log("获取目标分享页面:\n", targetPath)
    return targetPath
  } else {
    return ''
  }
}


module.exports = {
  getShareReturnInfo,
  getFirstPageShareParam,
  shareTarget,
  setShareOption,
  getShareOption
}