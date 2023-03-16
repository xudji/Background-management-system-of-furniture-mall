import request from '@/api/request'
function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
    method: 'get',
  })
}
function findRolesByPage(start, limit, data) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
    method: 'get',
    data
  })
}
function removeRole(id) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: 'delete',
  })
}

function saveRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: 'POST',
    data
  })
}

function updateRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/updateRolePermissions`,
    method: 'PUT',
    data
  })
}
function findAllRoles() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`,
    method: 'GET'
  })
}
function getRolePermissions(id) {
  return request({
    url: `/admin/sysAuth/role/findRolePermissions/${id}`,
    method: 'get'
  })
}

function findUsersByPage(start, limit, data) {
  return request({
    url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
    method: 'POST',
    data
  })
}
function removeUser(id) {
  return request({
    url: `/admin/sysAuth/user/removeUser/${id}`,
    method: 'DELETE'
  })
}
export {
  findAllPermissions,
  findRolesByPage,
  removeRole,
  saveRolePermissions,
  updateRolePermissions,
  findAllRoles,
  getRolePermissions,
  findUsersByPage,
  removeUser
}