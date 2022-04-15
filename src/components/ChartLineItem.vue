<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import highchartsMore from 'highcharts/highcharts-more';

highchartsMore(Highcharts);

exportingInit(Highcharts);

export interface TitleInterface {
  text: string;
}

export interface XAxisInterface {
  categories: Array<string>;
}

export interface YAxisInterface {
  title?: {
    text: string;
  };
  min?: number;
  max?: number;
}

export interface SeriesInterface {
  name: string;
  data: Array<number>;
  pointPlacement?: string | undefined;
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
          type: 'line',
        },
        title: props.options?.title,

        xAxis: props.options?.xAxis,
        yAxis: props.options?.yAxis,
        plotOptions: {
          series: {
            animation: false,
          },
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
        },
        series: props.options?.series,
      },
    });

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
