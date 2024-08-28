<script setup lang="ts">
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import moment from 'moment'
import { computed, type Ref, ref, toRaw, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import CardHeader from '@/components/card-header/CardHeader.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { getTravelsService } from '@/services/biro-travel-service'
import type { BiroTravelResponse } from '@/types/biro-travel'
import { type CustomError } from '@/types/common'
import {
  formatDate,
  formatStatusBiro,
  formatStatusBiroStyle,
  formatStatusBtnStyle,
  formatStatusData,
  formatStatusDataStyle,
} from '@/utils/classFormatter'
import { debounce } from '@/utils/utils'

import BiroTravelTab from './components/BiroTravelTab.vue'

const queryClient = useQueryClient()
const router = useRouter()

const skip: Ref<number> = ref(Number(localStorage.getItem('skip')) || 0)
const limit: Ref<number> = ref(Number(localStorage.getItem('limit')) || 5)
const travel_name: Ref<string> = ref('')
const status_data: Ref<string> = ref('')
const biro_data: Ref<string> = ref('')
const time_sort: Ref<string> = ref('desc')
const date_start: Ref<string | undefined> = ref()
const date_end: Ref<string | undefined> = ref()
const currentDate: Ref<string> = ref(moment().format('YYYY-MM-DD'))

const setActiveTab = (tabName: string) => {
  skip.value = 0
  status_data.value = tabName
}

const resetFilter = () => {
  biro_data.value = ''
  time_sort.value = 'desc'
  date_start.value = undefined
  date_end.value = undefined
  queryClient.invalidateQueries({ queryKey: ['getTravelsService'] })
}

const resetDate = () => {
  date_start.value = undefined
  date_end.value = undefined
  queryClient.invalidateQueries({ queryKey: ['getTravelsService'] })
}

const { data, isFetched, isFetching, isLoading, error } = useQuery<BiroTravelResponse, CustomError>({
  queryKey: ['getTravelsService', skip, limit, travel_name, status_data, time_sort, biro_data],
  queryFn: () =>
    getTravelsService({
      offset: skip.value,
      limit: limit.value,
      travel_name: travel_name.value,
      sort: time_sort.value,
      data_status: status_data.value,
      biro_status: biro_data.value,
      start_date: date_start.value,
      finish_date: date_end.value,
    }),
})

const { data: dataFill } = useQuery({
  queryKey: ['getTravelsService', status_data],
  queryFn: () =>
    getTravelsService({
      data_status: 'fill',
    }),
})

const searchTravelName = (event: Event) => {
  const target = event.target as HTMLInputElement
  travel_name.value = target.value
}

const debouncedSearch = debounce(searchTravelName, 1000)

const canSubmit = computed(() => {
  return date_start.value && date_end.value
})

const onSubmitDate = () => {
  queryClient.invalidateQueries()
}

const prevPageClicked = () => {
  const newSkip = skip.value - limit.value
  skip.value -= limit.value
  localStorage.setItem('skip', String(newSkip))
}

const nextPageClicked = () => {
  const newSkip = skip.value + limit.value
  skip.value += limit.value
  localStorage.setItem('skip', String(newSkip))
}

const currentPage = computed(() => skip.value / limit.value + 1)

const isPrevDisabled = computed(() => skip.value <= 0)
const isNextDisabled = computed(() => {
  if (data.value && data.value.data) {
    const totalCount = data.value.data.total_rows
    return skip.value + limit.value >= totalCount
  }
  return false
})

const goToPage = (page: number) => {
  const newSkip = (page - 1) * limit.value
  skip.value = newSkip
  localStorage.setItem('skip', String(newSkip))
}

watch(error, async (newError) => {
  if (toRaw(newError?.status) === 405) {
    router.push('/login')
  }
})
</script>

<style scoped>
.tab.tab-active,
.tab[aria-selected='true']:not(.tab-disabled):not([disabled]),
.tab input:checked + .tab {
  border-color: #17754d !important;
  border-bottom-width: 6px;
}

input[type='date']::-webkit-calendar-picker-indicator {
  background: url(/src/assets/img/calendar-icon.svg) no-repeat;
  margin-left: 48px;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-indent: 1px;
  text-overflow: '';
  background: url('/src/assets/img/select-chart.svg') no-repeat right center !important;
}

select::-ms-expand {
  display: none;
}
</style>

<template>
  <div class="">
    <h1 class="text-[32px] font-bold mb-[32px]">Biro Travel</h1>
    <CardHeader
      img-src="src/assets/img/banner-title.png"
      main-content="Menampilkan list biro travel yang terdaftar di Gold to Mecca. Cek berkala pembaruan data yang diisi oleh biro
          travel pada tab “Menunggu Verifikasi”, kemudian lakukan verifikasi data tersebut"
      side-content="Selengkapnya"
    />
    <!-- Filter data -->
    <div class="w-full text-sm flex justify-start items-center py-2 px-4 gap-4 mb-4 bg-white flex-wrap rounded-md">
      <p>Tgl. Terdaftar</p>
      <div class="dropdown dropdown-start">
        <label
          tabindex="0"
          class="font-normal border-b-2 p-2 border-primary"
        >
          Pilih Periode Tanggal
        </label>
        <ul
          tabindex="0"
          class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
        >
          <li>
            <label for="date_start">Tanggal Mulai</label>
            <input
              id="date_start"
              type="date"
              class="border-2"
              v-model="date_start"
              :max="currentDate"
            />
          </li>
          <li>
            <label for="date_end">Tanggal Selesai</label>
            <input
              id="date_end"
              type="date"
              class="border-2 mb-4"
              v-model="date_end"
              :min="date_start"
              :max="currentDate"
            />
          </li>
          <div class="flex justify-end items-center gap-1">
            <button
              class="btn btn-ghost btn-xs text-danger"
              @click="resetDate"
            >
              Reset
            </button>
            <button
              class="btn btn-ghost btn-xs text-primary"
              :disabled="!canSubmit"
              @click="onSubmitDate"
            >
              Submit
            </button>
          </div>
        </ul>
      </div>
      <p>Urutkan</p>
      <select
        class="custom-select select-sm max-w-40 focus:outline-none"
        v-model="time_sort"
      >
        <option value="desc">Terbaru</option>
        <option value="asc">Terlama</option>
      </select>
      <p>Status</p>
      <select
        class="custom-select select-sm max-w-40 focus:outline-none"
        v-model="biro_data"
      >
        <option value="">Semua</option>
        <option value="new">Verifikasi Akun</option>
        <option value="active">Aktif</option>
        <option value="registered">Full Register</option>
        <option value="block">Diblok</option>
      </select>
      <button
        class="btn btn-ghost text-[#16754d] py-0"
        @click="resetFilter"
      >
        Reset Filter
      </button>
    </div>

    <!-- Filter status data -->
    <div class="w-full flex-center gap-4 mb-4 flex-wrap overflow-x-auto">
      <BiroTravelTab
        :set-active-tab="setActiveTab"
        :status-data="status_data"
        :total-rows="dataFill?.data?.total_rows ?? 0"
      />
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="text"
          class="text-sm"
          placeholder="Cari biro travel.."
          @input="debouncedSearch"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
    </div>

    <div class="px-4 bg-white mb-4 rounded-md">
      <div
        v-if="isFetching || isLoading"
        class="flex-center py-6"
      >
        <span class="loading loading-dots loading-lg text-accent"></span>
      </div>
      <div v-else-if="isFetched">
        <div class="w-full p-2 bg-white rounded-md overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  No
                </th>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  Nama Biro
                </th>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  Tanggal Terdaftar
                </th>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  Telp Biro
                </th>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  Status Biro
                </th>
                <th
                  scope="col"
                  class="text-center th-default"
                >
                  Status Data
                </th>
              </tr>
            </thead>
            <tbody
              v-if="data?.data?.total_rows && data?.data?.total_rows > 0"
              class="bg-white divide-y divide-gray-200"
            >
              <tr
                v-for="(travel, index) in data?.data?.birotravels"
                :key="travel._id"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-greyLight'"
              >
                <td class="td-default">{{ index + skip + 1 }}</td>
                <td class="td-default">{{ travel.travel_name }}</td>
                <td class="td-default">
                  {{ formatDate(travel.created_at) }}
                </td>
                <td class="td-default">{{ travel.user.email }}</td>
                <td class="td-default">{{ travel.telephone }}</td>
                <td class="td-default">
                  <div :class="formatStatusBiroStyle(travel.biro_status)">
                    {{ formatStatusBiro(travel.biro_status) }}
                  </div>
                </td>
                <td class="td-default">
                  <div :class="formatStatusDataStyle(travel.status)">
                    {{ formatStatusData(travel.status) }}
                  </div>
                </td>
                <td class="td-default">
                  <RouterLink
                    :to="`/biro-detail/${travel._id}`"
                    :class="formatStatusBtnStyle(travel.status)"
                  >
                    <span
                      v-if="travel.status === 'fill'"
                      class="flex-center"
                    >
                      <p class="mb-[1px]">Verifikasi Data</p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2297 8.52188L10.0197 5.31188C9.33969 4.64188 8.17969 5.12188 8.17969 6.08188V12.3119V17.9219C8.17969 18.8819 9.33969 19.3619 10.0197 18.6819L15.1997 13.5019C16.0297 12.6819 16.0297 11.3219 15.1997 10.4919L13.2297 8.52188Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                    </span>
                    <span v-else> Lihat Data </span>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
            <tbody
              v-else
              class="bg-white divide-y divide-gray-200"
            >
              <tr>
                <td
                  colspan="7"
                  class="px-6 py-4 whitespace-nowrap text-sm text-center"
                >
                  Data tidak dapat ditemukan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end pb-4">
          <Pagination
            :current-page="currentPage"
            :total-pages="Math.ceil((data?.data?.total_rows ?? 0) / limit)"
            :prev-page-clicked="prevPageClicked"
            :next-page-clicked="nextPageClicked"
            :is-prev-disabled="isPrevDisabled"
            :is-next-disabled="isNextDisabled"
            :go-to-page="goToPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
