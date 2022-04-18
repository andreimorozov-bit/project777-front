<script lang="ts">
import { defineComponent, onBeforeMount, reactive, watch } from 'vue';
import ChartPieItem from './ChartPieItem.vue';
import BaseButtonMd from './BaseButtonMd.vue';
import BaseButtonSquare from './BaseButtonSquare.vue';
import BaseButtonSm from './BaseButtonSm.vue';
import { Close, Plus, Minus } from 'mdue';
import BaseButtonIconSm from './BaseButtonIconSm.vue';
import BaseButtonSelectMd from './BaseButtonSelectMd.vue';
import ChartColumnItem from './ChartColumnItem.vue';
import BaseButtonIconMd from './BaseButtonIconMd.vue';
import BaseButtonIconXs from './BaseButtonIconXs.vue';
import BaseInputMd from './BaseInputMd.vue';
import BaseInputLabelMd from './BaseInputLabelMd.vue';
import { useConfigStore } from '@/stores/config';
import { getChartColors } from '@/common/chartColors';
import BaseInputLabelLg from './BaseInputLabelLg.vue';

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
    BaseButtonSelectMd,
    ChartColumnItem,
    BaseButtonIconMd,
    BaseButtonIconXs,
    BaseInputMd,
    BaseInputLabelMd,
    BaseInputLabelLg,
  },
  setup() {
    const state = reactive({
      options: {
        chart: {
          type: 'column',
          spacingRight: 20,
        },
        title: {
          text: 'Булочек съедено по годам',
        },
        xAxis: {
          categories: ['2019', '2020', '2021'],
        },
        yAxis: {
          title: {
            text: 'Булочки',
          },
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
        },
        plotOptions: {
          series: {
            animation: false,
          },
        },
        series: [
          {
            name: 'Вальдемар',
            data: [50, 55, 70],
          },
          {
            name: 'Джессика',
            data: [20, 30, 19],
          },
          {
            name: 'Леонардо',
            data: [10, 15, 20],
          },
          // {
          //   name: 'Вальдемар',
          //   data: [50],
          // },
          // {
          //   name: 'Джессика',
          //   data: [40],
          // },
          // {
          //   name: 'Леонардо',
          //   data: [50],
          // },
          // {
          //   name: 'Вальдемар',
          //   data: [40],
          // },
          // {
          //   name: 'Джессика',
          //   data: [50],
          // },
          // {
          //   name: 'Леонардо',
          //   data: [40],
          // },
          // {
          //   name: 'Леонардо',
          //   data: [50],
          // },
          // {
          //   name: 'Вальдемар',
          //   data: [40],
          // },
          // {
          //   name: 'Джессика',
          //   data: [50],
          // },
          // {
          //   name: 'Леонардо',
          //   data: [40],
          // },
        ],
      },
      hovered: {
        category: -1,
        serie: -1,
      },
      selected: {
        category: -1,
        serie: -1,
      },
      someKey: 1,
    });

    const configStore = useConfigStore();

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

    const chartSerieAdd = () => {
      const newItem = {
        name: `Сладкоежка ${state.options.series.length + 1}`,
        data: new Array<number>(state.options.xAxis.categories.length).fill(0),
      };
      state.options.series.push(newItem);
    };

    const chartSerieDelete = (index: number) => {
      state.options.series.splice(index, 1);
    };

    const chartDataNameUpdate = (e: Event, index: number) => {
      state.options.series[index].name = (
        e.target as HTMLInputElement
      ).value.trim();
    };

    const chartTitleChange = (e: Event) => {
      state.options.title.text = (e.target as HTMLInputElement).value.trim();
    };

    //@ts-expect-error
    const chartNameChange = (e) => {
      state.options.yAxis.title.text = e.target.value.trim();
    };

    const categoryAdd = () => {
      state.options.xAxis.categories.push('');
      for (let i = 0; i < state.options.series.length; i++) {
        state.options.series[i].data.push(0);
      }
    };

    const categoryDelete = (index: number) => {
      state.options.xAxis.categories.splice(index, 1);
      state.options.series.map((serie, serieIndex) => {
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
      chartSerieAdd,
      chartSerieDelete,
      chartTitleChange,
      chartNameChange,
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
  <div class="flex flex-col w-full text-slate-700">
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
      <div class="flex flex-row p-2 md:p-4"></div>
    </div>
    <div class="flex flex-col px-2 md:px-4">
      <div
        class="flex flex-row flex-initial flex-wrap py-1 justify-start items-end w-auto"
      >
        <div class="px-2 pb-2 self-end font-semibold">Группы</div>
        <div
          v-for="(category, categoryIndex) in state.options.xAxis.categories"
          class="flex flex-col text-center flex-none p-0.5 w-20"
        >
          <div class="flex flex-row justify-end">
            <BaseButtonIconXs
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
          <BaseButtonIconMd color="blue" type="filled" @click="categoryAdd">
            <Plus class="text-2xl" />
          </BaseButtonIconMd>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col flex-initial justify-start items-start p-2 md:p-4 w-auto"
    >
      <div
        v-for="(serie, serieIndex) in state.options.series"
        :key="serie.name"
        class="flex flex-row flex-initial justify-start items-start w-auto"
      >
        <div
          class="flex flex-row flex-initial flex-wrap justify-start items-end w-fit"
        >
          <div class="flex-auto min-w-[18rem] max-w-[24rem] px-0.5 pb-0.5 pt-4">
            <BaseInputMd
              :color="getColor(null, serieIndex)"
              :value="state.options.series[serieIndex].name"
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
              v-model.number="
                state.options.series[serieIndex].data[serieDataIndex]
              "
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
        class="flex flex-row flex-auto py-1 justify-start items-start min-w-[18rem]"
      >
        <BaseButtonIconMd color="blue" type="filled" @click="chartSerieAdd">
          <Plus class="text-2xl" />
        </BaseButtonIconMd>
      </div>
    </div>

    <div>
      <ChartColumnItem :options="state.options" :key="state.someKey" />
    </div>
  </div>
</template>
