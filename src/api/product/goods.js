

import request from '@/api/request'
function findBrandByPage(start, limit, data) {
    return request({
        url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`,
        method: 'get',
        data

    })
}
function productSkusDetail(productId, data) {
    return request({
        url: `lejuAdmin/product/productSkusDetail/${productId}`,
        method: 'get',
        data

    })
}

///lejuAdmin/product/productSkusDetail/{productId}
export {
    findBrandByPage,
    productSkusDetail
}