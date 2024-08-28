<script setup lang="ts">
defineProps<{
  action?: () => void
}>()

import { PlusIcon } from '@/icons'

import Button from '../ui/Button.vue'
</script>

<template>
  <Button class="flex-center gap-2 mb-3 font-semibold" size="small">
    <PlusIcon />
    Tambah
  </Button>
</template>
