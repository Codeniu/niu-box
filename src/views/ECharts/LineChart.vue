<template>
  <div
    ref="lineChart"
    :style="{ width: '100%', height: '100%', overflow: 'auto' }"
  ></div>
</template>
<script>
import * as echarts from 'echarts'
import { defineComponent, onMounted, ref } from 'vue'

const data = {
  省检修: 106.32,
  郑州: 178.06,
  洛阳: 261.15,
  安阳: 205.7,
  南阳: 200.56,
  焦作: 299.98,
  新乡: 343.99,
  商丘: 184.06,
  平顶山: 288.99,
  驻马店: 318.76,
  许昌: 210.2,
  开封: 224.69,
  信阳: 231.93,
  濮阳: 281.73,
  周口: 219.7,
  三门峡: 238.58,
  济源: 231.21,
  漯河: 171.6,
  鹤壁: 248.63,
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

const options = {
  legend: {
    right: 10,
    data: ['单位资产生产成本'],
  },
  xAxis: {
    type: 'category',
    data: nameArray,
  },
  yAxis: {
    type: 'value',
    name: '单位：元/万元',
    nameTextStyle: {
      color: '#aaa',
      nameLocation: 'start',
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    borderWidth: '1',
    borderColor: 'gray',
    textStyle: {
      color: '#fff',
    },
  },
  series: [
    {
      name: '单位资产生产成本',
      data: dataArray,
      type: 'line',
      markLine: {
        symbol: 'none', // 去掉箭头

        data: [{ type: 'average', name: '平均值' }],
        lineStyle: {
          type: 'solid',
          color: '#18acfa',
        },
        label: {
          show: true,
          position: 'right',
          formatter: '平均值：{c} 元/万元',
          position: 'end',
          color: 'black', //标注线终点文字颜色
          fontSize: 12,
          fontWeight: 400,
        },
      },

      symbol: 'circle', //设定为实心点
      symbolSize: 8, //设定实心点的大小
      label: { show: true }, // 显示每个点的数字
      itemStyle: {
        color: '#65d286', // 点的颜色
      },
      lineStyle: {
        color: '#89dca2', //改变折线颜色
      },
    },
  ],
}

export default defineComponent({
  setup() {
    let lineChart = ref(null)

    onMounted(async () => {
      let barChart = echarts.init(lineChart.value)
      barChart.setOption(options)
      window.onresize = function () {
        barChart.resize()
      }
    })

    return { lineChart }
  },
})
</script>
