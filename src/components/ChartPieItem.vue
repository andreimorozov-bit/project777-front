<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUpdated,
  reactive,
  toRef,
  toRefs,
  watch,
  type PropType,
} from 'vue';
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
  width?: number | string;
  spacingRight: number;
  marginRight: number;
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

export interface SeriesDataInterface {
  name: string;
  y: number;
}

export interface SeriesInterface {
  name: string;
  data: Array<SeriesDataInterface>;
  pointPlacement?: string | undefined;
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

export interface OptionsInterface {
  chart: ChartInterface;
  legend: LegendInterface;
  colors: string[];
  title: TitleInterface;
  series: Array<SeriesInterface>;
  plotOptions: PlotOptionsinterface;
}

export default defineComponent({
  props: {
    options: Object as PropType<OptionsInterface>,
  },
  setup(props) {
    const state = reactive({
      chartData: props.options,
      chartWidth: ' w-full',
      chartOptions: {
        chart: props.options?.chart,
        title: props.options?.title,
        colors: props.options?.colors,
        plotOptions: props.options?.plotOptions,
        legend: props.options?.legend,
        series: props.options?.series,
      },
      someKey: 1,
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
