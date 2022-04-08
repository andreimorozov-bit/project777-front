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
  },
  setup(props) {
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
            data: [] as SeriesData[],
          },
        ],
      },
    });

    const { name: nameRef } = toRefs(props);

    // onUpdated(() => {
    //   chartUpdateTitle(props.title || '');
    //   console.log(props.title);
    //   chartUpdateName(props.name || '');
    //   console.log(props.name);
    // });

    // const chartUpdateTitle = (title: string) => {
    //   state.chartOptions.title.text = title;
    // };

    // const chartUpdateName = (name: string) => {
    //   state.chartOptions.series[0].name = name;
    // };

    onMounted(() => {
      if (props.data) {
        state.chartOptions.series[0].data = sortChartData(props.data);
        console.log(`in props: ${props.name}`);
        console.log(`in state: ${state.chartOptions.series[0].name}`);
      }
    });

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
