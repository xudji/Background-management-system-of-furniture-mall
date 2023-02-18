import request from '@/api/request'

function findArticales(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}
export {
  findArticales
}
