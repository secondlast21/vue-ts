<template>
  <VeeForm
    v-slot="{ handleSubmit }"
    :validation-schema="schema"
    as="div"
  >
    <form @submit="handleSubmit($event, onSubmit)">
      <Field
        name="email"
        type="email"
      />
      <ErrorMessage name="email" />
      <Field
        name="password"
        type="password"
      />
      <ErrorMessage name="password" />
      <button>Submit</button>
    </form>
  </VeeForm>
</template>

<script setup lang="ts">
import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})

function onSubmit(values: unknown) {
  // Submit values to API...
  console.log(JSON.stringify(values.email, null, 2))
}
</script>
