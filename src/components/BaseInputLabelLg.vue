<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: 'label',
    },
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
    const state = reactive({
      focus: false,
      color: props.color,
    });

    const getClass = (color: string) => {
      if (color === 'red') {
        return `border-rose-300 bg-rose-50 focus:border-rose-600 dark:bg-stone-900 dark:border-rose-900 dark:focus:border-rose-600`;
      }
      if (color === 'blue') {
        return `border-sky-300 bg-sky-50 focus:border-sky-600 focus:bg-sky-100 dark:border-sky-800 dark:bg-slate-800  dark:focus:border-sky-500 `;
      }
      if (color === 'green') {
        return `border-emerald-300 bg-emerald-100 focus:border-emerald-600 focus:bg-emerald-200  `;
      }
      return `border-slate-300 focus:border-sky-600 focus:bg-sky-100 dark:bg-slate-900 dark:border-slate-700 dark:focus:border-sky-500 dark:focus:bg-slate-800`;
    };

    const getLabelClass = computed<string>(() => {
      if (state.focus) {
        if (props.color === 'red') {
          return `font-semibold text-rose-600 dark:text-rose-500`;
        }
        if (props.color === 'green') {
          return `font-semibold text-emerald-600`;
        }
        return `font-semibold text-sky-600 dark:text-sky-400`;
      }
      if (props.color === 'red') {
        return `font-semibold text-rose-500 dark:text-rose-600`;
      }
      if (props.color === 'green') {
        return `font-semibold text-emerald-500`;
      }
      if (props.color === 'blue') {
        return `font-semibold text-sky-500 dark:text-sky-600`;
      }

      return `font-semibold text-slate-700 dark:text-slate-400`;
    });
    //@ts-expect-error
    const updateValue = (e) => {
      context.emit('update:modelValue', e.target.value);
    };
    //@ts-expect-error
    const handleFocus = (e) => {
      state.focus = true;
      context.emit('focus');
    };
    //@ts-expect-error
    const handleBlur = (e) => {
      state.focus = false;
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
      class="bg-white dark:bg-slate-900 text-base whitespace-nowrap overflow-hidden"
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
