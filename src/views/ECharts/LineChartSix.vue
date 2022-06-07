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
  省检修: 15917.92,
  郑州: 24042.2,
  洛阳: 16353.86,
  安阳: 12697.03,
  南阳: 11592.43,
  焦作: 20738.94,
  新乡: 14760.31,
  商丘: 9220.37,
  平顶山: 16773.84,
  驻马店: 11263.56,
  许昌: 14907.19,
  开封: 14028.96,
  信阳: 12984.81,
  濮阳: 16552.61,
  周口: 8323.71,
  三门峡: 14171.1,
  济源: 21700.91,
  漯河: 14502.29,
  鹤壁: 18935.64,
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
    data: ['单位容量生产成本'],
  },
  xAxis: {
    type: 'category',
    data: nameArray,
  },
  yAxis: {
    type: 'value',
    name: '单位：元/km',
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
      name: '单位容量生产成本',
      data: dataArray,
      type: 'line',
      markLine: {
        symbol: 'none',
        data: [{ type: 'average', name: '平均值' }],
        lineStyle: {
          type: 'solid',
          color: '#18acfa',
        },
        label: {
          show: true,
          position: 'right',
          formatter: '平均值：{c} 元/km',
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
        color: '#fbd43c', // 点的颜色
      },
      lineStyle: {
        color: '#fbd43c', //改变折线颜色
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
