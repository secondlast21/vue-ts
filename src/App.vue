<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { RouterView } from 'vue-router'
</script>

<template>
  <VueQueryDevtools />
  <RouterView />
  <!-- <div class="p-0 my-0 mx-auto max-w-screen lg:max-w-[1200px] x:shadow-xl">
    <RouterView />
  </div> -->
</template>
