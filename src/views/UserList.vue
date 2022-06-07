<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :row-key="record => record._id"
  >
    <template #email="{ record }">
      {{ record.email || '无' }}
    </template>
    <template #action="{ record }">
      <a-button @click="handleDeleteUser(record._id)">删除</a-button>
    </template>
  </a-table>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { userList, deleteUser } from '@/apis/user'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    slots: { customRender: 'email' },
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
]

export default defineComponent({
  setup() {
    const state = reactive({
      dataSource: [],
    })

    const getList = () => {
      userList().then(res => {
        state.dataSource = res.data || []
      })
    }

    onMounted(getList)

    const handleDeleteUser = id => {
      deleteUser(id).then(res => {
        message.success('操作成功')
        getList()
      })
    }

    return {
      columns,
      ...toRefs(state),
      handleDeleteUser,
    }
  },
})
</script>
