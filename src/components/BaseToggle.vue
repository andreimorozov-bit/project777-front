<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const state = reactive({
      active: props.checked,
    });

    const handleClick = () => {
      state.active = !state.active;
      context.emit('update:checked', state.active);
    };

    const getContainerClass = computed(() => {
      if (state.active) {
        return `bg-sky-500 dark:bg-sky-500`;
      }
      return `bg-slate-400 dark:bg-slate-600`;
    });

    const getSwitchClass = computed(() => {
      if (state.active) {
        return `translate-x-[16px] dark:bg-slate-100`;
      }
      return ``;
    });

    const getLabelClass = computed(() => {
      if (state.active) {
        return `text-sky-600 dark:text-sky-500`;
      }
      return `text-slate-500`;
    });

    return {
      state,
      handleClick,
      getContainerClass,
      getSwitchClass,
      getLabelClass,
    };
  },
});
</script>

<template>
  <div class="flex flex-row items-center">
    <div class="flex flex-row pr-2" :class="getLabelClass">
      <slot></slot>
    </div>
    <div
      class="flex flex-row h-[16px] w-[32px] p-[1px] cursor-pointer rounded-full transition-all duration-150"
      :class="getContainerClass"
      @click="handleClick"
    >
      <div
        class="rounded-full h-[14px] w-[14px] bg-white dark:bg-slate-300 transition-all duration-150"
        :class="getSwitchClass"
      ></div>
    </div>
  </div>
</template>
