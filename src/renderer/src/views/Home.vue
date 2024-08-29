<template lang="">
    <div>
        <button type="button" @click="handleLogin">登录</button>
        <el-button type="success">Success</el-button>
    </div>
</template>

<script setup>
import { useCountStore } from '../store'
import { fetchLogin } from '@api'

const countStore = useCountStore()

console.log(countStore.count)

const handleLogin = () => {
    fetchLogin({
        password: '12',
        username: 'user',
        key: '123',
        captcha: '2f3j'
    }).then(res => {
        console.log(res)
    })
}
</script>