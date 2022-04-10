<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  toRef,
  toRefs,
  watch,
} from 'vue';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';

exportingInit(Highcharts);

export interface SeriesData {
  name?: string;
  y: number;
  color?: string;
}

export interface ChartTitleInterface {
  text: string;
}

export interface ChartOptionsInterface {
  labels: boolean;
  legend: boolean;
}

export default defineComponent({
  props: {
    title: {
      type: Object as () => ChartTitleInterface,
    },
    name: {
      type: String,
    },
    data: {
      type: Array as () => Array<SeriesData>,
    },
    options: Object as () => ChartOptionsInterface,
  },
  setup(props) {
    const { name: nameRef, options: optionsRef } = toRefs(props);

    const state = reactive({
      chartData: props.data,
      chartOptions: {
        chart: {
          type: 'pie',
        },
        title: props.title,
        tooltip: {
          pointFormat: '{series.name}: {point.percentage:.1f}%',
        },
        plotOptions: {
          pie: {
            cursor: 'pointer',
            dataLabels: {
              enabled: props.options?.labels,
              format: '<b>{point.name}</b>: {point.y} ',
            },
            showInLegend: props.options?.legend,
          },
          series: {
            animation: false,
          },
        },
        series: [
          {
            name: props.name,
            colorByPoint: true,
            data: [] as SeriesData[],
          },
        ],
      },
    });

    onUpdated(() => {
      console.log(`in props: ${props.options?.labels}`);
      console.log(`in props: ${props.options?.legend}`);
      console.log(
        `in state: ${state.chartOptions.plotOptions.pie.dataLabels.enabled}`
      );
      console.log(
        `in state: ${state.chartOptions.plotOptions.pie.showInLegend}`
      );
    });

    onMounted(() => {
      if (props.data) {
        state.chartOptions.series[0].data = sortChartData(props.data);
      }
    });

    watch(
      () => optionsRef.value,
      (options, prevOptions) => {
        console.log('zatralen');
        state.chartOptions.plotOptions.pie.dataLabels.enabled = options?.labels;
        state.chartOptions.plotOptions.pie.showInLegend = options?.legend;
      },
      { deep: true }
    );

    watch(
      () => nameRef.value,
      (name, prevName) => {
        state.chartOptions.series[0].name = name;
      }
    );

    watch(
      () => state.chartData,
      (data, prevData) => {
        if (data) {
          state.chartOptions.series[0].data = sortChartData(data);
        }
      },
      { deep: true }
    );

    const sortChartData = (data: SeriesData[]): SeriesData[] => {
      const newData = new Array(...data);
      return newData.sort((a, b) => {
        return b.y - a.y;
      });
    };

    return {
      state,
    };
  },
});
</script>

<template>
  <div class="my-6">
    <highcharts :options="state.chartOptions" ref="chart"></highcharts>
  </div>
</template>
