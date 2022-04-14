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
import type { PropType } from 'vue';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';

exportingInit(Highcharts);

export interface TitleInterface {
  text: string;
}

export interface XAxisInterface {
  categories: Array<string>;
}

export interface YAxisInterface {
  title: {
    text: string;
  };
}

export interface SeriesInterface {
  name: string;
  data: Array<number>;
}

export interface OptionsInterface {
  title: TitleInterface;
  xAxis: XAxisInterface;
  yAxis: YAxisInterface;
  series: Array<SeriesInterface>;
}

export default defineComponent({
  props: {
    options: Object as PropType<OptionsInterface>,
  },
  setup(props) {
    const state = reactive({
      chartData: props.options,
      chartOptions: {
        chart: {
          type: 'column',
        },
        title: props.options?.title,
        tooltip: {
          pointFormat: '{series.name}: {point.y:.1f}',
        },
        xAxis: props.options?.xAxis,
        yAxis: props.options?.yAxis,
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
          },
          series: {
            animation: false,
          },
        },
        series: props.options?.series,
      },
    });

    // onMounted(() => {
    //   if (props.data) {
    //     state.chartOptions.series[0].data = sortChartData(props.data);
    //   }
    // });

    // watch(
    //   () => optionsRef.value,
    //   (options, prevOptions) => {
    //     state.chartOptions.plotOptions.pie.dataLabels.enabled = options?.labels;
    //     state.chartOptions.plotOptions.pie.showInLegend = options?.legend;
    //   },
    //   { deep: true }
    // );

    // watch(
    //   () => nameRef.value,
    //   (name, prevName) => {
    //     state.chartOptions.series[0].name = name;
    //   }
    // );

    // watch(
    //   () => state.chartData,
    //   (data, prevData) => {
    //     if (data) {
    //       state.chartOptions.series[0].data = sortChartData(data);
    //     }
    //   },
    //   { deep: true }
    // );

    // const sortChartData = (data: SeriesData[]): SeriesData[] => {
    //   const newData = new Array(...data);
    //   return newData.sort((a, b) => {
    //     return b.y - a.y;
    //   });
    // };

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
