<template>
  <Layout>
    <div class="dv-preview-container container my-5">
      <h2
        class="mb-lg-4 mt-lg-4 text-center header-visualisation"
        data-toggle="tooltip"
        data-placement="top"
        data-cy="dataset-distribution-preview"
      >
      Data Visualiser
      </h2>
      <!-- Card -->
      <div v-if="this.jsonData" class="dv-card card text-center">
        <!-- Card Header (Navigation bar) -->
        <dv-nav-bar @showTab="showTab" :activeTab="activeTab"></dv-nav-bar>
  
        <!-- Card Body -->
        <div class="card-body">
          {{ addData() }}
          <!-- Tab for Numerical Charts -->
          <dv-numerical-view
            v-if="activeTab == 'numerical'"
            role="tabpanel"
            :showNumTabContent="showNumTabContent"
            :categoricalLabels="categoricalLabels"
            :numericalLabels="numericalLabels"
            :xPicked="xPicked"
            :yPicked="yPicked"
            :viewType="viewType"
            :viewTypes="viewOptions.map((e) => e.label)"
            :chartData="dataCollection"
            :chartOptions="options"
            @updateXPicked="updateXPicked"
            @updateYPicked="updateYPicked"
            @removeChart="removeChart"
          >
          </dv-numerical-view>
          <!-- Tab for Categorical Charts -->
          <dv-categorical-view
            v-else-if="activeTab == 'categorical'"
            role="tabpanel"
            :showCatTabContent="showCatTabContent"
            :labels="categoricalLabels"
            :yPicked="catYPicked"
            :viewType="catViewType"
            :viewTypes="catViewOptions.map((e) => e.label)"
            :chartData="catDataCollection"
            :chartOptions="options"
            @updateYPicked="updateCatYPicked"
            @removeChart="removeChart"
          >
          </dv-categorical-view>
          <!-- Tab for Table View -->
          <dv-tabular-view
            v-else-if="activeTab == 'table-view'"
            role="tabpanel"
            id="dv-table-view"
            :columnTitles="allLabels"
            :rowData="dataRows"
          >
          </dv-tabular-view>
        </div>
      </div>
  
      <!-- Records range bar -->
      <div class="dv-records-range-container text-right">
        <small class="dv-records-range-container-record-number mr-1"
          >{{ this.dataRows.length }} Records</small
        >
        <small v-if="activeTab === 'numerical'">
          <label for="from">show records from</label>
          <input
            @change="updateRange"
            type="number"
            id="from"
            v-model.number="fromIndex"
            min="1"
          />
          <label for="to">-</label>
          <input
            @change="updateRange"
            type="number"
            id="to"
            v-model.number="toIndex"
            :min="fromIndex"
            :max="this.dataRows.length"
          />
        </small>
      </div>
  
      <br />
  
      <!-- Feedback Tool -->
      <!-- <dv-feedback-tool
              :allChartOptions="allChartOptions" 
              :allLabels="allLabels" 
              :categoricalLabels="categoricalLabels"
              :defaultSuggestedChartType="defaultSuggestedChartType"
              :defaultSuggestedX="defaultSuggestedX"
              :defaultSuggestedY="defaultSuggestedY"
          /> -->
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/LayoutCustom.vue";
import DvNavBar from "../components/previewComponants/DvNavBar.vue";
import DvNumericalView from "../components/previewComponants/DvNumericalView.vue";
import DvCategoricalView from "../components/previewComponants/DvCategoricalView.vue";
import DvTabularView from "../components/previewComponants/DvTabularView.vue";
// import DvFeedbackTool from './previewComponants/DvFeedbackTool.vue';

export default {
  name: "DistributionVisualisation",
  components: {
    Layout,
    DvNavBar,
    DvNumericalView,
    DvCategoricalView,
    DvTabularView,
    // DvFeedbackTool
  },
  data() {
    return {
      // print: false,
      jsonData: null,
      activeTab: "",
      allLabels: [],
      categoricalLabels: [],
      numericalLabels: [],
      fromIndex: 1,
      toIndex: null,
      viewOptions: [
        { value: "Bar", label: "Bar" },
        { value: "Line", label: "Line" },
      ],
      showNumTabContent: true,
      chartLabels: [],
      viewType: "",
      xPicked: "",
      yPicked: [], // multiple y labels can be picked --> Array of strings
      xLabels: [],
      dataCollection: {},
      datasets: [], // dataRows, label, backgroundColor
      dataRows: [], // only the data arrays
      hideXLabels: false,

      catViewOptions: [
        { value: "Bar", label: "Bar" },
        // { value: "Pie", label:"Pie" },
        // { value: "Line", label:"Line" },
        { value: "Doughnut", label: "Doughnut" },
      ],
      showCatTabContent: true,
      nCatToShow: 100, // TODO: tell that not all categories are shown (in tooltip for example)
      catChartValues: [],
      catYValues: [],
      catViewType: "",
      catYPicked: "", // only Y, because X will be automatically generated from the categories of Y
      catDataCollection: {},
      catDatasets: [], // dataRows, label, backgroundColor
      categorizedData: [],

      currentPage: 1,
      totalPages: 0,
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        scales: {
          // yAxes: {
          //     beginAtZero: false
          // },
          x: {
            ticks: {
              maxTicksLimit: 20,
            },
          },
        },
        plugins: {
          legend: {
            onClick: (e, legendItem) => {
              // this.removeChart(legendItem.text)
            },
            display: true,
            labels: {
              borderRadius: 10,
              useBorderRadius: true,
              pointStyle: "circle",
              usePointStyle: true,
              padding: 20,
            },
          },
        },
      },
      // Feedback tool
      allChartOptions: ["Line", "Bar", "Pie", "Doughnut"],
      defaultSuggestedChartType: "",
      defaultSuggestedX: "",
      defaultSuggestedY: "",
    };
  },
  mounted() {
    // Einlesen
    // ToDo: this will change once the app is complet, then the JSON file should be fetched in a RESTful manner
    // For now you can test by using test files in the public directory
    fetch("/test_json_4.json")
      .then((response) => {
        const reader = response.body.getReader();
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((res) => res.json())
      .then((data) => (this.jsonData = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    showTab(tabName) {
      this.activeTab = tabName;
    },
    // Once the JSON record is fetched, this method is called to fill all the data() fields with the necessary data
    addData() {
      this.activeTab = this.activeTab
        ? this.activeTab
        : this.jsonData.default_view_options.default_view;
      this.allLabels = this.jsonData.labels.all_labels;
      this.numericalLabels = this.jsonData.labels.numerical_labels;
      if (this.numericalLabels.length == 0) this.showNumTabContent = false;
      this.categoricalLabels = this.jsonData.labels.categorical_labels;
      if (this.categoricalLabels.length == 0) {
        this.showCatTabContent = false;
        // this.showXLabels = false;
      }
      this.viewType = this.viewType
        ? this.viewType
        : this.jsonData.default_view_options.default_numerical_view;
      this.xPicked = this.xPicked
        ? this.xPicked
        : this.jsonData.default_view_options.default_axes.numerical_chart.x;
      this.yPicked[0] =
        this.yPicked && this.yPicked.length
          ? this.yPicked[0]
          : this.jsonData.default_view_options.default_axes.numerical_chart.y;

      this.catViewType = this.catViewType
        ? this.catViewType
        : this.jsonData.default_view_options.default_categorical_view;
      this.catYPicked = this.catYPicked
        ? this.catYPicked
        : this.jsonData.default_view_options.default_axes.categorical_chart;
      this.dataRows = this.jsonData.data; // this line can take time
      if (!this.toIndex)
        this.toIndex = this.dataRows.length < 100 ? this.dataRows.length : 100;
      this.categorizedData = this.jsonData.categorized;

      let yValues = this.dataRows
        .map((e) => e[this.yPicked[0]])
        .slice(this.fromIndex - 1, this.toIndex);
      if (this.datasets.length == 0)
        this.datasets[0] = {
          label: this.yPicked[0],
          data: yValues,
          backgroundColor: "#001D85",
          borderColor: "#001D85",
          borderWidth: 1,
        };

      this.defaultSuggestedChartType = this.allChartOptions[0];
      this.defaultSuggestedX = this.categoricalLabels[0];
      this.defaultSuggestedY = this.numericalLabels[0];
    },
    fillNumPlotData() {
      // In case there are no assigned lables, create empty lables (chart.js needs an array of lables, otherwise empty chart will display)
      if (this.xLabels.length === 0 || this.hideXLabels) {
        let emptyValues = Array(this.datasets[0].data.length).fill("");

        this.dataCollection = {
          labels: emptyValues,
          datasets: structuredClone(this.datasets),
        };
      } else {
        let tmpDatasets = JSON.parse(JSON.stringify(this.datasets));
        for (let i = 0; i < tmpDatasets.length; i++) {
          tmpDatasets[i].data = this.datasets[i].data.slice(
            this.fromIndex - 1,
            this.toIndex
          );
        }
        this.xLabels = this.chartLabels.slice(this.fromIndex - 1, this.toIndex);
        this.dataCollection = {
          labels: this.xLabels,
          datasets: tmpDatasets,
        };
      }
    },
    fillCatPlotData() {
      this.catChartValues = Object.keys(
        this.categorizedData.find((e) => e.column === this.catYPicked)
          .categories
      ).slice(0, this.nCatToShow); // get array of all category names of yPicked
      this.catYValues = Object.values(
        this.categorizedData.find((e) => e.column === this.catYPicked)
          .categories
      ).slice(0, this.nCatToShow); // get array of all category counts of yPicked
      (this.catDatasets[0] = {
        label: this.catYPicked,
        data: this.catYValues,
        backgroundColor: this.catYValues.map(() => this.randomColor()),
      }),
        (this.catDataCollection = {
          labels: this.catChartValues,
          datasets: JSON.parse(JSON.stringify(this.catDatasets)).slice(
            0,
            this.nCatToShow
          ),
        });
    },
    updateRange() {
      this.fillNumPlotData();
    },
    // Called when user chooses or removes new Y-Lables
    updateXPicked(label) {
      this.xPicked = label;
    },
    updateYPicked(label) {
      if (this.datasets.map((e) => e.label).includes(label)) {
        let index = this.yPicked.indexOf(label);
        if (index > -1) {
          // only splice array when item is found
          this.yPicked.splice(index, 1); // 2nd parameter means remove one item only
        }
        this.removeChart(label);
      } else {
        this.yPicked.push(label);
        this.addSelectedChart(label);
      }
    },
    updateCatYPicked(label) {
      this.catYPicked = label;
    },
    addSelectedChart(label) {
      let yTmpValues = this.dataRows.map((e) => e[label]);
      const randomColor = this.randomColor();
      this.datasets.push({
        label: label,
        data: yTmpValues.slice(this.fromIndex - 1, this.toIndex),
        backgroundColor: randomColor,
        borderColor: randomColor,
        borderWidth: 1,
      });
      this.fillNumPlotData();
    },
    removeChart(label) {
      this.datasets = this.datasets.filter((o) => o.label !== label);
      this.fillNumPlotData();
    },
    randomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  watch: {
    // chartData() {
    // this.$data._chart.update();
    // },
    xPicked() {
      this.$emit("input", this.xPicked);
      this.chartLabels = this.dataRows
        .map((e) => e[this.xPicked])
        .slice(this.fromIndex - 1, this.toIndex);
      this.xLabels = this.chartLabels;
      this.fillNumPlotData();
    },
    hideXLabels() {
      this.fillNumPlotData();
    },
    catViewType() {
      if (this.catViewType === "Pie") this.nCatToShow = 20;
      else if (this.catViewType === "Bar") this.nCatToShow = 50;
      else if (this.catViewType === "Line") this.nCatToShow = 100;
      // this.$emit("input", this.catYPicked);
      this.fillCatPlotData();
    },
    catYPicked() {
      this.$emit("input", this.catYPicked);
      this.fillCatPlotData();
    },
  },
};
</script>

<style scoped lang="scss">
/* Variables for reusable values */
$background-light: #f8f9fa;
$background-dark: #f1f3f5;
$box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
$text-color: #343a40;
$input-border: #ced4da;
$small-text-size: 0.875rem;

/* Container Styles */
.dv-preview-container {
  padding: 20px;
  background-color: $background-light;
  border-radius: 10px;
  box-shadow: $box-shadow;
  margin-bottom: 30px;
}

/* Header Styles */
h2 {
  font-size: 1.75rem;
  font-weight: bold;
  margin: 20px 0;
  text-align: left;
  color: $text-color;
  padding-bottom: 10px;
}

/* Card Styles */
.dv-card {
  &.card {
    margin-top: 20px;
    border: none;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  }

  .card-body {
    padding: 20px;
    margin-top: 15px;
    background-color: #ffffff;
    border-radius: 5px;
  }
}

/* Tab View Margins */
.dv-numerical-view,
.dv-categorical-view,
.dv-tabular-view {
  margin-top: 20px;
}

/* Records Range Bar */
.dv-records-range-container {
  margin-top: 20px;
  margin-right: 20px;
  padding: 10px;
  text-align: right;

  label {
    margin-right: 5px;
    font-size: $small-text-size;
  }

  input {
    text-align: center;
    width: 50px;
  }
  
  .header-visualisation{
    background-color: red;
  }
  .dv-records-range-container-record-number {
    background-color: #f0efed;
    border-radius: 5px;
    padding: 10px 15px;
    font-weight: 650;
  }

  .dv-records-range-container small label {
    padding: 0 5px;
  }

  input {
    width: 80px;
    padding: 5px;
    font-size: $small-text-size;
    border: 1px solid $input-border;
    border-radius: 4px;
  }
}

.tooltip-icon {
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 5px;
  vertical-align: middle;
}

.dv-nav-tabs li .nav-link{
        color: inherit;
        &.active {
            // background-color: oldlace;
            font-weight: bold;
            color: lightblue;
            border-top: 4px solid lightblue;
            margin-bottom: -2px;
        }
        &:hover:not(.active) {
            border-color: transparent;
        }
    }

/* Feedback Tool */
.dv-feedback-tool {
  margin-top: 20px;
  padding: 15px;
  background-color: $background-dark;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
}

.dv-canvas-container canvas {
        max-height: 650px;
    }
@media (max-width: 768px) {
  .dv-preview-container {
    padding: 15px;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
  }

  .dv-card {
    &.card {
      padding: 10px;
    }
  }

  .dv-records-range-container {
    text-align: center;

    label,
    input {
      display: inline-block;
      margin-bottom: 10px;
    }
  }
}
</style>
