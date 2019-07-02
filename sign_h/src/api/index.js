
import request from '@/utils/request';

//登录接口
export let login = code => {
    return request.post('/user/code2session', 
        code
    ) 
}

// 添加面试
export let addSign = params => {
    console.log('params....',params)
    return request.post('/sign', params)
}
