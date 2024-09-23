<template>
    <div id="categorical-chart">
        <div v-if="showCatTabContent" class="dv-canvas-container">
            <div>
                <div class="d-flex justify-content-between mb-2">
                    <dv-select-header
                        title="Labels"
                        :tooltip-text="'Use this dropdown to choose the indicator for the labels on the X-axis. Please note that only one indicator can be selected at a time.'"
                        :labels="labels"
                        :defaultLabel="yPicked"
                        @updatePicked="$emit('updateYPicked', $event)"
                    ></dv-select-header>
                    <dv-select-header
                        title="Chart type"
                        :tooltip-text="'Use this dropdown to choose the type of chart you want to display.'"
                        :labels="viewTypes"
                        :defaultLabel="chartType"
                        @updatePicked="updateChartType"
                    ></dv-select-header>
                </div>
            </div>
            <bar-chart
                v-if="chartType.toLowerCase() === 'bar'"
                :chartData="chartData"
                :options="chartOptions"
            ></bar-chart>
            <line-chart
                class="mx-auto"
                v-else-if="chartType.toLowerCase() === 'line'"
                :chartData="chartData"
                @remove-chart="$emit('removeChart', $event)"
            ></line-chart>
            <pie-chart
                class="mx-auto"
                v-else-if="chartType.toLowerCase() === 'pie'"
                :chartData="chartData"
                :options="chartOptions"
            ></pie-chart>
            <doughnut-chart
                v-else-if="chartType.toLowerCase() === 'doughnut'"
                :chartData="chartData"
                :options="chartOptions"
            ></doughnut-chart>
        </div>
        <div v-else>
            No categorical data to show.
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import DvSelectHeader from "./DvSelectHeader.vue";
import BarChart from "../charts/BarChart.vue";
import LineChart from '../charts/LineChart.vue';
import DoughnutChart from '../charts/DoughnutChart.vue';
import PieChart from '../charts/PieChart.vue';

// Props
const props = defineProps({
    showCatTabContent: Boolean,
    labels: Array,
    yPicked: String,
    viewType: String,
    viewTypes: Array,
    chartData: Object,
    chartOptions: Object,
    updateYPicked: Function,
    removeChart: Function
});

// Reactive state for chartType
const chartType = ref(props.viewType);

// Update chartType function
const updateChartType = (label) => {
    chartType.value = label;
};

</script>
