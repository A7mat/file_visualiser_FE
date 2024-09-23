<!-- TODO: APPLY LOGIC, Form the json file and send it (through store?) -->
<template>
    <div class="dv-feedback-tool-wrapper">
        <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
                Don't like the default view? suggest a better one <span @click="showFeedbackTool = !showFeedbackTool" class="text-primary pointer" type="button">here</span> 
            </small>
        </div>

        <div v-if="showFeedbackTool" class="dv-feedback-tool-wrapper">
            <form v-if="showFeedbackForm" action="" class="feedback-tool-form" @submit.prevent>
                <span>Suggest a default View Option (Numerical, Categorical or Table View): </span>
                <dv-select-header class="py-3" title="View Option" :defaultLabel="selectedView" :labels="navOptions"  @updatePicked="(label) => {selectedView = label}"></dv-select-header>

                <div v-if="selectedView == 'Numerical View'" class="dv-feedback-form-numerical">
                    <span>Suggest a Chart type and/or Labels and Values to be set as default: </span>
    
                    <div class="d-flex dv-fb-options py-3">
                        <dv-select-header title="Chart type" :defaultLabel="suggestedChartType || defaultSuggestedChartType" :labels="allChartOptions"  @updatePicked="(label) => {suggestedChartType = label}"></dv-select-header>
                        <dv-select-header title="Labels" :defaultLabel="suggestedX || defaultSuggestedX" :labels="allLabels" @updatePicked="(label) => {suggestedX = label}"></dv-select-header>
                        <dv-select-header title="Values" :defaultLabel="suggestedY || defaultSuggestedY" :labels="allLabels" @updatePicked="(label) => {suggestedY = label}"></dv-select-header>
                    </div>
                </div>

                <div v-if="selectedView == 'Categorical View'" class="dv-feedback-form-categorical">
                    <span>Suggest a Chart type and/or Labels to be set as default: </span>
    
                    <div class="d-flex dv-fb-options py-3">
                        <dv-select-header title="Chart type" :defaultLabel="suggestedChartType || defaultSuggestedChartType" :labels="allChartOptions"  @updatePicked="(label) => {suggestedChartType = label}"></dv-select-header>
                        <dv-select-header title="Labels" :defaultLabel="suggestedCategoricalLabel || categoricalLabels[0]" :labels="categoricalLabels" @updatePicked="(label) => {suggestedCategoricalLabel = label}"></dv-select-header>
                    </div>
                </div>
                
                <br>
                <input @click="showFeedbackTool = false" class="btn btn-outline-dark mr-2 mb-1" type="button" value="Cancel">
                <input @click="submitFeedbackInput" class="btn btn-primary mb-1" type="button" value="Submit">
            </form>
            <div v-else class="text-center m-5">
                Thank you for your feedback!
            </div>
        </div>
    </div> 
</template>

<script setup>
    import DvSelectHeader from './DvSelectHeader.vue';
    import { ref } from 'vue';

    const props = defineProps({
        allChartOptions: Array,
        allLabels: Array,
        categoricalLabels: Array,
        defaultSuggestedChartType: String,
        defaultSuggestedX: String,
        defaultSuggestedY: String,
    });

    const navOptions = ["Numerical View", "Categorical View", "Table View"]
    const selectedView = ref('Numerical View')
    const showFeedbackTool = ref(false)
    const showFeedbackForm = ref(true)
    const suggestedChartType = ref(props.defaultSuggestedChartType)
    const suggestedX = ref(props.defaultSuggestedX)
    const suggestedY = ref(props.defaultSuggestedY)
    const suggestedCategoricalLabel = ref(props.categoricalLabels[0])
    
    const submitFeedbackInput = () => {
        // TODO implement feedback-tool logic
        showFeedbackForm.value = false;
    }

</script>

<style lang="scss">
    .ag-header-cell-label{
        justify-content: center;
    }
</style>