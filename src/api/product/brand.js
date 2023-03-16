import request from '@/api/request'
// 查询全部

function findAllBrand() {
  return request({
    url: '/lejuAdmin/brand/findAllBrand',
    method: 'get'
  })
}

function addBrand(data) {
  return request({
    url: '/lejuAdmin/brand/addBrand',
    method: 'post',
    data
  })
}
// 分页查询
function brandPageList(start, limit) {
  return request({
    url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`,
    method: 'get'
  })
}

function deleteBrand(id) {
  return request({
    url: `/lejuAdmin/brand/delBrand/${id}`,
    method: 'delete'
  })
}

function switchShowStatus(data) {
  return request({
    url: `/lejuAdmin/brand/switchShowStatus`,
    method: 'post',
    data
  })
}

function updateBrand(data) {
  return request({
    url: `/lejuAdmin/brand/updateBrand`,
    method: 'post',
    data
  })
}
function brandList() {
  return request({
    url: '/lejuAdmin/brand/findAllBrand', // 相对路径
    method: 'get'
  })
}
export {
  addBrand,

  switchShowStatus,
  updateBrand,
  deleteBrand,
  brandPageList,
  findAllBrand,
  brandList
}