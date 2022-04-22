<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

// export enum Colors {
//   red = 'red',
//   blue = 'blue',
//   green = 'green',
//   gray = 'gray',
// }

export type Colors = 'red' | 'green' | 'blue' | 'gray';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: 'label',
    },
    color: {
      type: String as () => Colors,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: 'gray',
    },
  },

  setup(props, context) {
    const state = reactive({
      status: 'normal',
      color: props.color,
    });

    const colors = {
      red: `border-rose-300 bg-rose-50 focus:border-rose-600 dark:bg-stone-900 dark:border-rose-900 dark:focus:border-rose-600`,
      blue: `border-sky-300 bg-sky-50 focus:border-sky-600 focus:bg-sky-100 dark:border-sky-800 dark:bg-slate-800  dark:focus:border-sky-500 `,
      green: `border-emerald-300 bg-emerald-100 focus:border-emerald-600 focus:bg-emerald-100 dark:border-emerald-800 dark:bg-slate-800  dark:focus:border-emerald-500`,
      gray: `border-slate-300 focus:border-sky-600 focus:bg-sky-100 dark:bg-slate-900 dark:border-slate-700 dark:focus:border-sky-900 dark:focus:bg-gray-900`,
    };

    const labelColors = {
      active: {
        red: `font-semibold text-rose-600 dark:text-rose-500`,
        blue: `font-semibold text-sky-600 dark:text-sky-500`,
        green: `font-semibold text-emerald-600 dark:text-emerald-500`,
        gray: `font-semibold text-slate-400  dark:text-slate-600`,
      },
      normal: {
        red: `font-semibold text-rose-500 dark:text-rose-600`,
        blue: `font-semibold text-sky-500 dark:text-sky-600`,
        green: `font-semibold text-emerald-500 dark:text-emerald-600`,
        gray: `font-semibold text-slate-400  dark:text-slate-600`,
      },
    };

    const getClass = (color: Colors) => {
      return colors[color];
    };

    const getLabelClass = computed<string>(() => {
      return labelColors[state.status as keyof typeof labelColors][props.color];
    });
    //@ts-expect-error
    const updateValue = (e) => {
      context.emit('update:modelValue', e.target.value);
    };
    //@ts-expect-error
    const handleFocus = (e) => {
      state.status = 'active';
      context.emit('focus');
    };
    //@ts-expect-error
    const handleBlur = (e) => {
      state.status = 'normal';
      context.emit('blur');
    };

    return {
      getClass,
      updateValue,
      handleFocus,
      handleBlur,
      getLabelClass,
    };
  },
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div
      class="bg-white dark:bg-slate-900 text-sm h-[14px] whitespace-nowrap leading-none overflow-hidden"
      :class="getLabelClass"
    >
      {{ label }}
    </div>
    <div>
      <input
        type="text"
        :value="modelValue"
        @input="updateValue"
        @focus="handleFocus"
        @blur="handleBlur"
        class="w-full text-slate-700 focus:text-slate-900 dark:text-slate-400 dark:focus:text-slate-300 px-1 py-1 rounded border focus:outline-none"
        :class="getClass(color)"
      />
    </div>
  </div>
</template>
