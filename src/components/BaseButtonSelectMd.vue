<script lang="ts">
import { defineComponent, reactive } from 'vue';

export interface BaseButtonMdPropsInterface {}

export enum Color {
  blue = 'blue',
  green = 'green',
  red = 'red',
}

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'blue',
    },
    type: {
      type: String,
      default: 'text',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      color: 'green',
      type: props.type,
      active: props.active,
    });

    const getStylesFilled = (color: string, active: boolean) => {
      if (active) {
        if (color === 'red') {
          return `text-white bg-pink-600 hover:bg-pink-500 `;
        }
        if (color === 'green') {
          return `text-white bg-emerald-600 hover:bg-emerald-500 `;
        }
        return `text-white bg-sky-600 hover:bg-sky-500 `;
      }
      return `text-white bg-gray-400 hover:bg-sky-500`;
    };

    const getStylesText = (color: string, active: boolean) => {
      if (active) {
        if (color === 'red') {
          return `text-pink-600 bg-white hover:bg-pink-100 hover:text-pink-700 `;
        }
        if (color === 'green') {
          return `text-emerald-600 bg-white hover:bg-emerald-100 hover:text-emerald-700 `;
        }
        return `text-sky-600 bg-white hover:bg-sky-100 hover:text-sky-700 `;
      }
      return `text-slate-400 hover:text-sky-600`;
    };

    const getStyles = (color: string, type: string, active: boolean) => {
      if (type === 'filled') {
        return getStylesFilled(color, active);
      }
      return getStylesText(color, active);
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
    class="text-white rounded-full py-0.5 px-2"
    :class="getStyles(color, type, active)"
  >
    <slot></slot>
  </button>
</template>
