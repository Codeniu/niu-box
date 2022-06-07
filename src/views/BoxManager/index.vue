<template>
  <h1>Niubox's Manager</h1>
  <div>
    <router-link target="_blank" to="/niu-boxs">To NiuBoxs</router-link>
  </div>
  <div :style="{ marginBottom: '10px' }">
    <a-button @click="handleAdd">新增</a-button>
    <a-button @click="handleImport" :style="{ marginLeft: '10px' }"
      >导入</a-button
    >
  </div>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :row-key="record => record._id"
    :loading="loading"
    :scroll="{ x: 1500, y: 500 }"
  >
    <template #description="{ record }">
      {{ record.description || '无' }}
    </template>
    <template #cover="{ record }">
      <div v-if="record.cover" class="cover-wrapper">
        <img :src="record.cover" />
      </div>
      <div
        v-else
        :style="{
          backgroundColor: '#f56a00',
          fontSize: '18px',
          color: '#fff',
        }"
        class="cover-wrapper text-inline"
      >
        {{ record.title }}
      </div>
    </template>
    <template #updateTime="{ record }">
      {{
        record.updateTime
          ? moment(new Date(record.updateTime)).format('YYYY-MM-DD HH:mm:ss')
          : ''
      }}
    </template>
    <template #action="{ record }">
      <a-popconfirm
        title="Are you sure delete?"
        ok-text="Yes"
        cancel-text="No"
        @confirm="handleDelete(record._id)"
      >
        <a href="#">Delete</a>
      </a-popconfirm>
      <a-button type="link" @click="handleEdit(record._id)">Edit</a-button>
    </template>
    <template #tags="{ record }">
      <a-tag color="#55acee" v-for="item in record.tags" :key="item">
        {{ item }}
      </a-tag>
    </template>
    <template #type="{ record }">
      <a-tag v-if="record.type" color="#f56a00">
        {{ record.type }}
      </a-tag>
    </template>
    <template #hide="{ record }">
      <a-switch
        v-model:checked="record.hide"
        @change="handleHideChange(record)"
      />
    </template>
    <template #site="{ record }">
      <a :href="record.site" target="blank" style="">{{ record.site }}</a>
    </template>
  </a-table>

  <ImportModal v-model:visible="importModalVisible" />
</template>
<script>
import { onBeforeMount, toRefs, reactive, toRaw, computed, ref } from 'vue'
import { getBoxData, deleteBox, updateBox } from '@/apis/niuBoxs.js'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import moment from 'moment'
import useSelectEffect from '@/effects/useSelectEffect.js'
const { tagOptions, typeOptions } = useSelectEffect()

import ImportModal from './ImportModal.vue'

const userTableEffect = router => {
  const columns = computed(() => {
    return [
      {
        title: 'Cover',
        dataIndex: 'cover',
        slots: { customRender: 'cover' },
      },
      {
        title: 'Title',
        dataIndex: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        slots: { customRender: 'description' },
      },
      {
        title: 'Site',
        dataIndex: 'site',
        slots: { customRender: 'site' },
      },
      {
        title: 'UpdateTime',
        dataIndex: 'updateTime',
        slots: { customRender: 'updateTime' },
      },
      {
        title: 'Type',
        dataIndex: 'type',
        slots: { customRender: 'type' },
        width: '120px',
        filters: typeOptions,
        onFilter: (value, record) => record.type.includes(value),
      },
      {
        title: 'Tag',
        dataIndex: 'tags',
        slots: { customRender: 'tags' },
        width: '240px',
      },

      {
        title: 'Hide',
        dataIndex: 'hide',
        slots: { customRender: 'hide' },
      },
      {
        title: 'Action',
        dataIndex: 'action',
        slots: { customRender: 'action' },
        width: '240px',
        fixed: 'right',
      },
    ]
  })
  const data = reactive({ dataSource: [], loading: false })

  const handleDelete = id => {
    deleteBox(id).then(() => {
      getTableData()
    })
  }

  const getTableData = () => {
    data.loading = true
    getBoxData({}).then(res => {
      data.dataSource = res.data || []
      data.loading = false
    })
  }

  const handleEdit = id => {
    router.push({ path: `/box-manager/update`, query: { id } })
  }

  const { dataSource, loading } = toRefs(data)

  const handleHideChange = record => {
    updateBox(toRaw(record)).then(res => {
      if (res.code === '000001') {
        message.success('hide change')
      }
    })
  }

  return {
    dataSource,
    columns,
    handleDelete,
    getTableData,
    handleEdit,
    handleHideChange,
    loading,
  }
}

export default {
  name: 'BoxManager',
  components: { ImportModal },
  setup() {
    const router = useRouter()
    const {
      columns,
      dataSource,
      loading,
      handleDelete,
      getTableData,
      handleEdit,
      handleHideChange,
    } = userTableEffect(router)

    onBeforeMount(() => {
      getTableData()
    })

    const handleAdd = () => {
      router.push({ path: `/box-manager/add` })
    }

    let importModalVisible = ref(false)
    const handleImport = () => {
      importModalVisible.value = !importModalVisible.value
    }

    return {
      columns,
      dataSource,
      handleDelete,
      handleEdit,
      handleAdd,
      handleHideChange,
      moment,
      loading,
      importModalVisible,
      handleImport,
    }
  },
}
</script>
<style scoped>
.cover-wrapper {
  width: 128px;
  height: 128px;
  text-align: center;
  line-height: 128px;
  border: 1px solid #f0f2f5;
}
.cover-wrapper img {
  max-width: 100%;
  max-height: 100%;
}
</style>
