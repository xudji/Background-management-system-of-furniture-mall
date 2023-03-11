import request from '@/api/request'
function adsList() {
  return request({
    url: `/lejuAdmin/advertise/adsList`,
    method: 'get',

  })
}

export {
  adsList
}