<template>
  <div class="mr-md-2 mt-0">
    <!-- Header -->
    <div class="dpsh-header mb-2 d-flex align-items-center w-100 justify-content-between">
      <span class="font-weight-bold ml-1"> {{ title }}</span>
      <i v-if="tooltipText"
         class="tooltip-icon material-icons align-right text-dark pl-1"
         data-toggle="tooltip"
         type="button"
         :title="tooltipText"
         data-placement="top">
        help_outline
      </i>
    </div>

    <!-- Dropdown -->
    <div class="col-right mr-md-2 d-inline" role="group" aria-label="Dropdown">
      <div class="btn-group dpsh-dropdown" role="group">
        <button class="dpsh-button list-group-item col w-100 d-flex flex-row justify-content-md-between p-0 align-items-center overflow-hidden text-truncate  flex-shrink-1"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false">
          <div class="dpsh-button-selected pl-2 h-100 align-items-center text-truncate">
            {{ displayedLabel }}
          </div>
          <div class="dpsh-select__icon">
            <i class="material-icons" focusable="false" aria-hidden="true">arrow_drop_down</i>
          </div>
        </button>

        <ul class="dropdown-menu dpsh-dropdown-items btnGroupDrop" aria-labelledby="btnGroupDrop">
          <div v-if="multiSelect">
            <button v-for="(label, index) in labels"
                    :key="index"
                    class="dropdown-item pl-3"
                    :class="{ 'picked': checkedItems[label] }">
              <label :for="'input-' + index">
                <input v-if="multiSelect"
                       :id="'input-' + index"
                       type="checkbox"
                       class="mr-1"
                       :checked="checkedItems[label]"
                       @click="emitChoice(label)"
                       aria-label="Checkbox">
                {{ label }}
              </label>
            </button>
          </div>
          <div v-else>
            <button v-for="(label, index) in labels"
                    :key="index"
                    class="dropdown-item pl-3"
                    @click="emitChoice(label)">
              {{ label }}
            </button>
          </div>
        </ul>
      </div>
    </div>
    <!-- <button v-if="multiSelect" class="btn dpsh-add-btn" type="button" role="group" data-toggle="dropdown" data-target="">+ add multiple values</button> -->
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
  title: String,
  tooltipText: String,
  multiSelect: Boolean,
  labels: Array,
  defaultLabel: [Array, String],
  updatePicked: Function,
});

const emit = defineEmits(['updatePicked']);

const checkedItems = ref({});

const displayedLabel = computed(() => {
  if (Array.isArray(props.defaultLabel)) {
    return props.defaultLabel.join(', ');
  } else {
    return props.defaultLabel;
  }
});

const emitChoice = (label) => {
  checkedItems.value[label] = !checkedItems.value[label];
  emit('updatePicked', label);
};

watchEffect(() => {
  if (props.multiSelect) {
    props.labels.forEach(label => {
      if (props.defaultLabel.includes(label)) {
        checkedItems.value[label] = true;
      } else {
        checkedItems.value[label] = false;
      }
    });
  }
});
</script>

<style lang="scss" scoped>
.dpsh-button {

}

.dpsh-button-selected {
  width: 165px;
  line-height: 45px;
  text-align: left;
}

.dpsh-header {
    max-width: 200px;
}

.tooltip-icon {
    cursor: default;
    font-size: 15px;
}

.dpsh-dropdown {
    width: 200px;
    height: 48px;
    > button {
        border: 1px dashed lightblue;
        border-radius: 4px;
    }
    .dropdown-menu {
        margin: 0;
    }
}

.dpsh-select__icon {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 2.75rem;
    z-index: 0;
}

.dpsh-dropdown-items {
    border-radius: 4px !important;
    border: dashed 1px lightblue !important;
    width: 198px;
    padding: 0;
    overflow: auto;

    & .dropdown-item.picked {
        background-color: lightblue;
        color: white;
    }
}

.dpsh-add-btn {
    height: 48px;
    align-self: end;
    background-color: lightblue;
    color: white;

    &:hover {
        color: white;
    }
}
</style>
