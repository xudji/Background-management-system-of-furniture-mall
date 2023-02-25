import request from '@/api/request'
/**
 *
 * @param {*} start 开始页
 * @param {*} limit 每页几条数据
 * @param {*} data 传递的参数 {title:'',author:''}
 * @returns
 */
function findArticales(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 改变文章显示状态
function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    // eslint-disable-next-line no-undef
    data
  })
}
// 删除文章
function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'
  })
}
// 添加文章
function addArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data
  })
}
// 修改文章
function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`,

  })
}
// 更新文章
function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}

export {
  findArticales,
  changeShowStatus,
  delArticle,
  addArticle,
  productArticle,
  updateArticle
}

