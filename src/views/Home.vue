<template>
  <h1>home</h1>
  {{ content }}

  <a-button @click="getInfo">Get Info</a-button>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue'
import { userInfo } from '@/apis/user'

const content = reactive({ name: '', _id: '', email: '' })

const getInfo = () => {
  userInfo().then(res => {
    const { name, _id, email } = res.data
    content.name = name
    content._id = _id
    content.email = email
  })
}

onBeforeMount(() => {
  getInfo()
})
</script>
