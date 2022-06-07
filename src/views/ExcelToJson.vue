<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />

    <a-table
      :columns="tableHeader"
      :data-source="tableData"
      :row-key="record => record.账号"
      style="overflow: auto"
    />
  </div>

  <div>
    <upload-html-component
      :on-success="handleSuccess1"
      :before-upload="beforeUpload"
    />
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel.vue'
import UploadHtmlComponent from '@/components/UploadHtml.vue'
import { message } from 'ant-design-vue'
import { htmlTransform } from '@/utils/htmlTransform.js'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent, UploadHtmlComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning',
      })
      return false
    },
    handleSuccess({ results, header }) {
      console.log(results, header)
      this.tableData = results
      header.forEach(item => {
        this.tableHeader.push({
          title: item,
          dataIndex: item,
        })
      })
    },

    // Test
    handleSuccess1(htmlStr) {
      const tags = this.html2AList(htmlStr)
      let result = []
      const divEle = document.createElement('div')

      tags.forEach((item, index) => {
        divEle.innerHTML = item
        const aElement = divEle.getElementsByTagName('a')[0]
        result.push({
          href: aElement.getAttribute('href'),
          add_date: aElement.getAttribute('add_date'),
          icon: aElement.getAttribute('icon'),
          text: aElement.innerText,
        })
      })

      console.log(result)
    },

    html2AList(str) {
      if (!str) {
        return []
      }
      const pattern = /<a\b[^>]+\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi

      const aList = str.match(pattern)

      return aList
    },
  },
}
</script>
