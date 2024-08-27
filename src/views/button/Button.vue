<script setup lang="ts">
import Button from '@/components/Button.vue'
</script>

<template>
  <div class="m-4">
    <h1 class="text-center mb-4">Component with tailwind and class variance authority</h1>
    <div class="flex-center flex-wrap gap-4">
      <Button>Primary - Medium</Button>
      <Button
        variant="secondary"
        size="small"
        >Secondary - Small</Button
      >
      <Button
        variant="tertiery"
        size="large"
        >Tertiery - Large</Button
      >
      <Button
        variant="success"
        size="large"
        >Success - Large</Button
      >
      <Button variant="warning"> Warning - Medium </Button>
      <Button variant="danger">Danger - Medium</Button>
    </div>
  </div>
</template>
