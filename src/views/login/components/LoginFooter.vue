<script setup lang="ts">
import beiLogo from '@/assets/img/logo-bei.png'
import kinesisLogo from '@/assets/img/logo-kmi.png'
</script>

<template>
  <footer
    class="lg:max-w-[800px] w-full flex flex-wrap justify-center xl:justify-between items-center px-6 mt-4 py-4 bg-transparent bottom-0 border-t-[0.5px] border-black"
  >
    <div class="flex flex-wrap justify-center items-center gap-4">
      <p class="font-bold">Powered by</p>
      <img
        :src="kinesisLogo"
        alt="Kinesis Logo"
        class="h-8"
      />
      <img
        :src="beiLogo"
        alt="BEI Logo"
        class="h-8"
      />
    </div>
    <p class="p-4">Bantuan</p>
  </footer>
</template>
