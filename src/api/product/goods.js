

import request from '@/api/request'
function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data

  })
}
function productSkusDetail(productId, data) {
  return request({
    url: `lejuAdmin/product/productSkusDetail/${productId}`,
    method: 'get',
    data

  })
}
function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data

  })
}



export {
  productsByPage,
  productSkusDetail,
  addProductAndSkus
}