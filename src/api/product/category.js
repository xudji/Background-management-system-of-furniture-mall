
import request from '@/api/request'
function getAllCategory(data) {
    return request({
        url: `/lejuAdmin/category/getAllCategory`,
        method: 'get',
        data

    })
}
function getCategory(data) {
    return request({
        url: `/lejuAdmin/category/getAllCategory`, // 相对路径
        method: 'get',
        data
    })
}
export {
    getAllCategory,
    getCategory
}