<template>
  <a-tooltip :visible="isShowTooltip" :title="content" placement="topLeft">
    <div class="text-inline">
      <span @mouseover="onMouseOver" @mouseout="onMouseOut" style="color: #666">
        {{ content }}
      </span>
    </div>
  </a-tooltip>
</template>

<script>
export default {
  name: 'textTooltip',
  props: {
    // 显示的文字内容
    content: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {
      isShowTooltip: false,
    }
  },
  methods: {
    onMouseOver(e) {
      e.stopPropagation()
      e.preventDefault()
      const parentWidth =
        document.getElementsByClassName('text-inline')[1].offsetWidth
      setTimeout(() => {
        this.isShowTooltip = e.target.offsetWidth > parentWidth
      }, 100)
    },
    onMouseOut(e) {
      setTimeout(() => {
        this.isShowTooltip = false
      }, 100)
    },
  },
}
</script>
