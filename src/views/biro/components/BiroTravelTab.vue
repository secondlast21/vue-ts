<script setup lang="ts">
defineProps<{
  setActiveTab: (input: string) => void
  totalRows: number
  statusData: string
}>()
</script>

<style scoped>
.tab.tab-active,
.tab[aria-selected='true']:not(.tab-disabled):not([disabled]),
.tab input:checked + .tab {
  border-color: #17754d !important;
  border-bottom-width: 6px;
}
</style>

<template>
  <div
    role="tablist"
    class="tabs tabs-bordered"
  >
    <a
      role="tab"
      class="tab border-primary"
      :class="{ 'tab-active': statusData === '' }"
      @click="setActiveTab('')"
    >
      Semua
    </a>
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active [--tab-border-color:#17754d]': statusData === 'new' }"
      @click="setActiveTab('new')"
    >
      Lengkapi Data
    </a>
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': statusData === 'fill' }"
      @click="setActiveTab('fill')"
    >
      Menunggu Verifikasi
      <div
        class="badge badge-accent ml-2"
        v-if="totalRows > 0"
      >
        {{ totalRows }}
      </div>
    </a>
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': statusData === 'rejected' }"
      @click="setActiveTab('rejected')"
    >
      Perbaiki Data
    </a>
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': statusData === 'approved' }"
      @click="setActiveTab('approved')"
    >
      Buat Rekening
    </a>
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': statusData === 'registered' }"
      @click="setActiveTab('registered')"
    >
      Data Lengkap
    </a>
    <a
      role="tab"
      class="tab"
      :class="{ 'tab-active': statusData === 'block' }"
      @click="setActiveTab('block')"
    >
      Diblok
    </a>
  </div>
</template>
