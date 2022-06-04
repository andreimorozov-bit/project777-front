<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  watch,
  watchEffect,
} from 'vue';
import ChartPieItem from './ChartPieItem.vue';
import BaseButtonMd from './BaseButtonMd.vue';
import BaseButtonSquare from './BaseButtonSquare.vue';
import BaseButtonSm from './BaseButtonSm.vue';
import { Close, Plus, Minus } from 'mdue';
import BaseButtonIconSm from './BaseButtonIconSm.vue';
import BaseInputLabelLg from './BaseInputLabelLg.vue';
import { getChartColors } from '@/common/chartColors';
import { useConfigStore } from '@/stores/config';
import BaseInputMd from './BaseInputMd.vue';
import BaseButtonIconMd from './BaseButtonIconMd.vue';
import Toggle from '@vueform/toggle';
import BaseToggle from './BaseToggle.vue';

export interface ChartData {
  name: string;
  y: number;
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
    BaseInputLabelLg,
    BaseInputMd,
    BaseButtonIconMd,
    Toggle,
    BaseToggle,
  },
  setup() {
    const state = reactive({
      options: {
        title: {
          text: 'Булочек съедено всего',
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
          type: 'pie',
          spacingRight: 20,
          marginRight: 0,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        legend: {
          enable: false,
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
        },
        xAxis: {
          title: {},
        },
        yAxis: {
          title: {},
        },
        plotOptions: {
          pie: {
            showInLegend: true,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                textOutline: 'none',
                color: '#334155',
              },
            },
          },
          series: {
            animation: false,
          },
        },
        series: [
          {
            name: 'Булочки',
            data: [
              {
                name: 'Вальдемар',
                y: 50,
              },
              {
                name: 'Джессика',
                y: 20,
              },
              {
                name: 'Леонардо',
                y: 30,
              },
            ],
          },
        ],
      },
      chartData: [
        {
          name: 'Вальдемар',
          y: 50,
        },
        {
          name: 'Джессика',
          y: 20,
        },
        {
          name: 'Леонардо',
          y: 30,
        },
      ],
      darkMode: false,
      sortData: false,
      hovered: {
        category: -1,
        serie: -1,
      },
      selected: {
        category: -1,
        serie: -1,
      },
      someKey: 1,
      toggle: true,
    });

    const configStore = useConfigStore();

    const sortChartData = (data: ChartData[], needSorting: boolean) => {
      if (state.sortData) {
        let sorted = new Array(...data);
        return sorted.sort((a, b) => {
          return b.y - a.y;
        });
      }
      return state.chartData;
    };

    onBeforeMount(() => {
      state.options = getChartColors(state.options, configStore.dark);
    });

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

    watchEffect(() => {
      state.options.series[0].data = sortChartData(
        state.chartData,
        state.sortData
      );
    });

    const chartDataAdd = () => {
      const newItem = {
        name: `Сладкоежка ${state.options.series[0].data.length + 1}`,
        y: 0,
      };
      state.chartData.push(newItem);
    };

    const chartDataDelete = (index: number) => {
      state.chartData.splice(index, 1);
    };

    const chartDataNameUpdate = (e: Event, index: number) => {
      state.chartData[index].name = (e.target as HTMLInputElement).value.trim();
    };

    const chartTitleChange = (e: Event) => {
      state.options.title.text = (e.target as HTMLInputElement).value.trim();
    };

    //@ts-expect-error
    const chartNameChange = (e) => {
      state.options.series[0].name = e.target.value.trim();
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

    // const chartLabelsToggle = () => {
    //   state.options.labels = !state.options.labels;
    // };

    // const chartLegendToggle = () => {
    //   state.options.legend = !state.options.legend;
    // };

    return {
      state,
      chartDataNameUpdate,
      chartDataAdd,
      chartDataDelete,
      chartTitleChange,
      chartNameChange,
      getColor,
      categoryFocus,
      categoryBlur,
      serieDeleteMouseOver,
      serieDeleteMouseLeave,
      // chartLabelsToggle,
      // chartLegendToggle,
    };
  },
});
</script>

<template>
  <div class="flex flex-col w-full text-slate-700 dark:text-slate-400">
    <div class="flex flex-col lg:flex-row">
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
            v-model="state.options.series[0].name"
          />
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="p-2">
          <BaseToggle
            v-model:checked="state.options.plotOptions.pie.showInLegend"
            >Легенда</BaseToggle
          >
        </div>
        <div class="p-2">
          <BaseToggle
            v-model:checked="state.options.plotOptions.pie.dataLabels.enabled"
            >Ярлыки</BaseToggle
          >
        </div>
        <div class="p-2">
          <BaseToggle v-model:checked="state.sortData">Сортировка</BaseToggle>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col flex-initial items-start p-2 md:p-4 w-full lg:w-6/12"
    >
      <div
        v-for="(item, index) in state.chartData"
        :key="item.name"
        class="flex flex-row flex-initial flex-wrap justify-start items-end w-fit"
      >
        <div class="flex-auto min-w-[18rem] max-w-[24rem] px-0.5 pb-0.5 pt-4">
          <BaseInputMd
            :color="getColor(null, index)"
            :value="state.chartData[index].name"
            @change="(e) => chartDataNameUpdate(e, index)"
            @focus="categoryFocus(null, index)"
            @blur="categoryBlur"
          />
        </div>

        <div class="text-center flex-none p-0.5 w-20">
          <BaseInputMd
            :color="getColor(null, index)"
            v-model.number="state.chartData[index].y"
            @focus="categoryFocus(null, index)"
            @blur="categoryBlur"
          />
        </div>

        <div class="flex flex-row flex-none justify-start items-start">
          <div class="flex-none px-0.5 py-0.5">
            <BaseButtonIconSm
              @mouseover="serieDeleteMouseOver(index)"
              @mouseleave="serieDeleteMouseLeave"
              @click="chartDataDelete(index)"
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
        <BaseButtonIconMd @click="chartDataAdd">
          <Plus class="text-2xl" />
        </BaseButtonIconMd>
      </div>
    </div>

    <div>
      <ChartPieItem :options="state.options" :key="state.someKey" />
    </div>
  </div>
</template>
<style src="@vueform/toggle/themes/default.css"></style>
