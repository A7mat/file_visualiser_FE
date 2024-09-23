<template>
  <LineChartGenerator
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
import { Line as LineChartGenerator } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default defineComponent({
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
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
      default: 400
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
    //     type: Object,
    //     default: () => {}
    //   },
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
      //     'July'
      //   ],
      //   datasets: [
      //     {
      //       label: 'Data One',
      //       backgroundColor: '#f87979',
      //       data: [40, 39, 10, 40, 39, 80, 40]
      //     },
      //     {
      //       label: 'Data Two',
      //       backgroundColor: '#f87979',
      //       data: [45, 29, 16, 32, 79, 56, 23]
      //     },
      //   ]
      // },
      chartOptions: {
        // responsive: true,
        // maintainAspectRatio: false,
        scales: {
            // yAxes: {
            //     beginAtZero: false
            // },
            x: {
              ticks: {
                maxTicksLimit: 20,
              }
            }
        },
        elements: {
          point: {
            radius: 0,
            // pointStyle: 'line',
          }
        },
        plugins: {
            legend: {
              // onClick: (e, legendItem) => {
                // this.$emit('remove-chart', legendItem.text)
              // },
              display: true,
              labels: {
                  borderRadius: 10,
                  useBorderRadius: true,
                  pointStyle: 'circle',
                  usePointStyle: true,
                  padding: 20,
              }
            }
        }
      }
    }
  },
})
</script>
