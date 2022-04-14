<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ChartPieItem from './ChartPieItem.vue';
import type { SeriesData } from './ChartPieItem.vue';
import BaseButtonMd from './BaseButtonMd.vue';
import BaseButtonSquare from './BaseButtonSquare.vue';
import BaseButtonSm from './BaseButtonSm.vue';
import { Close, Plus, Minus } from 'mdue';
import BaseButtonIconSm from './BaseButtonIconSm.vue';
import BaseButtonSelectMd from './BaseButtonSelectMd.vue';

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
  },
  setup() {
    const state = reactive({
      title: {
        text: 'Булочек съедено всего',
      },
      data: [
        {
          name: 'Вальдемар',
          y: 30,
        },
        {
          name: 'Джессика',
          y: 20,
        },
        {
          name: 'Леонардо',
          y: 26,
        },
      ] as SeriesData[],
      name: 'Булочки',
      options: {
        legend: false,
        labels: true,
      },
    });

    const chartDataAdd = () => {
      const newItem = {
        name: `Сладкоежка ${state.data.length + 1}`,
        y: 0,
      };
      state.data.push(newItem);
    };

    const chartDataDelete = (index: number) => {
      state.data.splice(index, 1);
    };

    const chartValueIncrement = (index: number) => {
      state.data[index].y++;
    };

    const chartValueDecrement = (index: number) => {
      if (state.data[index].y > 0) {
        state.data[index].y--;
      }
    };

    const chartDataNameUpdate = (e: Event, index: number) => {
      state.data[index].name = (e.target as HTMLInputElement).value.trim();
    };

    const chartTitleChange = (e: Event) => {
      state.title.text = (e.target as HTMLInputElement).value.trim();
    };

    //@ts-expect-error
    const chartNameChange = (e) => {
      state.name = e.target.value.trim();
    };

    const chartLabelsToggle = () => {
      state.options.labels = !state.options.labels;
    };

    const chartLegendToggle = () => {
      state.options.legend = !state.options.legend;
    };

    return {
      state,
      chartValueIncrement,
      chartValueDecrement,
      chartDataNameUpdate,
      chartDataAdd,
      chartDataDelete,
      chartTitleChange,
      chartNameChange,
      chartLabelsToggle,
      chartLegendToggle,
    };
  },
});
</script>

<template>
  <div class="flex flex-col w-full text-slate-700">
    <div class="flex flex-col lg:flex-row flex-auto w-full">
      <div class="flex flex-col flex-auto p-2 md:p-4 w-full lg:w-6/12">
        <div class="flex flex-col items-start my-2 w-full">
          <label for="chart-title" class="block text-left font-semibold"
            >Заголовок</label
          >
          <input
            id="chart-title"
            :value="state.title.text"
            @change="(e) => chartTitleChange(e)"
            class="w-full px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
          />
        </div>
        <div class="flex flex-col items-start w-full">
          <label for="series-name" class="block text-left font-semibold"
            >Название</label
          >
          <input
            id="series-name"
            :value="state.name"
            @change="(e) => chartNameChange(e)"
            class="w-full px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
          />
        </div>
        <div class="flex flex-row py-2">
          <div class="mr-2">
            <BaseButtonSelectMd
              type="filled"
              :active="state.options.legend"
              @click="chartLegendToggle"
              >Легенда</BaseButtonSelectMd
            >
          </div>
          <div class="mr-2">
            <BaseButtonSelectMd
              type="filled"
              :active="state.options.labels"
              @click="chartLabelsToggle"
              >Ярлыки</BaseButtonSelectMd
            >
          </div>
        </div>
      </div>
      <div
        class="flex flex-col flex-initial items-start p-2 md:p-4 w-full lg:w-6/12"
      >
        <div
          v-for="(item, index) in state.data"
          :key="item.name"
          class="flex flex-row flex-none py-1 items-center w-full"
        >
          <div class="flex-initial w-80 px-0.5">
            <input
              class="w-full px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
              :value="state.data[index].name"
              @change="(e) => chartDataNameUpdate(e, index)"
            />
          </div>

          <div class="text-center flex-none px-0.5 w-20">
            <input
              class="w-full px-1 py-1 rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
              v-model.number="state.data[index].y"
            />
          </div>
          <div class="flex flex-row flex-none px-0.5">
            <div class="flex-none mr-1">
              <BaseButtonIconSm
                @click="chartValueDecrement(index)"
                type="filled"
                color="green"
              >
                <Minus class="text-xl" />
              </BaseButtonIconSm>
            </div>
            <div class="flex-none">
              <BaseButtonIconSm
                @click="chartValueIncrement(index)"
                type="filled"
                color="green"
              >
                <Plus class="text-xl" />
              </BaseButtonIconSm>
            </div>
          </div>
          <div class="flex-none px-0.5">
            <BaseButtonSm @click="chartDataDelete(index)" color="red">
              Удалить
            </BaseButtonSm>
          </div>
        </div>
        <div class="flex flex-row p-1">
          <BaseButtonMd color="blue" type="filled" @click="chartDataAdd">
            Добавить сладкоежку
          </BaseButtonMd>
        </div>
      </div>
    </div>

    <div>
      <ChartPieItem
        :title="state.title"
        :name="state.name"
        :data="state.data"
        :options="state.options"
      />
    </div>
  </div>
</template>
