<template lang="">
    <div class="login" @mousedown="mousedown">
        <!--按钮-->
        <div class="login-config">
            <div class="login-config-btn">
                <!--换肤-->
                <el-button circle @click="configDark">
                    <el-icon v-if="dark =='dark' "><Sunny /></el-icon>
                    <el-icon v-else><Moon /></el-icon> 
                </el-button>
                <!-- 国际化 -->
                <el-dropdown trigger="click" @command="configLang">
                    <el-button circle>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M478.33 433.6l-90-218a22 22 0 0 0-40.67 0l-90 218a22 22 0 1 0 40.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 0 0 458 464a22 22 0 0 0 20.32-30.4zM334.83 362L368 281.65L401.17 362z" fill="currentColor"></path><path d="M267.84 342.92a22 22 0 0 0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73c39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 0 0 0-44H214V70a22 22 0 0 0-44 0v20H54a22 22 0 0 0 0 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36c-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 0 0-40.58 17c.58 1.38 14.55 34.23 52.86 83.93c.92 1.19 1.83 2.35 2.74 3.51c-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1 0 21.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59c22.52 24.08 38 35.44 38.93 36.1a22 22 0 0 0 30.75-4.9z" fill="currentColor"></path></svg>
                    </el-button>
                    <template #dropdown >
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="item in config.LANG"
                                :key="item.value"
                                :command="item"
                            >{{  item.name }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!--关闭软件-->
                <el-button icon="close" circle type="default" @click="closeWin"></el-button>
            </div>
        </div>
        <!--左侧-->
        <div class="login_adv">
            <div class="login_adv_title">
                <h2>若 明</h2>
                <h4>CRM管理系统</h4>
                <p>让业务在线更高效，加速企业数字化升级。</p>
            </div>
            <div class="login_adv_mask"></div>
            <div class="login_adv_imgage">
                <img src="../../assets/images/data.png" width="100%">
            </div>
            <div class="login_adv_bottom">
                © 若明CRM管理系统 1.0.11
            </div>
        </div>
        <!--右侧-->
        <div class="login-main">
            <div class="login-form">
                <div class="login-header">
                    <div class="login-img">
                        <img src="../../assets/images/logo.png" alt="">
                        <label>若明CRM管理系统</label>
                    </div>
                </div>
                <el-tabs>
                    <el-tab-pane label="账号登录" lazy style="height: 300px">
                        <PasswordForm />
                    </el-tab-pane>
                    <el-tab-pane label="手机号登录" lazy style="height: 300px">
                        <PhoneForm />
                    </el-tab-pane>
                </el-tabs>
                <template v-if='true'>
                    <el-divider>其他登录方式</el-divider>
                    <div class="login-oauth">
                        <!--微信按钮-->
                        <el-button type="success" circle  size="large" @click="weChatLogin">
                            <el-icon size="large">
                               <ChatDotRound />
                            </el-icon>
                        </el-button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import PasswordForm from '@views/login/components/passwordForm.vue';
import PhoneForm from '@views/login/components/phoneForm.vue';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const weChatLogin = () => {
    window.electron.ipcRenderer.invoke('wechat', {
        name: 'wx',
        event: 'event',
        data: null
    })
}

let isKeyDown = ref(false)
let dinatesX = ref(0)
let dinatesY = ref(0)
// 窗口拖拽
const mousedown = (event) => {
    isKeyDown.value = true
    dinatesX.value = event.x
    dinatesY.value = event.y

    document.onmousemove = (ev) => {
        if(isKeyDown.value) {
            const x = ev.screenX - dinatesX.value
            const y = ev.screenY - dinatesY.value

            window.electron.ipcRenderer.invoke('custom-position', {
                appX: x,
                appY: y
            })
        }
    }

    document.onmouseup = () => {
        isKeyDown.value = false
    }
}

// 关闭窗口
const closeWin = () => {
    window.electron.ipcRenderer.invoke('custom-close')
}

// 换肤
const dark = ref(localStorage.getItem('dark'))
const configDark = () => {
    const element = document.querySelector('html')
    if(element) {
        if(element.className == 'dark') {
            element.className = ''
        } else {
            element.className = 'dark'
        }
    }
    dark.value = element.className
    localStorage.setItem('dark',element.className)
}

// 国际化
const { t, locale } = useI18n()
console.log(t)
const config = reactive({
    LANG: [
        { name: "中文", value: 'zh-cn' },
        { name: '英文', value: 'en' }
    ]
})
const configLang = (item) => {}
</script>

<style scoped>
.login{
    width:100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
}
.login_adv{
    background: url('../../assets/images/auth_banner.jpg') no-repeat;
    width:40%;
    position: relative;
}
.login_adv_title{
    position: absolute;
    top:0;
    left:0;
    right:0;
    z-index: 2;
    padding:40px;
    color:#fff;
}
.login_adv_title h2{
    font-size: 40px;
}
.login_adv_title h4{
    font-size: 18px;
    margin-top: 10px;
}
.login_adv_title p{
    font-size: 14px;
    margin-top: 10px;
    line-height: 1.8;
    color: rgb(255,255,255,.6);
}
.login_adv_imgage{
    position: absolute;
    left:0px;
    right:0px;
    bottom:80px;
    padding:40px;
    z-index: 3;
}
.login_adv_imgage img{
    width: 100%;
    height: 100%;
}
.login_adv_bottom{
    position: absolute;
    left:0px;
    right:0px;
    bottom:0px;
    color:#fff;
    padding:0 40px 40px 40px;
}
.login_adv_mask{
    position: absolute;
    left:0px;
    top:0px;
    right:0px;
    bottom:0px;
    background:rgba(0, 0, 0,.5);
    z-index: 1;
}

.login-main{
    flex:1;
    display: flex;
    overflow: auto;
}
.login-form{
    width:400px;
    margin: auto;
    padding:80px 0 0 0;
}
.login-header{
    margin-bottom: 40px;
}
.login-header .login-img{
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-header .login-img img{
    width:40px;
    height: 40px;
    vertical-align: bottom;
    margin-right:10px;
}
.login-header .login-img label{
    font-size:26px;
    font-weight: bold;
}
.login-oauth{
    display: flex;
    justify-content: space-around;
}

.login-config{
    position: absolute;
    right:0px;
    top:0px;
    z-index: 999;
    width: 100%;
}
.login-config-btn{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    margin: 10px 10px 0 0;
    float: right;
}

.el-button+.el-button{
    margin-left: 0px;
}
</style>