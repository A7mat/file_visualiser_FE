<template>
  <Doughnut
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
import { Doughnut } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
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
      // chartOptions: {
      //   type: Object,
      //   default: () => {}
      // },
  },
  data() {
    return {
      // chartData: {
      //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      //   datasets: [
      //     {
      //       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      //       data: [40, 20, 80, 10]
      //     }
      //   ]
      // },
      chartOptions: {
        responsive: false,
        maintainAspectRatio: true
      }
    }
  }
})
</script>
