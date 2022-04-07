<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
// import Highcharts from 'highcharts';

export interface SeriesData {
  name?: string;
  y: number;
  color?: string;
}

export default defineComponent({
  // components: {
  //   highcharts: Highcharts,
  // },
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

    // const chartValueIncrement = (index: number) => {
    //   state.chartOptions.series[0].data[index].y++;
    // };

    // const chartValueDecrement = (index: number) => {
    //   if (state.chartOptions.series[0].data[index].y > 0) {
    //     state.chartOptions.series[0].data[index].y--;
    //   }
    // };

    return {
      state,
    };
  },
});
</script>

<template>
  <!-- <div class="flex flex-col">
    <div
      v-for="(item, index) in state.chartOptions.series[0].data"
      :key="item.name"
      class="flex flex-row items-center"
    >
      <div class="w-32">{{ item.name }}</div>
      <button
        @click="chartValueDecrement(index)"
        class="p-1 m-2 w-8 h-8 text-white font-bold bg-emerald-600"
      >
        -
      </button>
      <div class="w-12 text-center">
        {{ state.chartOptions.series[0].data[index].y }}
      </div>
      <button
        @click="chartValueIncrement(index)"
        class="p-1 m-2 w-8 h-8 text-white font-bold bg-emerald-600"
      >
        +
      </button>
    </div>
  </div> -->
  <div>
    <highcharts
      class="hc"
      :options="state.chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>
