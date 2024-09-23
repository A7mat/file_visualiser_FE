<template>
    <!-- Tab for Table View -->
    <div class="dv-table-wrapper">
        <ag-grid-vue
        :rowData="rowData"
        :columnDefs="columnLabels"
        style="height: 538px"
        class="ag-theme-quartz"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        >
        </ag-grid-vue>
    </div> 
</template>

<script setup>
    import { ref } from 'vue';
    import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component

    const props = defineProps({
        columnTitles: Array,
        rowData: Array
    });

    const rowData = ref(props.rowData);
    const columnLabels = ref([]);
    props.columnTitles.forEach(e => columnLabels.value.push({field: e, filter: 'agTextColumnFilter'})) // format correctly for the grid tool
    
    const paginationPageSize = ref(null);
    const paginationPageSizeSelector = ref(null);

    paginationPageSize.value = 10;
    paginationPageSizeSelector.value = [10, 25, 50, 100];

</script>

<style lang="scss">
    .ag-header-cell-label{
        justify-content: center;
    }
</style>