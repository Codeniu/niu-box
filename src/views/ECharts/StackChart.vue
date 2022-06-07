<template>
  <div
    ref="StackChart"
    :style="{ width: '100%', height: '100%', overflow: 'auto' }"
  ></div>
</template>
<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'
import options from './StackChart'

export default defineComponent({
  setup() {
    let StackChart = ref(null)

    onMounted(async () => {
      let barChart = echarts.init(StackChart.value)
      barChart.setOption(options)
      window.onresize = function () {
        barChart.resize()
      }
    })

    return { StackChart }
  },
})
</script>
