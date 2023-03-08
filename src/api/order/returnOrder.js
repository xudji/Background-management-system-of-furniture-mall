import request from '@/api/request'
function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}
function orderReturn(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`,
  })
}
function agreeApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post',
    data
  })
}
function receiveProduct(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
    method: 'post',
    data
  })
}


export {
  findReturnApply,
  orderReturn,
  agreeApply,
  receiveProduct
}