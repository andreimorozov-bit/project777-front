<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ChartPieItem from './ChartPieItem.vue';
import type { SeriesData } from './ChartPieItem.vue';

export default defineComponent({
  components: {
    ChartPieItem,
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
    //@ts-expect-error
    const chartDataNameUpdate = (e, index: number) => {
      state.data[index].name = e.target.value.trim();
    };

    //@ts-expect-error
    const chartTitleChange = (e) => {
      state.title.text = e.target.value.trim();
    };

    //@ts-expect-error
    const chartNameChange = (e) => {
      state.name = e.target.value.trim();
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
    };
  },
});
</script>

<template>
  <div class="flex flex-col text-slate-700">
    <div class="flex flex-row">
      <div class="flex flex-col my-4 w-96">
        <div class="flex flex-col items-start p-2">
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
        <div class="flex flex-col items-start p-2">
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
      </div>
      <div class="flex flex-col my-4 mx-4">
        <div
          v-for="(item, index) in state.data"
          :key="item.name"
          class="flex flex-row items-center"
        >
          <div class="w-48">
            <input
              class="w-full px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
              :value="state.data[index].name"
              @change="(e) => chartDataNameUpdate(e, index)"
            />
          </div>
          <button
            @click="chartValueDecrement(index)"
            class="p-1 m-2 w-8 h-8 rounded text-white font-bold bg-emerald-600 hover:bg-emerald-500"
          >
            -
          </button>
          <div class="w-20 text-center">
            <input
              class="w-full px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
              v-model.number="state.data[index].y"
            />
          </div>
          <button
            @click="chartValueIncrement(index)"
            class="p-1 m-2 w-8 h-8 rounded text-white font-bold bg-emerald-600 hover:bg-emerald-500"
          >
            +
          </button>
          <button
            @click="chartDataDelete(index)"
            class="py-1 px-2 text-red-600 font-semibold hover:text-red-700 hover:bg-red-100"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <button
        @click="chartDataAdd"
        class="bg-emerald-600 text-white rounded py-1 px-4 hover:bg-emerald-500"
      >
        Добавить сладкоежку
      </button>
    </div>
    <div>
      <ChartPieItem
        :title="state.title"
        :name="state.name"
        :data="state.data"
      />
    </div>
  </div>
</template>
