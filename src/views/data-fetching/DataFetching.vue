<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

import { getPokemon } from '@/services/get-all-pokemon-service'

const offset = ref(0)
const limit = ref(10)

const { data, isFetched, isFetching } = useQuery({
  queryKey: ['getPokemon', offset, limit],
  queryFn: () =>
    getPokemon({
      offset: offset.value,
      limit: limit.value,
    }),
})
</script>

<template>
  <h1 class="text-center mb-4">Fetching data with axios and tanstack query</h1>
  <div v-if="isFetching">
    <h1 class="text-center">Loading ...</h1>
  </div>
  <div
    v-else-if="isFetched"
    class="flex-center"
  >
    <table class="w-full max-w-screen-lg divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            class="text-left th-default"
          >
            No
          </th>
          <th
            scope="col"
            class="text-left th-default"
          >
            Pokemon
          </th>
        </tr>
      </thead>
      <tbody
        v-if="data && data?.count > 0"
        class="bg-white divide-y divide-gray-200"
      >
        <tr
          v-for="(pokemon, index) in data?.results"
          :key="index"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-greyLight'"
        >
          <td class="td-default">
            {{ index + 1 }}
          </td>
          <td class="td-default">
            {{ pokemon.name }}
          </td>
        </tr>
      </tbody>
      <tbody
        v-else
        class="bg-white divide-y divide-gray-200"
      >
        <tr>
          <td
            colspan="3"
            class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
          >
            Data tidak dapat ditemukan
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
