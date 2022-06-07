<template>
  <a-modal title="通过书签导入" v-bind="$attrs" width="1240px" :footer="null">
    <div style="margin-bottom: 10px">
      <upload-html-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      />
    </div>
    <!-- <div>
      <a-button @click="handleBatchCreate">批量发布</a-button>
    </div> -->
    <a-table
      :columns="columns"
      :data-source="tableData"
      :row-key="record => record.site"
      :loading="loading"
      :scroll="{ x: 1100, y: 500 }"
      :row-selection="rowSelection"
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
          {{ record.title.slice(0, 1) }}
        </div>
      </template>

      <template #action="{ record }">
        <a-popconfirm
          title="Are you sure delete?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleDelete(record)"
        >
          <a href="#">Delete</a>
        </a-popconfirm>
        <a-button type="link" @click="handlePush(record)">发布</a-button>
      </template>

      <!-- <template #tags="{ record }">
        <a-tag color="#55acee" v-for="item in record.tags" :key="item">
          {{ item }}
        </a-tag>
      </template>

      <template #type="{ record }">
        <a-tag v-if="record.type" color="#f56a00">
          {{ record.type }}
        </a-tag>
      </template> -->

      <template #site="{ record }">
        <a :href="record.site" target="blank" style="">{{ record.site }}</a>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import UploadHtmlComponent from '@/components/UploadHtml.vue'
import { message } from 'ant-design-vue'
import { toRefs, reactive, ref, computed, toRaw, toRef } from 'vue'
import moment from 'moment'
import { addBox, batchCreate } from '@/apis/niuBoxs.js'

const useUploaderEffect = () => {
  const data = reactive({ tableData: [] })

  // 获取 a 标签
  const html2AList = str => {
    if (!str) {
      return []
    }
    const pattern = /<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi

    const aList = str.match(pattern)

    return aList
  }

  const beforeUpload = file => {
    console.log(file.lastModified)
    try {
    } catch (error) {}

    const isLt1M = file.size / 1024 / 1024 < 1

    if (isLt1M) {
      return true
    }

    message({
      message: 'Please do not upload files larger than 1m in size.',
      type: 'warning',
    })
    return false
  }

  const handleSuccess = htmlStr => {
    const tags = html2AList(htmlStr)
    let result = []
    const divEle = document.createElement('div')

    tags.forEach((item, index) => {
      divEle.innerHTML = item
      const aElement = divEle.getElementsByTagName('a')[0]
      result.push({
        site: aElement.getAttribute('href'),
        updateTime: aElement.getAttribute('add_date'),
        cover: aElement.getAttribute('icon'),
        title: aElement.innerText,
        description: aElement.innerText,
      })
    })

    data.tableData = result
  }

  // 新增成功后删除 tableData 的该条数据
  const deleteItemInTabledata = row => {
    const index = data.tableData.findIndex(item => item.site === row.site)
    data.tableData.splice(index, 1)
  }

  const handlePush = row => {
    addBox(row).then(res => {
      message.success('发布成功')
      deleteItemInTabledata(row)
    })
  }

  const handleDelete = row => {
    deleteItemInTabledata(row)
  }

  const { tableData } = toRefs(data)

  return { handleSuccess, beforeUpload, tableData, handlePush, handleDelete }
}

export default {
  inheritAttrs: true,
  components: { UploadHtmlComponent },

  setup() {
    const { handleSuccess, beforeUpload, tableData, handlePush, handleDelete } =
      useUploaderEffect()

    // Table 相关逻辑
    const loading = ref(false)
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
        // {
        //   title: 'Type',
        //   dataIndex: 'type',
        //   slots: { customRender: 'type' },
        //   onFilter: (value, record) => record.type.includes(value),
        // },
        // {
        //   title: 'Tag',
        //   dataIndex: 'tags',
        //   slots: { customRender: 'tags' },
        // },
        {
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      ]
    })

    let selectedRow = []
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        )
        selectedRow = selectedRows
      },
      getCheckboxProps: record => ({
        disabled: !record.site,
        // Column configuration not to be checked
      }),
    }

    const handleBatchCreate = () => {
      const paramList = selectedRow.map(v => toRaw(v))
      if (paramList.length <= 0) {
        message.warning('请至少选择一条数据')
        return
      }
      batchCreate({ data: paramList }).then(res => {
        console.log(res)
      })
    }

    return {
      handleSuccess,
      beforeUpload,
      tableData,
      loading,
      columns,
      moment,
      rowSelection,
      handlePush,
      handleDelete,
      handleBatchCreate,
    }
  },
}
</script>
<style scoped>
.cover-wrapper {
  --boxsize--: 32px;
  width: var(--boxsize--);
  height: var(--boxsize--);
  text-align: center;
  line-height: var(--boxsize--);
  border: 1px solid #f0f2f5;
}
.cover-wrapper img {
  max-width: 100%;
  max-height: 100%;
}
</style>
