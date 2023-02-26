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
export {
  findAllRecommends,
  delRecommend
}

