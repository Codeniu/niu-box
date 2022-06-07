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
  直流: 1440.49,
  '1000kV': 1995.44,
  '750kV': 0.0,
  '500kV': 19416.79,
  '220kV（330kV)': 13348.35,
  '110kV（66kV)': 12861.62,
  '35kV': 12861.62,
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
    data: ['单位容量生产成本'],
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
    name: '单位：元/km',
    nameTextStyle: {
      color: '#aaa',
      nameLocation: 'start',
    },
  },
  series: [
    {
      name: '单位容量生产成本',
      data: dataArray,
      type: 'bar',
      color: '#fbd43c',
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
