<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'gray',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },

  setup(props, context) {
    const getClass = (color: string) => {
      if (color === 'red') {
        return `border-rose-300 bg-rose-50 focus:border-rose-600 dark:bg-stone-900 dark:text-slate-400 dark:focus:text-slate-300 dark:border-rose-900 dark:focus:border-rose-600`;
      }
      if (color === 'blue') {
        return `border-sky-300 bg-sky-50 focus:border-sky-600 focus:bg-sky-100 dark:text-slate-400 dark:bg-slate-800 dark:border-sky-800 dark:focus:border-sky-500 dark:focus:text-slate-300`;
      }
      if (color === 'green') {
        return `border-emerald-300 bg-emerald-100 focus:border-emerald-600 focus:bg-emerald-200`;
      }
      return `border-slate-300 focus:border-sky-600 focus:bg-sky-100 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:focus:border-sky-500 dark:focus:text-slate-300 dark:focus:bg-slate-800`;
    };
    //@ts-expect-error
    const updateValue = (e) => {
      context.emit('update:modelValue', e.target.value);
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
