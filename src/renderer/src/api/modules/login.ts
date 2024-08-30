import http from '@utils/request'
import { UserRuleForm, PhoneRuleForm, PhoneCodeForm } from '@interface/login'

interface ILoginRequest{
	code:string
	msg:string
	data?:string | null
}

export const fetchLogin = (data: UserRuleForm): Promise<ILoginRequest> => {
    return http.post<ILoginRequest>('/u/loginByJson', data, {})
}

export const fetchCaptcha = (params: { key: string }): Promise<ArrayBuffer> => {
    return http.get<ArrayBuffer>('/captcha/image', params, { responseType:'arraybuffer', })
}

//登录动态验证码
export const fetchCaptchaByM = ( data:PhoneCodeForm ):Promise<ILoginRequest>=>{
    return http.get<ILoginRequest>('/captcha/sendRegisterOrLoginCaptcha', data, {})
}

//手机验证码登录
export const fetchLoginByM = ( data:PhoneRuleForm ):Promise<ILoginRequest>=>{
    return http.post('/u/loginByMobile', data, {})
}