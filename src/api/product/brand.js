import request from '@/api/request'
function findAllBrand(data) {
    return request({
        url: `/lejuAdmin/brand/findAllBrand`,
        method: 'get',
        data

    })
}
export {
    findAllBrand
}