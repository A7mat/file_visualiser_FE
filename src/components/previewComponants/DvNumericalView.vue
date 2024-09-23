<template>
    <div>
        <div v-if="showNumTabContent" class="dv-numtab-content dv-canvas-container">
            <div>
                <div class="d-flex justify-content-between">
                    <div class="mb-2 d-flex">
                        <div class="mr-3 d-flex flex-column align-items-start">
                            <dv-select-header
                                title="Labels"
                                :tooltip-text="'Use this dropdown to choose the indicator for the labels on the X-axis. Please note that only one indicator can be selected at a time.'"
                                :labels="categoricalLabels"
                                :defaultLabel="xPicked"
                                @updatePicked="$emit('updateXPicked', $event)"
                            ></dv-select-header>
                        </div>
                        <div class="d-flex flex-column align-items-start">
                            <dv-select-header
                                title="Values"
                                :tooltip-text="'Use this dropdown to choose the indicators for the values on the Y-axis. You can select multiple indicators by clicking on them. Click an indicator again to remove it.'"
                                :labels="numericalLabels"
                                :multiSelect="true"
                                :defaultLabel="yPicked"
                                @updatePicked="$emit('updateYPicked', $event)"
                            ></dv-select-header>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-start">
                        <dv-select-header
                            title="Chart type"
                            :tooltip-text="'Use this dropdown to choose the type of chart you want to display.'"
                            :labels="viewTypes"
                            :defaultLabel="chartType"
                            @updatePicked="updateChartType"
                        ></dv-select-header>
                    </div>
                </div>
            </div>
            <bar-chart
                v-if="chartType.toLowerCase() === 'bar'"
                :chartData="chartData"
                :options="chartOptions"
            ></bar-chart>
            <line-chart
                v-else-if="chartType.toLowerCase() === 'line'"
                :chartData="chartData"
                @remove-chart="$emit('removeChart', $event)"
            ></line-chart>
            <pie-chart
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
        <div v-else class="m-5">No numerical data to show.</div>
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
    showNumTabContent: Boolean,
    categoricalLabels: Array,
    numericalLabels: Array,
    xPicked: String,
    yPicked: Array,
    viewType: String,
    viewTypes: Array,
    chartData: Object,
    chartOptions: Object,
    updateXPicked: Function,
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
