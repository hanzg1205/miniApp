
import request from '@/utils/request';

//登录接口
export let login = code => {
    return request.post('/user/code2session', 
        code
    ) 
}

// 添加面试
export let addSign = params => {
    return request.post('/sign', params)
}

// 获取面试列表
export let getList = params => {
    return request.get('/sign', params)
}

// 解密数据 
export let encryptData = params => {
    return request.post('/user/decrypt', params)
}

// 面试详情
export let getDetail = params => {
    return request.get('/sign/'+params)
}

// 更新面试详情
export let updateDetail = params => {
    return request.put('/sign/'+params.id,params.params)
}