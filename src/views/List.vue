<template>
  <div v-html="content.title"></div>
  <div v-html="content.text"></div>

  <a-button @click="handleRemoveToken">Remove Token</a-button>

  <p>vuex:{{ mytoken }}</p>
</template>
<script>
import { defineComponent, reactive, computed } from 'vue'
import { userInfo } from '@/apis/user'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const token = localStorage.getItem('token')
    const token_exp = localStorage.getItem('token_exp')
    const now_time = new Date().getTime()
    console.log(now_time - token_exp)
    const content = {
      title: 'token',
      text: `
                        <p>当前的 token 为：${token}</p>
                        <p>token过期时间还剩：${
                          1000 * 60 * 60 * 2 - (now_time - token_exp)
                        } ms</p>
                    `,
    }

    const handleRemoveToken = () => {
      localStorage.removeItem('token')
      userInfo()
        .then(() => {})
        .catch(() => {
          router.push('./login')
        })
    }

    return {
      content,
      handleRemoveToken,
      mytoken: computed(() => store.state.apptoken),
    }
  },
})
</script>
