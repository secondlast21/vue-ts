<script setup lang="ts">
defineProps<{
  imgSrc: string
  mainContent: string
  sideContent: string
}>()
</script>

<template>
  <div class="w-full bg-white rounded-md mb-4">
    <div class="flex flex-column flex-wrap lg:flex-nowrap lg:flex-row align-center justify-center text-sm">
      <div
        class="bg-no-repeat bg-bottom bg-cover w-full max-w-[248px] rounded-l-md hidden lg:inline"
        :style="{ backgroundImage: `url(${imgSrc})` }"
      />
      <p
        class="px-16 py-8 flex-center flex-grow"
        v-html="mainContent"
      ></p>
      <div class="px-[20px] py-[30px] flex-center cursor-pointer">
        <p>{{ sideContent }}</p>
      </div>
    </div>
  </div>
</template>
