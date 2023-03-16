

import request from '@/api/request'
function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data // 给服务器的数据

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
function productDetail(id) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${id}`, // 相对路径
    method: 'get'
  })
}
function updateProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`, // 相对路径
    method: 'post',
    data
  })
}



export {
  productsByPage,
  productSkusDetail,
  addProductAndSkus,
  updateProductAndSkus,
  productDetail

}