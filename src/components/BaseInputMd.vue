<script lang="ts">
import { defineComponent, reactive } from 'vue';

// export enum Colors {
//   red = 'red',
//   blue = 'blue',
//   green = 'green',
//   gray = 'gray',
// }

export type Colors = 'red' | 'green' | 'blue' | 'gray';

export default defineComponent({
  props: {
    color: {
      type: String as () => Colors,
      default: 'gray',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },

  setup(props, context) {
    const colors = {
      red: `border-rose-300 bg-rose-50 focus:border-rose-600 dark:bg-stone-900 dark:text-slate-400 dark:focus:text-slate-300 dark:border-rose-900 dark:focus:border-rose-600`,
      green: `border-emerald-300 bg-emerald-100 focus:border-emerald-600 focus:bg-emerald-200`,
      blue: `border-sky-300 bg-sky-50 focus:border-sky-600 focus:bg-sky-100 dark:text-slate-400 dark:bg-transparent dark:border-sky-700 dark:focus:bg-slate-900 dark:focus:border-sky-500 dark:focus:text-slate-400`,
      gray: `border-slate-300 focus:border-sky-600 focus:bg-sky-100 dark:text-slate-400 dark:bg-transparent dark:border-slate-700 dark:focus:border-sky-500 dark:focus:bg-slate-900`,
    };

    const getClass = (color: keyof typeof colors) => {
      return colors[color];
    };

    const updateValue = (e: Event) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value);
    };

    return {
      getClass,
      updateValue,
    };
  },
});
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateValue"
    class="w-full px-1 py-1 rounded border focus:outline-none"
    :class="getClass(color)"
  />
</template>
