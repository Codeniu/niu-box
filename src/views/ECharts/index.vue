<template>
  <div class="container">
    <img
      src="../assets/charts/2-3.png"
      :style="{ width: '100%', height: '100%' }"
    />

    <div class="chart-pie">
      <PieChart />
    </div>

    <div class="chart-bar">
      <BarChart />
    </div>

    <div class="chart-stack">
      <StackChart />
    </div>

    <div class="chart-line">
      <LineChart />
    </div>

    <div class="chart-line6">
      <LineChartSix />
    </div>

    <div class="chart-bar5">
      <BarChartFive />
    </div>
    <!-- <MixLineBarChart /> -->
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import BarChart from './BarChart.vue'
import StackChart from './StackChart.vue'
import MixLineBarChart from './MixLineBarChart.vue'
import LineChart from './LineChart.vue'
import LineChartSix from './LineChartSix.vue'
import BarChartFive from './BarChartFive.vue'
import PieChart from './PieChart.vue'

export default {
  components: {
    BarChart,
    StackChart,
    MixLineBarChart,
    LineChart,
    LineChartSix,
    BarChartFive,
    PieChart,
  },
  setup() {
    return {}
  },
}
</script>

<style>
.container {
  position: relative;
}

.chart-pie {
  position: absolute;
  width: 440px;
  height: 248px;
  top: 195px;
  left: 42px;
}

.chart-bar {
  position: absolute;
  width: 440px;
  height: 248px;
  top: 520px;
  left: 42px;
}

.chart-stack {
  position: absolute;
  width: 900px;
  height: 228px;
  top: 200px;
  left: 542px;
}

.chart-line {
  position: absolute;
  width: 900px;
  height: 248px;
  top: 514px;
  left: 542px;
}

.chart-line6 {
  position: absolute;
  width: 900px;
  height: 248px;
  top: 818px;
  left: 542px;
}

.chart-bar5 {
  position: absolute;
  width: 440px;
  height: 248px;
  top: 818px;
  left: 42px;
}
</style>
