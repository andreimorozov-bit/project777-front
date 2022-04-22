<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
import ChartPieItem from './ChartPieItem.vue';
import BaseButtonMd from './BaseButtonMd.vue';
import BaseButtonSquare from './BaseButtonSquare.vue';
import BaseButtonSm from './BaseButtonSm.vue';
import { Close, Plus, Minus } from 'mdue';
import BaseButtonIconSm from './BaseButtonIconSm.vue';
import ChartColumnItem from './ChartColumnItem.vue';
import BaseButtonIconMd from './BaseButtonIconMd.vue';
import BaseButtonIconXs from './BaseButtonIconXs.vue';
import BaseInputMd from './BaseInputMd.vue';
import BaseInputLabelMd from './BaseInputLabelMd.vue';
import ChartLineItem from './ChartLineItem.vue';
import { useConfigStore } from '@/stores/config';
import BaseInputLabelLg from './BaseInputLabelLg.vue';
import { getChartColors } from '../common/chartColors';
import BaseToggle from './BaseToggle.vue';

export interface ChartData {
  name: string;
  data: number[];
}

export default defineComponent({
  components: {
    ChartPieItem,
    BaseButtonMd,
    BaseButtonSquare,
    BaseButtonSm,
    Close,
    Plus,
    Minus,
    BaseButtonIconSm,
    ChartColumnItem,
    BaseButtonIconMd,
    BaseButtonIconXs,
    BaseInputMd,
    BaseInputLabelMd,
    ChartLineItem,
    BaseInputLabelLg,
    BaseToggle,
  },
  setup() {
    const state = reactive({
      options: {
        title: {
          text: 'Потребление булочек за 2021 год',
        },
        colors: [
          '#7cb5ec',
          '#dddddd',
          '#90ed7d',
          '#f7a35c',
          '#8085e9',
          '#f15c80',
          '#e4d354',
          '#2b908f',
          '#f45b5b',
          '#91e8e1',
        ],
        chart: {
          type: 'line',
          spacingRight: 20,
          marginRight: 0,
        },
        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
        },
        xAxis: {
          categories: [
            'январь',
            'февраль',
            'март',
            'апрель',
            'май',
            'июнь',
            'июль',
            'август',
            'сентябрь',
            'октябрь',
            'ноябрь',
            'декабрь',
          ],
        },
        yAxis: {
          title: {
            text: 'булочки',
          },
        },
        plotOptions: {
          series: {
            animation: false,
          },
        },
        series: [
          {
            name: 'Вальдемар',
            data: [50, 40, 45, 10, 20, 10, 23, 27, 30, 21, 26, 32],
          },
          {
            name: 'Джессика',
            data: [30, 60, 70, 40, 30, 15, 19, 30, 35, 38, 40, 42],
          },
          {
            name: 'Леонардо',
            data: [20, 30, 50, 15, 40, 20, 26, 22, 21, 18, 15, 11],
          },
        ],
      },
      chartData: [
        {
          name: 'Вальдемар',
          data: [50, 40, 45, 10, 20, 10, 23, 27, 30, 21, 26, 32],
        },
        {
          name: 'Джессика',
          data: [30, 60, 70, 40, 30, 15, 19, 30, 35, 38, 40, 42],
        },
        {
          name: 'Леонардо',
          data: [20, 30, 50, 15, 40, 20, 26, 22, 21, 18, 15, 11],
        },
      ],
      darkMode: false,
      cumulative: false,
      hovered: {
        category: -1,
        serie: -1,
      },
      selected: {
        category: -1,
        serie: -1,
      },
      someKey: 1,
      chartWidth: 'w-full',
    });

    const configStore = useConfigStore();

    onBeforeMount(() => {
      state.options = getChartColors(state.options, configStore.dark);
    });

    // onMounted(() => {
    //   console.log(chartContainerRef.value);
    //   //@ts-ignore
    //   state.options.chart.width = chartContainerRef.value.clientWidth;
    // });

    watch(
      configStore,
      (dark, prevDark) => {
        state.options = getChartColors(state.options, configStore.dark);
        state.someKey += 1;
      },
      {
        deep: true,
      }
    );

    const getCumulativeChartData = (chartData: ChartData[]) => {
      let newChartData = new Array(...chartData);

      newChartData = newChartData.map((seriesItem, seriesIndex) => {
        const newData = seriesItem.data.map((dataItem, dataIndex) => {
          return seriesItem.data
            .slice(0, dataIndex + 1)
            .reduce((a, b) => a + b);
        });

        return {
          name: seriesItem.name,
          data: newData,
        };
      });

      return newChartData;
    };

    watchEffect(() => {
      if (state.cumulative) {
        state.options.series = getCumulativeChartData(state.chartData);
      } else {
        state.options.series = state.chartData;
      }
      state.someKey += 1;
    });

    const chartSerieAdd = () => {
      const newItem = {
        name: `Сладкоежка ${state.chartData.length + 1}`,
        data: new Array<number>(state.options.xAxis.categories.length).fill(0),
        pointPlacement: 'on',
      };
      state.chartData.push(newItem);
    };

    const chartSerieDelete = (index: number) => {
      state.chartData.splice(index, 1);
    };

    const chartDataNameUpdate = (e: Event, index: number) => {
      state.chartData[index].name = (e.target as HTMLInputElement).value.trim();
    };

    const chartTitleChange = (e: Event) => {
      state.options.title.text = (e.target as HTMLInputElement).value.trim();
    };

    const chartNameChange = (e: Event) => {
      state.options.yAxis.title.text = (
        e.target as HTMLInputElement
      ).value.trim();
    };

    const categoryAdd = () => {
      state.options.xAxis.categories.push('');
      for (let i = 0; i < state.options.series.length; i++) {
        state.options.series[i].data.push(0);
      }
    };

    const categoryDelete = (index: number) => {
      state.options.xAxis.categories.splice(index, 1);
      state.chartData.map((serie, serieIndex) => {
        serie.data.splice(index, 1);
        return serie;
      });
    };

    const getColor = (
      categoryIndex: number | null,
      serieIndex: number | null
    ) => {
      if (state.hovered.category === categoryIndex) {
        return 'red';
      }
      if (state.hovered.serie === serieIndex) {
        return 'red';
      }
      if (
        state.selected.category >= 0 &&
        state.selected.category === categoryIndex
      ) {
        return 'blue';
      }
      if (state.selected.serie === serieIndex) {
        return 'blue';
      }
      return 'gray';
    };

    const categoryDeleteMouseOver = (index: number) => {
      state.hovered.category = index;
    };

    const categoryDeleteMouseLeave = () => {
      state.hovered.category = -1;
      state.hovered.serie = -1;
    };

    const categoryFocus = (
      categoryIndex: number | null,
      serieIndex: number | null
    ) => {
      if (categoryIndex !== null) {
        state.selected.category = categoryIndex;
      }
      if (serieIndex !== null) {
        state.selected.serie = serieIndex;
      }
    };

    const categoryBlur = () => {
      state.selected.category = -1;
      state.selected.serie = -1;
    };

    const serieDeleteMouseOver = (index: number) => {
      state.hovered.serie = index;
    };

    const serieDeleteMouseLeave = () => {
      state.hovered.category = -1;
      state.hovered.serie = -1;
    };

    return {
      state,
      chartDataNameUpdate,
      chartNameChange,
      chartSerieAdd,
      chartSerieDelete,
      chartTitleChange,
      categoryAdd,
      categoryDelete,
      getColor,
      categoryDeleteMouseOver,
      categoryDeleteMouseLeave,
      serieDeleteMouseOver,
      serieDeleteMouseLeave,
      categoryFocus,
      categoryBlur,
    };
  },
});
</script>

<template>
  <div class="flex flex-col w-full text-slate-700 dark:text-slate-400">
    <div class="flex flex-col lg:flex-row flex-auto w-full">
      <div
        class="flex flex-col flex-auto p-2 md:p-4 w-full lg:w-5/12 max-w-[30rem]"
      >
        <div class="flex flex-col items-start my-2">
          <div class="flex-auto w-full min-w-[18rem] max-w-[34rem]">
            <BaseInputLabelLg
              label="Заголовок"
              v-model="state.options.title.text"
            />
          </div>
        </div>
        <div class="flex flex-col items-start">
          <BaseInputLabelLg
            label="Название"
            v-model="state.options.yAxis.title.text"
          />
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="p-2">
          <BaseToggle v-model:checked="state.cumulative"
            >Накопительно</BaseToggle
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col px-2 md:px-4">
      <div
        class="flex flex-row flex-initial flex-wrap py-1 justify-start items-end w-auto"
      >
        <div class="px-2 pb-2 self-end font-semibold dark:text-slate-400">
          Группы
        </div>
        <div
          v-for="(category, categoryIndex) in state.options.xAxis.categories"
          class="flex flex-col text-center flex-none p-0.5 w-20"
        >
          <div class="flex flex-row justify-end">
            <BaseButtonIconXs
              color="red"
              @mouseover="categoryDeleteMouseOver(categoryIndex)"
              @mouseleave="categoryDeleteMouseLeave"
              @click="categoryDelete(categoryIndex)"
            >
              <Close class="text-xl" />
            </BaseButtonIconXs>
          </div>
          <BaseInputMd
            @focus="categoryFocus(categoryIndex, null)"
            @blur="categoryBlur"
            :color="getColor(categoryIndex, null)"
            v-model="state.options.xAxis.categories[categoryIndex]"
          />
        </div>

        <div
          class="flex flex-row items-stretch text-center flex-none p-0.5 h-max w-20"
        >
          <BaseButtonIconMd @click="categoryAdd">
            <Plus class="text-2xl" />
          </BaseButtonIconMd>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col flex-initial justify-start items-start p-2 md:p-4 w-auto"
    >
      <div
        v-for="(serie, serieIndex) in state.chartData"
        :key="serie.name"
        class="flex flex-row flex-initial justify-start items-start w-auto"
      >
        <div
          class="flex flex-row flex-initial flex-wrap justify-start items-end w-fit"
        >
          <div class="flex-auto min-w-[18rem] max-w-[24rem] px-0.5 pb-0.5 pt-4">
            <BaseInputMd
              :color="getColor(null, serieIndex)"
              :value="state.chartData[serieIndex].name"
              @change="(e) => chartDataNameUpdate(e, serieIndex)"
              @focus="categoryFocus(null, serieIndex)"
              @blur="categoryBlur"
            />
          </div>
          <div
            v-for="(serieData, serieDataIndex) in serie.data"
            class="text-center flex-none p-0.5 w-20"
          >
            <BaseInputLabelMd
              :color="getColor(serieDataIndex, serieIndex)"
              :label="state.options.xAxis.categories[serieDataIndex]"
              v-model.number="state.chartData[serieIndex].data[serieDataIndex]"
              @focus="categoryFocus(serieDataIndex, serieIndex)"
              @blur="categoryBlur"
            />
          </div>
        </div>
        <div class="flex flex-row flex-none justify-start items-start">
          <div class="flex-none px-0.5 pt-4">
            <BaseButtonIconSm
              @mouseover="serieDeleteMouseOver(serieIndex)"
              @mouseleave="serieDeleteMouseLeave"
              @click="chartSerieDelete(serieIndex)"
              color="red"
              type="text"
            >
              <Close class="text-xl" />
            </BaseButtonIconSm>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row flex-auto py-1 justify-start items-start min-w-[18rem] p-0.5 pt-4"
      >
        <BaseButtonIconMd @click="chartSerieAdd">
          <Plus class="text-2xl" />
        </BaseButtonIconMd>
      </div>
    </div>

    <div>
      <ChartLineItem
        :options="state.options"
        :chartWidth="state.chartWidth"
        :key="state.someKey"
      />
    </div>
  </div>
</template>
