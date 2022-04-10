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
  },
  setup(props) {
    const state = reactive({
      color: 'green',
    });

    const getStylesFilled = (color: string) => {
      if (color === 'red') {
        return `text-white bg-pink-600 hover:bg-pink-500 `;
      }
      if (color === 'green') {
        return `text-white bg-emerald-600 hover:bg-emerald-500 `;
      }
      return `text-white bg-sky-600 hover:bg-sky-500 `;
    };

    const getStylesText = (color: string) => {
      if (color === 'red') {
        return `text-pink-600 bg-white hover:bg-pink-100 hover:text-pink-700 `;
      }
      if (color === 'green') {
        return `text-emerald-600 bg-white hover:bg-emerald-100 hover:text-emerald-700 `;
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
      state,
    };
  },
});
</script>

<template>
  <button
    class="text-white font-semibold rounded py-1 px-2"
    :class="getStyles(color, type)"
  >
    <slot></slot>
  </button>
</template>
