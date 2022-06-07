const legendData = [
  '直流',
  '1000kV',
  '750kV',
  '500KV',
  '220KV/330KV',
  '110KV/66KV',
  '35KV',
]

const color = [
  '#f263e2',
  '#f2637b',
  '#fbd43c',
  '#4ecb73',
  '#36cbcb',
  '#18acfa',
  '#1890fa',
]

const data = {
  省检修: [0.0, 0.005, 0.0, 0.9281, 0.0406, 0.0263, 0.0],
  郑州: [0.0, 0.0, 0.0, 0.0, 0.3997, 0.4158, 0.1846],
  洛阳: [0.0024, 0.0, 0.0, 0.0037, 0.2961, 0.4554, 0.2424],
  安阳: [0.0, 0.0, 0.0, 0.0124, 0.3528, 0.4208, 0.214],
  南阳: [0.0, 0.0084, 0.0, 0.0045, 0.1615, 0.2832, 0.5425],
  焦作: [0.0, 0.0, 0.0, 0.0, 0.4042, 0.3172, 0.2786],
  新乡: [0.0, 0.0, 0.0, 0.0062, 0.1841, 0.4123, 0.3975],
  商丘: [0.0, 0.0, 0.0, 0.0, 0.2337, 0.3123, 0.454],
  平顶山: [0.0, 0.0, 0.0, 0.0, 0.2738, 0.225, 0.5011],
  驻马店: [0.0, 0.0, 0.0, 0.0, 0.0618, 0.0635, 0.8747],
  许昌: [0.0, 0.0, 0.0, 0.032, 0.1675, 0.4392, 0.3614],
  开封: [0.0, 0.0, 0.0, 0.0, 0.2808, 0.2544, 0.4647],
  信阳: [0.0279, 0.0, 0.0, 0.0, 0.3406, 0.3218, 0.3097],
  濮阳: [0.0, 0.0, 0.0, 0.0004, 0.2671, 0.3321, 0.4004],
  周口: [0.0, 0.0, 0.0, 0.0026, 0.2312, 0.3466, 0.4196],
  三门峡: [0.0, 0.0, 0.0, 0.0129, 0.4438, 0.199, 0.3443],
  济源: [0.0, 0.0, 0.0, 0.0, 0.4491, 0.4169, 0.134],
  漯河: [0.0, 0.0, 0.0, 0.0, 0.3721, 0.384, 0.244],
  鹤壁: [0.0, 0.0, 0.0, 0.0, 0.2388, 0.4768, 0.2844],
}

const xAxisData = (() => {
  let arr = []
  for (let key in data) {
    arr.push(key)
  }
  return arr
})()

const seriesData = (() => {
  let arr = []
  for (let i = 0; i < legendData.length; i++) {
    const name = legendData[i]

    arr.push({
      name: name,
      type: 'bar',
      stack: 'myStack',
      emphasis: {
        focus: 'series',
      },
      color: color[i],
      barWidth: 30,

      itemStyle: {
        barBorderRadius: 5,
      },

      data: (() => {
        let seriesData = []
        for (let key in data) {
          seriesData.push(data[key][i])
        }

        return seriesData
      })(),
    })
  }

  return arr
})()

const options = {
  tooltip: {
    trigger: 'axis',
    position: (point, params, dom, rect, size) => {
      // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
      // 提示框位置
      var x = 0 // x坐标位置
      var y = 0 // y坐标位置
      // 当前鼠标位置
      var pointX = point[0]
      var pointY = point[1]
      // 提示框大小
      var boxWidth = size.contentSize[0]
      var boxHeight = size.contentSize[1]
      // boxWidth > pointX 说明鼠标左边放不下提示框
      if (boxWidth > pointX) {
        x = 5
      } else {
        // 左边放的下
        x = pointX - boxWidth
      }
      // boxHeight > pointY 说明鼠标上边放不下提示框
      if (boxHeight > pointY) {
        y = 5
      } else {
        // 上边放得下
        y = pointY - boxHeight
      }
      return [x, y]
    },
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: param => {
      let template = `${param[0].axisValue}<br /><br />`
      param.forEach(item => {
        template += `
        <div style="display:flex;justify-content:space-between;">
        <div>
        ${item.marker}
           ${item.seriesName}
          </div>
          <div style="font-weight:800">
           ${(item.value * 100).toFixed(2)}%
          </div>
        </div>
        `
      })
      return `
        <div style="color:#fff">
          ${template}
        </div>
      `
    },
  },
  legend: {
    data: legendData,
    right: 10,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: xAxisData,
    },
  ],
  yAxis: [
    {
      type: 'value',
      max: value => value.max,
      axisLabel: {
        formatter: param => {
          return param * 100 + '%'
        },
      },
    },
  ],
  series: seriesData,
}

export default options
