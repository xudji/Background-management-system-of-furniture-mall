import request from '@/api/request'
function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
    method: 'get',
  })
}
export {
  findAllPermissions
}