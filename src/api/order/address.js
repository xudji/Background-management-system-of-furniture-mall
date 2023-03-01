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

function setSendOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setSendOne`,
    method: 'post',
    data
  })
}
function setReceiveOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setReceiveOne`,
    method: 'post',
    data
  })
}
export {
  saveAddress,
  addressList,
  setSendOne,
  setReceiveOne
}

