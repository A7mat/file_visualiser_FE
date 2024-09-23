<template>
    <div class="dv-card-header card-header">
        <ul class="dv-nav-tabs nav nav-tabs card-header-tabs">
            <li class="nav-item" role="tab" :aria-controls="'numerical-chart'"
            :aria-selected="activeTab === 'numerical'" aria-label="Numerical chart tab">
                <a class="nav-link" :class="{active: activeTab === 'numerical'}" href="#" @click.prevent="$emit('showTab', 'numerical')">Numerical Data</a>
            </li>
            <li class="nav-item" role="tab" :aria-controls="'categorical-chart'"
            :aria-selected="activeTab === 'categorical'" aria-label="Categorical chart tab">
                <a class="nav-link" :class="{active: activeTab === 'categorical'}" href="#" @click.prevent="$emit('showTab', 'categorical')">Categorical Data</a>
            </li>
            <li class="nav-item" role="tab" :aria-controls="'table-view'"
            :aria-selected="activeTab === 'table-view'" aria-label="Table view tab">
                <a class="nav-link" :class="{active: activeTab === 'table-view'}" href="#" @click.prevent="$emit('showTab', 'table-view')">Table View</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'DvNavBar',
    props: {
        activeTab: {
            type: String
        },
        showTab: {
            type: Function
        }
    }
}
</script>
