import request from '@/api/request'
function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}
function orderDetail(orderId) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${orderId}`,
    method: 'get',
  })
}
function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data
  })
}

export {
  findOrdersByPage,
  orderDetail,
  sendDone
}