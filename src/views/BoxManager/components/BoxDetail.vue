<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
  >
    <a-form-item label="Title" name="title">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="Site" name="site">
      <a-input v-model:value="formState.site" />
    </a-form-item>
    <!-- <a-form-item label="Type">
      <a-radio-group v-model:value="formState.type">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item> -->
    <a-form-item label="Desc" name="description">
      <a-input v-model:value="formState.description" />
    </a-form-item>
    <a-form-item label="Cover">
      <a-textarea
        v-model:value="formState.cover"
        :auto-size="{ minRows: 2, maxRows: 5 }"
        placeholder="展示页面（输入 base64 格式的图片数据）"
        allowClear
        style="word-break: break-all"
      />
      <img
        v-if="formState.cover"
        :src="formState.cover"
        width="128"
        :style="{ marginTop: '10px' }"
      />
      <div v-else :style="{ marginTop: '10px' }">
        <UploadImg :on-success="handleSuccess" :before-upload="beforeUpload" />
      </div>
    </a-form-item>
    <a-form-item label="Tags">
      <a-select
        v-model:value="formState.tags"
        mode="tags"
        style="width: 100%"
        placeholder="Tags Mode"
        :options="tagOptions"
      >
      </a-select>
    </a-form-item>
    <a-form-item label="Type">
      <a-select
        v-model:value="formState.type"
        style="width: 100%"
        placeholder="please chose type"
        :options="typeOptions"
      >
      </a-select>
    </a-form-item>
    <a-form-item label="Hide">
      <a-switch v-model:checked="formState.hide" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">{{
        isEdit ? 'Submit' : 'Create'
      }}</a-button>
      <a-button style="margin-left: 10px" @click="onCancel">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount, toRaw, reactive, ref } from 'vue'
import { getBoxDataById, updateBox, addBox } from '@/apis/niuBoxs.js'
import useSelectEffect from '@/effects/useSelectEffect.js'

import UploadImg, { useUploadImgEffect } from './UploadImg.vue'

// 表单相关逻辑
const useFormEffect = (isEdit, router) => {
  const formRef = ref()
  const formState = reactive({
    title: '',
    site: '',
    description: '',
    hide: false,
    cover: '',
    tags: [],
    type: '',
  })
  const rules = {
    title: [
      {
        required: true,
        message: 'Please input title',
        trigger: 'blur',
      },
    ],
    site: [
      {
        required: true,
        message: 'Please input site',
        trigger: 'blur',
      },
      //   {
      //     validator: async value => {
      //       const reg =
      //         /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
      //       if (!reg.test(value)) {
      //         return Promise.reject('Please input the correct website')
      //       } else {
      //         return Promise.resolve()
      //       }
      //     },
      //     trigger: 'change',
      //   },
    ],
    description: [
      {
        required: true,
        message: 'Please input description',
        trigger: 'blur',
      },
    ],
  }
  const onSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        if (isEdit) {
          updateBox(toRaw(formState)).then(res => {
            if (res.code === '000001') {
              router.push({ name: 'BoxManager' })
            }
          })
        } else {
          // 新增
          addBox(toRaw(formState)).then(res => {
            if (res.code === '000001') {
              router.push({ name: 'BoxManager' })
            }
          })
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  const onCancel = () => {
    router.push({ name: 'BoxManager' })
  }
  return { formState, rules, formRef, onSubmit, onCancel }
}

export default {
  components: { UploadImg },
  props: ['isEdit'],
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const { formState, rules, formRef, onSubmit, onCancel } = useFormEffect(
      props.isEdit,
      router
    )

    const { tagOptions, typeOptions } = useSelectEffect()

    const { handleSuccess, beforeUpload } = useUploadImgEffect(formState)

    onBeforeMount(() => {
      if (props.isEdit) {
        const { id } = route.query
        getBoxDataById(id).then(res => {
          const { data } = res
          if (!data) {
            router.push({ name: 'BoxManager' })
          } else {
            Object.keys(data).forEach(key => {
              formState[key] = data[key]
            })
          }
        })
      }
    })

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formRef,
      formState,
      onSubmit,
      onCancel,
      rules,
      tagOptions,
      typeOptions,
      handleSuccess,
      beforeUpload,
    }
  },
}
</script>
<style lang="scss" scoped></style>
