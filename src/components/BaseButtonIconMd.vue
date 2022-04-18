<script lang="ts">
import { defineComponent, reactive } from 'vue';

export interface BaseButtonMdPropsInterface {}

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'blue',
    },
    type: {
      type: String,
      default: 'filled',
    },
  },
  setup(props) {
    const getStylesFilled = (color: string) => {
      if (color === 'red') {
        return `text-slate-400 border border-slate-300 bg-slate-100 hover:bg-rose-100 hover:text-rose-500 hover:border-rose-300`;
      }
      if (color === 'green') {
        return `text-slate-400 border border-slate-300 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-500 hover:border-emerald-300`;
      }
      return `text-slate-400 border border-slate-300 bg-white hover:bg-sky-100 hover:text-sky-500 hover:border-sky-300 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:hover:border-sky-500 dark:hover:bg-slate-800 dark:hover:text-sky-500`;
    };

    const getStylesText = (color: string) => {
      if (color === 'red') {
        return `text-pink-600 bg-white hover:bg-pink-100 hover:text-pink-700 `;
      }
      if (color === 'green') {
        return `text-teal-600 bg-white hover:bg-emerald-100 hover:text-emerald-700 `;
      }
      return `text-sky-600 bg-white hover:bg-sky-100 hover:text-sky-700 `;
    };

    const getStyles = (color: string, type: string) => {
      if (type === 'filled') {
        return getStylesFilled(color);
      }
      return getStylesText(color);
    };

    return {
      getStyles,
    };
  },
});
</script>

<template>
  <button
    class="flex flex-row flex-auto items-center justify-center text-center font-semibold rounded w-full h-[34px]"
    :class="getStyles(color, type)"
  >
    <slot></slot>
  </button>
</template>
