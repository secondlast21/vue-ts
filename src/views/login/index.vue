<script setup lang="ts">
import CryptoJS from 'crypto-js'
import { Form, useForm } from 'vee-validate'
import { type Ref, ref } from 'vue'
import * as Yup from 'yup'

import bgImg from '@/assets/img/img-login.jpg'
import logoTopLeft from '@/assets/img/logo-img-side-left.png'
import { useLogin } from '@/composables/useLogin'
import { EyeCloseIcon, EyeOpenIcon } from '@/icons'

import LoginFooter from './components/LoginFooter.vue'

const showPassword: Ref<boolean> = ref(false)

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: Yup.object({
    email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
    password: Yup.string().min(8, 'Password harus minimal 8 karakter').required('Password wajib diisi'),
  }),
})

const [email] = defineField('email')
const [password] = defineField('password')

const { mutate, isPending } = useLogin()

const onSubmit = handleSubmit((values) => {
  mutate({
    email: values.email,
    password: CryptoJS.SHA256(values.password).toString(CryptoJS.enc.Hex),
  })
})

const setShowPassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-gray-100">
    <div class="relative lg:w-1/3 h-[40vh] lg:h-auto">
      <img
        :src="bgImg"
        alt="Background"
        class="w-full h-full object-cover"
      />
      <img
        :src="logoTopLeft"
        alt="Logo"
        class="absolute top-12 left-12 w-64"
      />
    </div>
    <div class="lg:w-2/3 h-[60vh] lg:h-[100vh] flex flex-col justify-start sm:justify-center items-center bg-gray-100">
      <div class="w-full max-w-sm mb-auto mt-auto">
        <h1 class="font-bold text-5xl mb-10">Login</h1>
        <Form @submit="() => onSubmit()">
          <div class="mb-6">
            <label
              for="email"
              class="block text-gray-700 font-bold mb-2"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Masukkan email"
              class="input-default"
            />
            <span class="text-red-500">{{ errors.email }}</span>
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-700 font-bold mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="Masukkan password"
                class="input-default"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="setShowPassword"
              >
                <component
                  :is="showPassword ? EyeCloseIcon : EyeOpenIcon"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <span class="text-red-500">{{ errors.password }}</span>
          </div>
          <button
            :disabled="isPending"
            type="submit"
            class="w-full bg-primary text-white py-2 rounded hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryHover"
          >
            <span
              v-if="isPending"
              class="loading loading-dots loading-md"
            />
            <span v-else>Masuk</span>
          </button>
        </Form>
      </div>

      <LoginFooter />
    </div>
  </div>
</template>
