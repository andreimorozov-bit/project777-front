<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { WhiteBalanceSunny, MoonWaningCrescent } from 'mdue';
import BaseButtonIconMd from './components/BaseButtonIconMd.vue';
import BaseButtonIconSm from './components/BaseButtonIconSm.vue';
import { useConfigStore } from './stores/config';

export default defineComponent({
  components: {
    WhiteBalanceSunny,
    MoonWaningCrescent,
    BaseButtonIconMd,
    BaseButtonIconSm,
  },
  setup() {
    const state = reactive({
      dark: false,
    });

    const configStore = useConfigStore();

    const toggleDarkMode = () => {
      configStore.toggleDark();
    };

    const darkMode = computed(() => {
      return configStore.dark ? 'dark' : '';
    });

    return {
      state,
      toggleDarkMode,
      darkMode,
      configStore,
    };
  },
});
</script>

<template>
  <div :class="darkMode">
    <div class="bg-white dark:bg-slate-900">
      <div class="min-h-screen flex flex-col w-full 2xl:w-11/12 mx-auto">
        <header class="flex flex-row justify-between">
          <nav class="flex flex-row">
            <div class="p-2">
              <RouterLink
                to="/"
                class="text-xl font-semibold text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"
                >Pie</RouterLink
              >
            </div>
            <div class="p-2">
              <RouterLink
                to="/chart-column"
                class="text-xl font-semibold text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"
                >Column</RouterLink
              >
            </div>
            <div class="p-2">
              <RouterLink
                to="/chart-line"
                class="text-xl font-semibold text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"
                >Line</RouterLink
              >
            </div>
            <div class="p-2">
              <RouterLink
                to="/chart-polar-line"
                class="text-xl font-semibold text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"
                >Polar Line</RouterLink
              >
            </div>
          </nav>
          <div class="flex-none p-2">
            <BaseButtonIconSm @click="toggleDarkMode" type="text">
              <WhiteBalanceSunny v-if="!configStore.dark" />
              <MoonWaningCrescent v-if="configStore.dark" />
            </BaseButtonIconSm>
          </div>
        </header>
        <div class="flex flex-col w-full">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
