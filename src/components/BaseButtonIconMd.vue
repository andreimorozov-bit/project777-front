<script lang="ts">
import { defineComponent, reactive } from 'vue';

export type Colors = 'red' | 'green' | 'blue';

export default defineComponent({
  props: {
    color: {
      type: String as () => Colors,
      default: 'blue',
    },
    type: {
      type: String,
      default: 'outline',
    },
  },
  setup(props) {
    const colors = {
      text: {
        red: `text-slate-400 border border-white bg-white hover:bg-slate-100 hover:text-rose-500 hover:border-slate-100 dark:text-slate-500 dark:bg-slate-900 dark:border-slate-900 dark:hover:text-rose-500 dark:hover:bg-slate-800 dark:hover:border-slate-800`,
        blue: `text-slate-400 border border-white bg-white hover:bg-slate-100 hover:text-sky-500 hover:border-slate-100 dark:text-slate-500 dark:bg-slate-900 dark:border-slate-900 dark:hover:text-sky-500 dark:hover:bg-slate-800 dark:hover:border-slate-800`,
        green: `text-slate-400 border border-white bg-white hover:bg-slate-100 hover:text-emerald-500 hover:border-slate-100 dark:text-slate-500 dark:bg-slate-900 dark:border-slate-900 dark:hover:text-emerald-500 dark:hover:bg-slate-800 dark:hover:border-slate-800`,
      },
      outline: {
        red: `text-slate-400 border border-slate-300 bg-white hover:bg-rose-100 hover:text-rose-500 hover:border-rose-400 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:hover:border-rose-500 dark:hover:bg-slate-800 dark:hover:text-rose-500`,
        blue: `text-slate-400 border border-slate-300 bg-white hover:bg-sky-100 hover:text-sky-500 hover:border-sky-300 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:hover:border-sky-500 dark:hover:bg-slate-800 dark:hover:text-sky-500`,
        green: `text-slate-400 border border-slate-300 bg-white hover:bg-emerald-100 hover:text-emerald-500 hover:border-emerald-300 dark:bg-slate-900 dark:text-slate-500 dark:border-slate-700 dark:hover:border-emerald-500 dark:hover:bg-slate-800 dark:hover:text-emerald-500`,
      },
      filled: {
        red: `text-white border border-rose-500 bg-rose-500 hover:bg-rose-400 hover:border-rose-400 dark:bg-rose-600 dark:border-rose-600 dark:text-slate-900 dark:hover:bg-rose-500 dark:hover:border-rose-500`,
        blue: `text-white border border-sky-500 bg-sky-500 hover:bg-sky-400 hover:border-sky-400  dark:text-slate-900 dark:bg-sky-600 dark:border-sky-600 dark:hover:bg-sky-500 dark:hover:border-sky-500`,
        green: `text-white border border-emerald-500 bg-emerald-500 hover:bg-emerald-400 hover: hover:border-emerald-400 dark:text-slate-900 dark:bg-emerald-600 dark:border-emerald-600 dark:hover:bg-emerald-500 dark:hover:border-emerald-500`,
      },
    };

    const getStyles = (
      color: keyof typeof colors.text,
      type: keyof typeof colors
    ) => {
      return colors[type][color];
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
