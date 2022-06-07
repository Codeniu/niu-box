<template>
  <div
    ref="pieChart"
    :style="{ width: '100%', height: '100%', overflow: 'auto' }"
  ></div>
</template>
<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'

const color = [
  '#f263e2',
  '#f2637b',
  '#fbd43c',
  '#4ecb73',
  '#36cbcb',
  '#18acfa',
  '#975fe5',
]

const options = {
  // tooltip: { trigger: 'item' },
  legend: {
    orient: 'vertical',
    x: 'right',
    y: 'center', //可设定图例在上、下、居中
    padding: [10, 10, 0, 0], //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['40%', '70%'],
      x: '-120px',
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 0,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
          fontWeight: 'bold',
          formatter: param => {
            return param.name + '\n' + (param.value * 100).toFixed(2) + '%'
          },
        },
      },
      color: color,
      labelLine: { show: false },
      data: [
        { value: 0.0021, name: '直流' },
        { value: 0.0015, name: '1000KV' },
        { value: 0.0, name: '750KV' },
        { value: 0.1494, name: '500KV' },
        { value: 0.2467, name: '220KV/330KV' },
        { value: 0.2861, name: '110KV/66KV' },
        { value: 0.3142, name: '35KV' },
      ],
    },
  ],
}

export default defineComponent({
  setup() {
    let pieChart = ref(null)

    onMounted(async () => {
      let barChart = echarts.init(pieChart.value)
      barChart.setOption(options)
      window.onresize = function () {
        barChart.resize()
      }
    })

    return { pieChart }
  },
})
</script>
