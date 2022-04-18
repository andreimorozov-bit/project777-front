<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';

export interface BaseButtonMdPropsInterface {}

export class Color {
  static blue = 'blue';
  static green = 'green';
  static red = 'red';
}

export default defineComponent({
  props: {
    color: {
      type: String,
      default: Color.blue,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  setup(props) {
    const state = reactive({
      color: 'green',
    });

    const getStylesFilled = (color: string) => {
      if (color === Color.red) {
        return `text-white bg-rose-600 hover:bg-rose-500 `;
      }
      if (color === Color.green) {
        return `text-white bg-emerald-600 hover:bg-emerald-500 `;
      }
      return `text-white bg-sky-600 hover:bg-sky-500 `;
    };

    const getStylesText = (color: string) => {
      if (color === Color.red) {
        return `text-slate-500 bg-white hover:bg-rose-100 hover:text-rose-500 dark:bg-slate-900`;
      }
      if (color === Color.green) {
        return `text-slate-500 bg-white hover:bg-emerald-100 hover:text-emerald-600 `;
      }
      return `text-slate-500 bg-white hover:bg-sky-100 hover:text-sky-600 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-sky-400 dark:hover:bg-slate-800`;
    };

    const getStyles = (color: string, type: string) => {
      if (type === 'filled') {
        return getStylesFilled(color);
      }
      return getStylesText(color);
    };

    return {
      getStyles,
      state,
    };
  },
});
</script>

<template>
  <button
    class="flex flex-row justify-center items-center text-center font-semibold rounded w-[34px] h-[34px]"
    :class="getStyles(color, type)"
  >
    <slot></slot>
  </button>
</template>
