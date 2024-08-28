<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const button = cva('text-white rounded-md', {
  variants: {
    variant: {
      primary: 'bg-primary hover:bg-primaryHover',
      secondary: 'bg-secondary hover:bg-secondaryHover',
      tertiery: 'bg-tertiery hover:bg-tertieryHover',
      success: 'bg-success hover:bg-primary',
      warning: 'bg-warning hover:bg-orange-600',
      danger: 'bg-danger hover:bg-rose-600',
    },
    size: {
      small: 'px-2 py-1 text-sm',
      medium: 'px-4 py-2',
      large: 'px-8 py-4 text-lg',
    },
  },
  compoundVariants: [{ variant: 'primary', size: 'medium', class: 'primary' }],
})

type ButtonProps = VariantProps<typeof button>

withDefaults(
  defineProps<{
    variant?: ButtonProps['variant']
    size?: ButtonProps['size']
  }>(),
  {
    variant: 'primary',
    size: 'medium',
  }
)
</script>

<template>
  <button :class="button({ variant, size })">
    <slot />
  </button>
</template>
