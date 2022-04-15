<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen">
    <header>
      <nav class="flex flex-row">
        <div class="p-2">
          <RouterLink
            to="/"
            class="text-xl font-semibold text-slate-500 hover:text-sky-600"
            >Pie</RouterLink
          >
        </div>
        <div class="p-2">
          <RouterLink
            to="/chart-column"
            class="text-xl font-semibold text-slate-500 hover:text-sky-600"
            >Column</RouterLink
          >
        </div>
        <div class="p-2">
          <RouterLink
            to="/chart-line"
            class="text-xl font-semibold text-slate-500 hover:text-sky-600"
            >Line</RouterLink
          >
        </div>
        <div class="p-2">
          <RouterLink
            to="/chart-polar-line"
            class="text-xl font-semibold text-slate-500 hover:text-sky-600"
            >Polar Line</RouterLink
          >
        </div>
      </nav>
    </header>
    <div class="flex flex-col w-full xl:w-10/12 mx-auto">
      <RouterView />
    </div>
  </div>
</template>
