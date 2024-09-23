<template>
  <Bar
    :options="chartOptions"
    :data="chartData"
    :id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :class="cssClasses"
    :style="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 150
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    
  },
  data() {
    return {
      // chartData: {
      //   labels: [
      //     'January',
      //     'February',
      //     'March',
      //     'April',
      //     'May',
      //     'June',
      //     'July',
      //     'August',
      //     'September',
      //     'October',
      //     'November',
      //     'December'
      //   ],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      //     }
      //   ]
      // },
      // chartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false
      // }
    }
  }
})
</script>