<template>
  <div class="container">
    <a-card style="width: 500px">
      <h1>{{ title }}</h1>
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-item label="name" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="email" name="email">
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="password" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="handleSubmit">submit</a-button>
      <div>已有账号？前往<router-link to="/login">登录</router-link></div>
    </a-card>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, toRaw } from 'vue'
import { register } from '@/apis/user'
import { message } from 'ant-design-vue'

const title = 'Register'
const handleSubmit = () => {
  formRef.value
    .validate()
    .then(res => {
      register(toRaw(formState)).then(res => {
        if (res.code === '000001') {
          message.success('注册成功，请登录！')
          toLogin()
        } else {
          message.error(res.msg)
        }
      })
    })
    .catch(error => {
      console.log('error', error)
    })
}

const router = useRouter()
const toLogin = () => {
  router.push('./login')
}

const formRef = ref()
const labelCol = { span: 6 }
const wrapperCol = { span: 16 }
const formState = reactive({
  name: '',
  email: '',
  password: '',
})

const rules = {
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Place input password', trigger: 'blur' },
  ],
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: slategray;
  text-align: center;
}

h1 {
  margin-bottom: 48px;
}
</style>
