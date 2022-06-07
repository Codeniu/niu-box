<template>
  <div
    ref="indexChart"
    :style="{ width: '100%', height: '100%', overflow: 'auto' }"
  ></div>
</template>
<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'

const data = {
  直流: 24.96,
  '1000kV': 6.28,
  '750kV': 0.0,
  '500kV': 128.97,
  '220kV（330kV)': 136.83,
  '110kV（66kV)': 178.0,
  '35kV': 716.13,
}

let nameArray = []
let dataArray = []
const getData = data => {
  for (let key in data) {
    nameArray.push(key)
    dataArray.push(data[key])
  }
}
getData(data)

const barChartOptions = {
  legend: {
    right: 10,
    data: ['单位资产生产成本'],
  },
  xAxis: {
    type: 'category',
    data: nameArray,
    axisLabel: {
      interval: 0, //横轴信息全部显示
      rotate: -30, //-30度角倾斜显示
    },
  },
  yAxis: {
    type: 'value',
    name: '单位：元/万元',
    nameTextStyle: {
      color: '#aaa',
      nameLocation: 'start',
    },
  },
  series: [
    {
      name: '单位资产生产成本',
      data: dataArray,
      type: 'bar',
      color: 'rgba(78, 203, 115)',
      barWidth: 30,
      label: {
        show: true, //开启显示
        position: 'top', //在上方显示
        fontSize: 12,
      },
    },
  ],
}

export default defineComponent({
  setup() {
    let indexChart = ref(null)

    onMounted(async () => {
      let barChart = echarts.init(indexChart.value)
      barChart.setOption(barChartOptions)
      window.onresize = function () {
        barChart.resize()
      }
    })

    return { indexChart }
  },
})
</script>
