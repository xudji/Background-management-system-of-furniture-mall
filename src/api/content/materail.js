
import request from '@/api/request'
function findMaterialByPage(start, limit) {
    return request({
        url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`,
        method: 'get',
    })
}
export {
    findMaterialByPage
}