import request from '@utils/request'

export const fetchLogin = (data) => {
    return request({
        url: '/u/loginByJson',
        method: 'post',
        data
    })
}