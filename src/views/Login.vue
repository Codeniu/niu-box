<template>
  <div class="container">
    <a-card style="width: 500px">
      <h1>{{ title }}</h1>
      <h2 @click="handleClickName">{{ name }}</h2>
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
        <a-form-item label="password" name="password">
          <a-input v-model:value="formState.password" />
        </a-form-item>
      </a-form>
      <a-space>
        <a-button type="primary" @click="handleLogin">sign in</a-button>
        <a-button @click="toRegister">sing up</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive, toRaw, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

const { proxy } = getCurrentInstance()
const router = useRouter()
const title = 'Welcome to Niu Box'
const toRegister = () => {
  router.push('./reg')
}
const labelCol = { span: 6 }
const wrapperCol = { span: 16 }
const formState = reactive({
  name: 'admin',
  password: 'admin',
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
// vuex
const store = useStore()
const handleClickName = () => store.dispatch('changeName')

const formRef = ref()
const handleLogin = () => {
  formRef.value
    .validate()
    .then(() => {
      store.dispatch('login', toRaw(formState)).then(res => {
        router.push('/')
      })
    })
    .catch(error => {
      console.log('error', error)
    })
}
</script>

<script>
export default {
  computed: {
    name() {
      return this.$store.state.name
    },
  },
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
