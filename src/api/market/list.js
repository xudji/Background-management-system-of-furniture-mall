import request from '@/api/request'

function findAllRecommends(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/findAllRecommends`,
    method: 'get',
    data
  })
}
function delRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
    method: 'delete',
  })
}
function updateRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/updateRecommend`,
    method: 'post',
    data
  })
}
function addRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/addRecommend`,
    method: 'post',
    data
  })
}

export {
  findAllRecommends,
  delRecommend,
  updateRecommend,
  addRecommend
}

