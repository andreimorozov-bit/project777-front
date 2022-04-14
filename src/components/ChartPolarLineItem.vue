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
  gridLineInterpolation: string;
  lineWidth: number;
  min: number;
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
          polar: true,
        },
        title: props.options?.title,
        pane: {
          size: '100%',
        },
        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
        },
        xAxis: props.options?.xAxis,
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
        },
        plotOptions: {
          series: {
            animation: false,
          },
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
