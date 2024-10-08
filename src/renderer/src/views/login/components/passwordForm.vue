<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    size="large"
  >
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        prefix-icon="user"
        clearable
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="ruleForm.password"
        prefix-icon="lock"
        clearable
        show-password
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <div class="box-code">
        <el-input
          v-model="ruleForm.captcha"
          prefix-icon="CircleCheck"
          clearable
          placeholder="请输入验证码"
        ></el-input>
        <el-image class="code" :src="captchaUrl" @click="getCaptcha"></el-image>
      </div>
    </el-form-item>

    <div class="remember">
      <div>
        <el-checkbox label="记住密码"></el-checkbox>
      </div>
      <div>
        <router-link to="">忘记密码?</router-link>
      </div>
    </div>

    <el-form-item>
      <el-button
        :Loading="isLogin"
        type="primary"
        round
        style="width: 100%"
        @click="login(ruleFormRef)"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref , onBeforeMount } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { fetchLogin , fetchCaptcha } from '@api'
import { Encrypt } from '@utils/aes'
import { UserRuleForm } from '@interface/login'

let captchaUrl = ref<string>('');
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<UserRuleForm>({
    username: '',
    password: '',
    key: '',
    captcha: '',
})

const rules = reactive<FormRules<UserRuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})

//验证码
const getCaptcha = async () => {
    const key:string = new Date().getTime().toString();
    ruleForm.key = key;
    let res = await fetchCaptcha({ key })
    let blob = new Blob([res],{type:'application/vnd.ms-excel'});
    let imgUrl = URL.createObjectURL( blob );
    captchaUrl.value = imgUrl;
}

//生命周期
onBeforeMount(()=>{
    getCaptcha();
})

//登录
const isLogin = ref(false)
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      isLogin.value = true
      let res = await fetchLogin({
        username:Encrypt(ruleForm.username),
        password:Encrypt(ruleForm.password),
        key:ruleForm.key,
        captcha:ruleForm.captcha
      })
      if( res.code != '200' ){
        return ElMessage.error(res.msg);
      }

      const token = res.data
      localStorage.setItem('TOKEN', token || '')
      isLogin.value = false

    } else {
        return ElMessage.warning('请填写正确内容');
    }
  })
}
</script>

<style scoped>
.box-code {
  display: flex;
  align-items: center;
  width: 100%;
}
.code {
  margin-left: 10px;
  width: 100px;
  height: 40px;
  cursor: pointer;
}
.remember {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
