import request from '../request.js'
function findMembersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`,
    method: 'get',
    data
  })
}
export {
  findMembersByPage
}