import request from '@/api/request'

function login(data) {
  return request({
    url: '/lejuAdmin/index/login',
    method: 'post',
    data
  })
}
export {
  login
}
