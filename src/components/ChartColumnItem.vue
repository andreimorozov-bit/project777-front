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
  style?: {
    color?: string;
  };
}

export interface XAxisInterface {
  categories: Array<string>;
  labels?: {
    style: {
      color: string;
      cursor: string;
      fontSize: string;
    };
  };
}

export interface ChartInterface {
  type?: string;
  backgroundColor?: string;
  spacingRight: number;
}

export interface YAxisInterface {
  title?: {
    text: string;
    style?: {
      color?: string;
    };
  };
  labels?: {
    style: {
      color: string;
      cursor: string;
      fontSize: string;
    };
  };
  min?: number;
  max?: number;
  gridLineColor?: string;
}

export interface LegendInterface {
  align?: string;
  verticalAlign?: string;
  layout?: string;
  itemHiddenStyle?: {
    color?: string;
  };
}

export interface PlotOptionsinterface {
  pie?: {
    allowPointSelect?: boolean;
    cursor?: string;
    dataLabels?: {
      enabled?: boolean;
      format?: string;
      color?: string;
      style?: {
        textOutline?: string;
        color?: string;
      };
    };
  };
  series?: {
    animation?: boolean;
  };
}

export interface SeriesInterface {
  name: string;
  data: Array<number>;
  pointPlacement?: string | undefined;
}

export interface OptionsInterface {
  chart: ChartInterface;
  legend: LegendInterface;
  colors?: string[];
  title: TitleInterface;
  xAxis: XAxisInterface;
  yAxis: YAxisInterface;
  plotOptions: PlotOptionsinterface;
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
        chart: props.options?.chart,
        title: props.options?.title,
        colors: props.options?.colors,
        xAxis: props.options?.xAxis,
        yAxis: props.options?.yAxis,
        plotOptions: {
          series: {
            animation: false,
          },
        },
        legend: props.options?.legend,
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
