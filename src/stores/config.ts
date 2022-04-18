import { defineStore } from 'pinia';

export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    dark: false,
  }),
  getters: {
    getDark: (state) => state.dark,
  },
  actions: {
    toggleDark() {
      this.dark = !this.dark;
    },
  },
});
