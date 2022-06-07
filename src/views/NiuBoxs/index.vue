<template>
  <div class="wrapper-bg">
    <div class="wrapper">
      <div class="header grid-margins">
        <span class="header__title">Niu Boxs</span>
      </div>
      <div class="query-form grid-margins">
        <p class="query-form__title">Filter items by type:</p>
        <div class="query-form__content flex-col flex-row">
          <a-select
            class="multiselect mb-2 mb-0 mr-2 max-w-xs"
            ref="select"
            v-model:value="boxType"
            @change="handleTypeChange"
            size="large"
          >
            <a-select-option
              v-for="item in typeOptions"
              :key="item.text"
              :value="item.value"
              >{{ item.text }}</a-select-option
            >
          </a-select>
          <a-select
            class="multiselect mb-2 mb-0 mr-2"
            v-model:value="boxTags"
            mode="tags"
            placeholder="Tags Mode"
            :options="tagOptions"
            size="large"
            @change="handleTagsChange"
          >
          </a-select>
          <a-button
            type="primary"
            size="large"
            :style="{
              'background-color': 'rgba(52, 121, 125, 1)',
              'font-weight': '500',
            }"
            @click="handleTagsChange"
            >Search
          </a-button>
        </div>
        <div class="flex query-form__result">
          <div class="flex">
            <div class="query-form__result--info">
              Displaying <strong>{{ boxData.length }} results</strong> (newest
              first) of type "{{ boxType }}"
              <span v-if="boxTags.length > 0">with tag:</span>
            </div>
            <div class="flex query-form__result--tags">
              <div
                class="query-form__result--tags-item"
                v-for="tag in boxTags"
                :key="tag"
              >
                <a-tag closable color="#34797d" @close="handleCloseTag(tag)"
                  >#{{ tag }}</a-tag
                >
              </div>
            </div>
          </div>
          <button
            class="
              p-1
              l-4
              text-blueGreen
              hover:text-blueGreenScreen
              transition
              duration-300
              ease-in-out
              cursor-pointer
              niu-button
            "
            @click="handleCloseTag(false)"
          >
            ✕
          </button>
        </div>
      </div>
      <div class="content grid-margins" v-if="boxData.length === 0">
        <p>该分类下暂无数据，看看其他分类吧</p>
      </div>
      <div
        v-else
        class="content grid-margins grid-cols-1 grid-cols-2 grid-cols-3"
      >
        <div class="content-item" v-for="item in boxData" :key="item.site">
          <a-card hoverable style="width: 100%">
            <!-- 封面 -->
            <template #cover>
              <a :href="completeSite(item.site)" target="blank">
                <div class="content-item__cover">
                  <img v-if="item.cover" :src="item.cover" />
                  <div
                    :style="{
                      backgroundColor: getRandomColor(),
                    }"
                    class="text-inline"
                  >
                    {{ item.title }}
                  </div>
                </div>
              </a>
            </template>
            <!-- 更新时间 -->
            <p
              :style="{
                marginBottom: '8px',
                fontSize: '12px',
                color: 'rgba(0, 0, 0, 0.65)',
              }"
            >
              {{
                item.updateTime
                  ? moment(new Date(item.updateTime)).format(
                      'YYYY-MM-DD, HH:mm'
                    )
                  : '&nbsp;'
              }}
            </p>

            <!-- 标题及描述 -->
            <a-card-meta>
              <template #title>
                <a-tooltip
                  :title="item.title"
                  color="#108ee9"
                  placement="topLeft"
                >
                  <div class="text-inline content-item__title">
                    <a :href="completeSite(item.site)" target="blank">
                      {{ item.title }}
                      <LinkOutlined :style="{ fontSize: '14px' }" />
                    </a>
                  </div>
                </a-tooltip>
              </template>
              <template #description>
                <TooltipOver :content="item.description" />
              </template>
            </a-card-meta>
            <!-- 分类 -->
            <div class="content-item__type">
              <a-tag color="#cce9ed">
                <span>
                  {{ item.type || '其他' }}
                </span>
              </a-tag>
            </div>
            <!-- 标签 -->
            <div class="content-item__tags">
              <div
                v-for="innerItem in item.tags"
                :key="innerItem"
                class="content-item__tags-item"
                @click="handleChoseTag(innerItem)"
              >
                #{{ innerItem }}
              </div>
            </div>
          </a-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, reactive, toRefs, watch, toRaw } from 'vue'
import { getBoxData } from '@/apis/niuBoxs.js'

import { message } from 'ant-design-vue'
import { LinkOutlined } from '@ant-design/icons-vue'

import TooltipOver from '@/components/TooltipOver.vue'
import moment from 'moment'
import useSelectEffect from '@/effects/useSelectEffect.js'
import { getRandomColor } from '@/utils/index.js'

// 数据初始化
const useInitDataEffect = () => {
  const boxType = ref('全部')
  const data = reactive({ boxData: [], boxTags: [] })

  // 请求数据
  const getBoxList = () => {
    const params = {
      type: boxType.value,
      tags: toRaw(data.boxTags),
      hide: false,
    }
    getBoxData(params).then(res => {
      data.boxData = res.data || []
    })
  }

  const handleTypeChange = () => {
    getBoxList()
  }

  const handleTagsChange = () => {
    getBoxList()
  }

  const handleCloseTag = tag => {
    const tagList = toRaw(data.boxTags) || []
    if (!tag) {
      data.boxTags = []
    } else {
      data.boxTags = tagList.filter(item => item !== tag)
    }
    getBoxList()
  }

  const handleChoseTag = tag => {
    const tagList = toRaw(data.boxTags) || []
    if (!tagList.includes(tag)) {
      data.boxTags.push(tag)
    }
    getBoxList()
  }

  const { boxData, boxTags } = toRefs(data)

  return {
    boxType,
    boxTags,
    boxData,
    handleTypeChange,
    handleTagsChange,
    getBoxList,
    handleCloseTag,
    handleChoseTag,
  }
}

export default {
  name: 'NiuBoxs',
  components: {
    TooltipOver,
    LinkOutlined,
  },

  setup() {
    const {
      boxType,
      boxTags,
      boxData,
      handleTypeChange,
      handleTagsChange,
      getBoxList,
      handleCloseTag,
      handleChoseTag,
    } = useInitDataEffect()

    const typeOptions = [
      {
        text: '全部',
        value: '全部',
      },
      ...useSelectEffect().typeOptions,
    ]
    const { tagOptions } = useSelectEffect()

    onMounted(() => {
      getBoxList()
    })

    const completeSite = link => {
      if (!link) return link
      return link.indexOf('http') !== -1 ? link : 'http://' + link
    }

    return {
      handleTypeChange,
      boxType,
      boxData,
      completeSite,
      moment,
      typeOptions,
      tagOptions,
      getRandomColor,
      boxTags,
      handleTagsChange,
      handleCloseTag,
      handleChoseTag,
    }
  },
}
</script>
<style scoped>
/* 屏幕自适应代码 */
@import url('@/styles/niu-box.css');

.wrapper-bg {
  width: 100%;
  min-height: 100%;
  display: inline-block;
  background-image: url('../../assets/box-bg.jpg');
  background-position: left top;
  background-size: auto;
  background-repeat: repeat;
  background-attachment: fixed;
}

.wrapper {
  margin: 0 15px 0;
  padding: 20px 0;
}

.header {
  border-radius: 6px;
}

.header__title {
  flex: 1;
  font-size: 48px;
}

.query-form {
}

.query-form__title {
  margin-bottom: 3px;
  font-size: 16px;
  font-weight: 600;
}

.query-form__content {
  display: flex;
}

.query-form__result {
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;
  font-size: 18px;
  background-color: #fff;
  /* border: 1px solid #c3b5b5; */
}

.query-form__result--tags {
  margin-left: 10px;
}
.query-form__result--tags-item {
}

.content {
  display: grid;
  justify-items: center;
  gap: 20px;
  padding-top: 20px;
  border-radius: 6px;
}

.content-item {
  width: 100%;
}

.content-item__cover {
  width: 100%;
  height: 180px;
  line-height: 180px;
  padding-bottom: 1px;
  text-align: center;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  /* background-color: #999; */
}
.content-item__cover img {
  max-height: 100%;
  max-width: 100%;
  transition: 1s;
}
.content-item__cover div {
  width: 100%;
  height: 100%;
  font-size: 21px;
  color: #fff;
  transition: 1s;
}
.content-item__cover div:hover {
  transform: scale(1.5);
  transition: 1s;
}
.content-item__cover img:hover {
  transform: scale(1.5);
  transition: 1s;
}

.content-item__title {
  font-size: 18px;
  font-weight: 900;
  font-family: cursive;
}

.content-item__type {
  margin-top: 10px;
  display: inline-block;
}
.content-item__type span {
  color: #3479a1;
  font-size: 12px;
}

.content-item__tags {
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
}
.content-item__tags-item {
  display: inline-block;
  padding: 0 3px 0;
  transition: 0.3s;
}

.content-item__tags-item:hover {
  color: #fff;
  background-color: silver;
  border-radius: 3px;
  transition: 0.3s;
}

.ant-card-meta-description {
  color: red;
}
</style>
