<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/yup'
import { Form, useForm } from 'vee-validate'
import { computed, type Ref, ref, toRaw, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import * as Yup from 'yup'

import AddDataBtn from '@/components/master-data/AddDataBtn.vue'
import Pagination from '@/components/ui/Pagination.vue'
import {
  addAirportsService,
  deleteAirportsService,
  editAirportsService,
  getAirportsService,
} from '@/services/airports-service'
import { getCitiesService } from '@/services/city-service'
import { type AirportMutateRequest, type AirportResponse } from '@/types/airports'
import { type CustomError } from '@/types/common'

const queryClient = useQueryClient()
const router = useRouter()
const toast = useToast()

const skip: Ref<number> = ref(Number(localStorage.getItem('skip')) || 0)
const limit: Ref<number> = ref(Number(localStorage.getItem('limit')) || 5)

const selectedAirportId: Ref<string> = ref('')
const selectedAirportName: Ref<string> = ref('')
const selectedAirportCity: Ref<string> = ref('')
const selectedAirportCityId: Ref<string> = ref('')
const selectedAirportIata: Ref<string> = ref('')

const schema = Yup.object({
  name: Yup.string().required('Nama bandara wajib diisi'),
  city: Yup.string().required('Kota wajib diisi'),
  iata_code: Yup.string().min(3, 'Kode Iata minimal 3 karakter').required('Kode Iata wajib diisi'),
})

const { handleSubmit, defineField, errors } = useForm<AirportMutateRequest>({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    name: '',
    city: '',
    iata_code: '',
  },
})

const [name] = defineField('name')
const [city] = defineField('city')
const [iata_code] = defineField('iata_code')

const { data, isFetched, isFetching, isLoading, error } = useQuery<AirportResponse, CustomError>({
  queryKey: ['getAirportsService', skip, limit],
  queryFn: () =>
    getAirportsService({
      skip: skip.value,
      limit: limit.value,
    }),
})

const {
  data: dataCities,
  isFetched: isFetchedCities,
  isFetching: isFetchingCities,
  isLoading: isLoadingCities,
  isError: isErrorCities,
} = useQuery({
  queryKey: ['getCitiesService'],
  queryFn: () => getCitiesService(),
})

const { mutate: mutateAddAirport, isPending: isPendingAddAirport } = useMutation({
  mutationFn: addAirportsService,
  onSuccess: () => {
    const addModal = document.getElementById('add_airport_modal') as HTMLDialogElement
    if (addModal) addModal.close()
    queryClient.invalidateQueries({ queryKey: ['getAirportsService'] })
    toast.success('Data Airports berhasil ditambah', {
      timeout: 2000,
    })
  },
  onError: () => {
    toast.error('Data Airports gagal ditambah', {
      timeout: 2000,
    })
  },
})

const { mutate: mutateEditAirport, isPending: isPendingEditAirport } = useMutation({
  mutationFn: (values: AirportMutateRequest) => editAirportsService(selectedAirportId.value, values),
  onSuccess: () => {
    const editModal = document.getElementById('edit_airport_modal') as HTMLDialogElement
    if (editModal) editModal.close()
    queryClient.invalidateQueries({ queryKey: ['getAirportsService'] })
    toast.success('Data Airports berhasil dirubah', {
      timeout: 2000,
    })
  },
  onError: () => {
    toast.error('Data Airports gagal dirubah', {
      timeout: 2000,
    })
  },
})

const { mutate: mutateDeleteAirport, isPending: isPendingDeleteAirport } = useMutation({
  mutationFn: deleteAirportsService,
  onSuccess: () => {
    const deleteModal = document.getElementById('delete_airport_modal') as HTMLDialogElement
    if (deleteModal) deleteModal.close()
    queryClient.invalidateQueries({ queryKey: ['getAirportsService'] })
    toast.success('Data Airports berhasil dihapus', {
      timeout: 2000,
    })
  },
  onError: () => {
    toast.error('Data Airports gagal dihapus', {
      timeout: 2000,
    })
  },
})

const showAddModal = () => {
  const addAirportModal = document.getElementById('add_airport_modal') as HTMLDialogElement
  if (addAirportModal) addAirportModal.showModal()
}

const showDeleteModal = (id: string) => {
  selectedAirportId.value = id
  const deleteAirportModal = document.getElementById('delete_airport_modal') as HTMLDialogElement
  if (deleteAirportModal) deleteAirportModal.showModal()
}

const showEditModal = (id: string, name: string, city: string, cityId: string, iata: string) => {
  selectedAirportId.value = id
  selectedAirportName.value = name
  selectedAirportCity.value = city
  selectedAirportCityId.value = cityId
  selectedAirportIata.value = iata
  const editAirportModal = document.getElementById('edit_airport_modal') as HTMLDialogElement
  if (editAirportModal) editAirportModal.showModal()
}

const onSubmitAddAirport = handleSubmit((values: AirportMutateRequest) => {
  mutateAddAirport({
    name: values.name,
    city: values.city,
    iata_code: values.iata_code,
  })
})

const onSubmitEditAirport = handleSubmit((values: AirportMutateRequest) => {
  if (selectedAirportId.value && selectedAirportName.value && selectedAirportCity.value && selectedAirportIata.value) {
    mutateEditAirport({
      name: values.name,
      city: values.city,
      iata_code: values.iata_code,
    })
  }
})

const onClickedDelete = () => {
  if (selectedAirportId.value) {
    mutateDeleteAirport(selectedAirportId.value)
  }
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
    const totalCount = data.value.data.count
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
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-indent: 1px;
  text-overflow: '';
  background: url('/src/assets/img/select-chart.svg') no-repeat right center;
}
</style>

<template>
  <div class="lg:p-2">
    <h1 class="text-[32px] font-bold mb-[32px]">Airports</h1>
    <AddDataBtn @click="showAddModal" />
    <div class="p-4 bg-white mb-4 rounded-md">
      <div
        v-if="isFetching || isLoading"
        class="flex-center h-full"
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
                  class="text-left th-default"
                >
                  No
                </th>
                <th
                  scope="col"
                  class="text-left th-default"
                >
                  Nama Airports
                </th>
                <th
                  scope="col"
                  class="text-left th-default"
                >
                  Iata
                </th>
              </tr>
            </thead>
            <tbody
              v-if="data?.data?.count && data?.data?.count > 0"
              class="bg-white divide-y divide-gray-200"
            >
              <tr
                v-for="(airport, index) in data?.data?.data"
                :key="airport._id"
                :class="index % 2 === 0 ? 'bg-white' : 'bg-greyLight'"
              >
                <td class="td-default">{{ index + skip + 1 }}</td>
                <td class="td-default">{{ airport.name }}</td>
                <td class="td-default">{{ airport.iata_code }}</td>
                <td class="td-default font-medium">
                  <button
                    @click="
                      showEditModal(airport._id, airport.name, airport.city.name, airport.city._id, airport.iata_code)
                    "
                    class="mx-1 btn btn-warning btn-outline hover:!text-white btn-sm"
                  >
                    Ubah
                  </button>
                  <button
                    @click="showDeleteModal(airport._id)"
                    class="mx-1 btn btn-error btn-outline hover:!text-white btn-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody
              v-else
              class="bg-white divide-y divide-gray-200"
            >
              <tr>
                <td
                  colspan="5"
                  class="px-6 py-4 whitespace-nowrap text-center"
                >
                  Data tidak dapat ditemukan
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end">
          <Pagination
            :current-page="currentPage"
            :total-pages="Math.ceil((data?.data?.count ?? 0) / limit)"
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

  <!-- Modals -->
  <!-- Add airport modal -->
  <dialog
    id="add_airport_modal"
    class="modal flex items-start justify-center pt-10"
  >
    <div class="modal-box px-4 py-5 max-w-[400px]">
      <h3 class="text-lg font-bold mb-3">Tambah Airports</h3>
      <Form @submit="onSubmitAddAirport">
        <div class="mb-2">
          <label
            for="name"
            class="block mb-2"
            >Nama Airports</label
          >
          <input
            type="name"
            id="name"
            v-model="name"
            placeholder="Masukkan nama airports"
            class="input-default mb-1"
          />
          <span class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>
        <div class="mb-2">
          <label
            for="city"
            class="block mb-2"
            >Kota</label
          >
          <select
            id="city"
            v-model="city"
            class="input-default mb-1"
          >
            <option
              value=""
              disabled
              selected
            >
              Pilih kota
            </option>
            <option v-if="isLoadingCities || isFetchingCities">Sedang mengambil data kota</option>
            <option v-else-if="isErrorCities">Data tidak ada</option>
            <option v-else-if="isFetchedCities && dataCities?.data?.count === 0">Data tidak ada</option>
            <option
              v-for="city in dataCities?.data?.data"
              :key="city._id"
              :value="city._id"
            >
              {{ city.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm">{{ errors.city }}</span>
        </div>
        <div class="mb-4">
          <label
            for="iata_code"
            class="block mb-2"
            >Kode Iata</label
          >
          <input
            type="iata_code"
            id="iata_code"
            v-model="iata_code"
            placeholder="Masukkan kode Iata"
            class="input-default mb-1"
          />
          <span class="text-red-500 text-sm">{{ errors.iata_code }}</span>
        </div>
        <div class="text-right">
          <button
            type="button"
            onclick="add_airport_modal.close()"
            class="btn btn-sm btn-ghost rounded-full px-4 text-primary hover:bg-white"
          >
            Batal
          </button>
          <button
            :disabled="isPendingAddAirport"
            type="submit"
            class="bg-primary btn btn-sm rounded-full px-4 text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryHover"
          >
            <span
              v-if="isPendingAddAirport"
              class="loading loading-dots loading-sm"
            />
            <span v-else>Tambah</span>
          </button>
        </div>
      </Form>
    </div>
  </dialog>

  <!-- Edit airport modal -->
  <dialog
    id="edit_airport_modal"
    class="modal flex items-start justify-center pt-10"
  >
    <div class="modal-box px-4 py-5 max-w-[400px]">
      <h3 class="text-lg font-bold mb-3">Ubah Airports</h3>
      <Form @submit="onSubmitEditAirport">
        <div class="mb-2">
          <label
            for="name"
            class="block mb-2"
            >Nama Airports</label
          >
          <input
            type="name"
            id="name"
            v-model="name"
            placeholder="Masukkan nama airports"
            class="input-default mb-1"
          />
          <span class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>
        <div class="mb-2">
          <label
            for="city"
            class="block mb-2"
            >Kota</label
          >
          <select
            id="city"
            v-model="city"
            class="input-default mb-1"
          >
            <option
              value=""
              disabled
              selected
            >
              Pilih kota
            </option>
            <option v-if="isLoadingCities || isFetchingCities">Sedang mengambil data kota</option>
            <option v-else-if="isErrorCities">Data tidak ada</option>
            <option v-else-if="isFetchedCities && dataCities?.data?.count === 0">Data tidak ada</option>
            <option
              v-for="city in dataCities?.data?.data"
              :key="city._id"
              :value="city._id"
            >
              {{ city.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm">{{ errors.city }}</span>
        </div>
        <div class="mb-4">
          <label
            for="iata_code"
            class="block mb-2"
            >Kode Iata</label
          >
          <input
            type="iata_code"
            id="iata_code"
            v-model="iata_code"
            placeholder="Masukkan kode Iata"
            class="input-default mb-1"
          />
          <span class="text-red-500 text-sm">{{ errors.iata_code }}</span>
        </div>
        <div class="text-right">
          <button
            type="button"
            onclick="edit_airport_modal.close()"
            class="btn btn-sm btn-ghost rounded-full px-4 text-primary hover:bg-white"
          >
            Batal
          </button>
          <button
            :disabled="isPendingEditAirport"
            type="submit"
            class="bg-primary btn btn-sm rounded-full px-4 text-white hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryHover"
          >
            <span
              v-if="isPendingEditAirport"
              class="loading loading-dots loading-sm"
            />
            <span v-else>Ubah</span>
          </button>
        </div>
      </Form>
    </div>
  </dialog>

  <!-- Delete airport Modal -->
  <dialog
    id="delete_airport_modal"
    class="modal flex items-start justify-center pt-10"
  >
    <div class="modal-box px-4 py-5 max-w-[400px]">
      <h3 class="text-lg font-bold mb-3">Hapus Data</h3>
      <p class="mb-4">Apakah anda yakin akan menghapus data ini?</p>
      <div class="text-right">
        <button
          type="button"
          onclick="delete_airport_modal.close()"
          class="btn btn-sm btn-ghost rounded-full px-4 text-primary hover:bg-white"
        >
          Batal
        </button>
        <button
          :disabled="isPendingDeleteAirport"
          @click="onClickedDelete"
          class="mx-1 btn btn-error rounded-full !text-white btn-sm"
        >
          <span
            v-if="isPendingDeleteAirport"
            class="loading loading-dots loading-sm"
          />
          <span v-else>Hapus</span>
        </button>
      </div>
    </div>
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button>close</button>
    </form>
  </dialog>
</template>
