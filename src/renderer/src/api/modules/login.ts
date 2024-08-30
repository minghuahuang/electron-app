import request from '@utils/request'
import { UserRuleForm, PhoneRuleForm, PhoneCodeForm } from '@interface/login'

interface ILoginRequest{
	code:string
	msg:string
	data?:string | null
}

export const fetchLogin = (data: UserRuleForm): Promise<ILoginRequest> => {
    return request({
        url: '/u/loginByJson',
        method: 'post',
        data
    })
}

export const fetchCaptcha = (params: { key: string }): Promise<ArrayBuffer> => {
    return request({
        url:'/captcha/image',
		responseType:'arraybuffer',
		params
    })
}

//登录动态验证码
export const fetchCaptchaByM = ( data:PhoneCodeForm ):Promise<ILoginRequest>=>{
    return request({
    	url:'/captcha/sendRegisterOrLoginCaptcha',
		params:data
    })
}

//手机验证码登录
export const fetchLoginByM = ( data:PhoneRuleForm ):Promise<ILoginRequest>=>{
    return request({
    	url:'/u/loginByMobile',
    	method:'post',
		data
    })
}