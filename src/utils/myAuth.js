// 接收token //
const LEJU_ADMIN_TOKEN = 'leju_admin_token'
const LEJU_USER_INFO = 'leju_user_info'
// 设置token
function setToken(token) {
  // 设置toke key:value
  window.localStorage.setItem(LEJU_ADMIN_TOKEN, token)
}
// 获得token
function getToken() {
  const token = window.localStorage.getItem(LEJU_ADMIN_TOKEN)
  if (token) {
    return token
  } else {
    return null
  }
}
// 删除token
function removeToken() {
  window.localStorage.removeItem(LEJU_ADMIN_TOKEN)
}
// 保存用户信息
function saveUserInfo(userInfo) {
  if (userInfo) {
    // window.localStorage.setItem 保存的是[objct objct]无法获取信息 需要转成字符串
    window.localStorage.setItem(LEJU_USER_INFO, JSON.stringify(userInfo))
  }
}
// 获得用户信息
function getUserInfo() {
  const userInfoStr = window.localStorage.getItem(LEJU_USER_INFO)
  if (userInfoStr) {
    // 使用时用对象格式
    return JSON.parse(userInfoStr)
  } else {
    return null
  }
}
// 删除用户信息
function removeUserInfo() {
  window.localStorage.removeItem(LEJU_USER_INFO)
}
export {
  setToken,
  getToken,
  removeToken,
  saveUserInfo,
  getUserInfo,
  removeUserInfo
}
