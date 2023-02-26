import request from '@/api/request'

function saveAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/save`,
    method: 'post',
    data
  })
}
function addressList(data) {
  return request({
    url: `/lejuAdmin/companyAddress/addressList`,
    method: 'get',
    data
  })
}
export {
    saveAddress,
    addressList
  }
  
  