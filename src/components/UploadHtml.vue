<template>
  <div>
    <input
      ref="upload-input"
      class="upload-input"
      type="file"
      accept=".html"
      @change="handleClick"
    />
    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      <div>
        Drop html file here or
        <a-button
          :loading="loading"
          style="margin-left: 16px"
          size="mini"
          type="primary"
          @click="handleUpload"
        >
          Browse
        </a-button>

        <p style="font-size: 12px; margin-top: 10px">
          (从 Chrome 或 Edge 浏览器导出书签，即可得到该 Html 文件)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function, // eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
    }
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isHtml(rawFile)) {
        message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          this.onSuccess && this.onSuccess(data)
          this.loading = false
          resolve()
        }
        // reader.readAsArrayBuffer(rawFile)
        reader.readAsText(rawFile)
      })
    },

    isHtml(file) {
      return /\.(html)$/.test(file.name)
    },
  },
}
</script>

<style scoped>
.upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  display: grid;
  place-items: center;
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  font-size: 24px;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
