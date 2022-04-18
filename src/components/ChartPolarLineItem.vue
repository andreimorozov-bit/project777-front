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
    text?: string;
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
        pane: {
          size: '90%',
        },
        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
        },
        xAxis: props.options?.xAxis,
        yAxis: props.options?.yAxis,
        plotOptions: {
          series: {
            animation: false,
          },
        },
        legend: props.options?.legend,
        series: props.options?.series,
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 600,
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  layout: 'horizontal',
                },
                pane: {
                  size: '80%',
                },
              },
            },
          ],
        },
      },
    });

    return {
      state,
    };
  },
});
</script>

<template>
  <div class="my-6 max-w-[700px]">
    <highcharts :options="state.chartOptions" ref="chart"></highcharts>
  </div>
</template>
