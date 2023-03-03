
import request from '@/api/request'
function getAllCategory(data) {
    return request({
        url: `/lejuAdmin/category/getAllCategory`,
        method: 'get',
        data

    })
}
export {
    getAllCategory
}