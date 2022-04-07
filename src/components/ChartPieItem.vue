<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

export interface SeriesData {
  name?: string;
  y: number;
  color?: string;
}

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    data: {
      type: Array as () => Array<SeriesData>,
    },
  },
  setup(props) {
    const state = reactive({
      chartOptions: {
        chart: {
          type: 'pie',
        },
        title: {
          text: props.title,
        },
        tooltip: {
          pointFormat: '{series.name}: {point.percentage:.1f}%',
        },
        plotOptions: {
          pie: {
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y} ',
            },
            showInLegend: false,
          },
          series: {
            animation: false,
          },
        },
        series: [
          {
            name: props.name,
            colorByPoint: true,
            data: props.data,
          },
        ],
      },
    });

    return {
      state,
    };
  },
});
</script>

<template>
  <div>
    <highcharts
      class="hc"
      :options="state.chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>
