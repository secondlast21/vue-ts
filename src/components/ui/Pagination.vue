<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  isPrevDisabled: boolean
  isNextDisabled: boolean
  prevPageClicked: () => void
  nextPageClicked: () => void
  goToPage: (page: number) => void
}>()

const pages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const delta = 2
  const range = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (total > 1) {
    range.push(total)
  }

  return range
})
</script>

<template>
  <div class="join">
    <button
      class="join-item btn btn-sm"
      @click="props.prevPageClicked"
      :disabled="props.isPrevDisabled"
    >
      «
    </button>
    <button
      v-for="page in pages"
      :key="page"
      class="join-item btn btn-sm"
      :class="{ 'btn-accent text-white': page === props.currentPage }"
      @click="() => props.goToPage(Number(page))"
      :disabled="page === '...'"
    >
      {{ page }}
    </button>
    <button
      class="join-item btn btn-sm"
      @click="props.nextPageClicked"
      :disabled="props.isNextDisabled"
    >
      »
    </button>
  </div>
</template>
