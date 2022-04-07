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
      title: 'Булочек съедено всего',
      data: [
        {
          name: 'Кончита',
          y: 30,
        },
        {
          name: 'Ануфрий',
          y: 20,
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

    return {
      state,
      chartValueIncrement,
      chartValueDecrement,
      chartDataNameUpdate,
      chartDataAdd,
      chartDataDelete,
    };
  },
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col my-4">
      <div
        v-for="(item, index) in state.data"
        :key="item.name"
        class="flex flex-row items-center"
      >
        <div class="w-48">
          <input
            class="w-full border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
            :value="state.data[index].name"
            @change="(e) => chartDataNameUpdate(e, index)"
          />
        </div>
        <button
          @click="chartValueDecrement(index)"
          class="p-1 m-2 w-8 h-8 text-white font-bold bg-emerald-600 hover:bg-emerald-500"
        >
          -
        </button>
        <div class="w-12 text-center">
          <input
            class="w-full border border-slate-300 focus:outline-none focus:border-sky-600 focus:bg-sky-50"
            v-model.number="state.data[index].y"
          />
        </div>
        <button
          @click="chartValueIncrement(index)"
          class="p-1 m-2 w-8 h-8 text-white font-bold bg-emerald-600 hover:bg-emerald-500"
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
      <div class="flex flex-row justify-center">
        <button
          @click="chartDataAdd"
          class="bg-emerald-600 text-white py-2 px-4 hover:bg-emerald-500"
        >
          Добавить сладкоежку
        </button>
      </div>
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
