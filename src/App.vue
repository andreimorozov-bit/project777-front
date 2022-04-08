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
            class="text-xl font-semibold text-slate-700 hover:text-slate-500"
            >Pie</RouterLink
          >
        </div>
        <div class="p-2">
          <RouterLink
            to="/chartcolumn"
            class="text-xl font-semibold text-slate-700 hover:text-slate-500"
            >Column</RouterLink
          >
        </div>
      </nav>
    </header>
    <div class="flex flex-col w-10/12 mx-auto">
      <RouterView />
    </div>
  </div>
</template>
