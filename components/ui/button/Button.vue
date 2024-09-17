<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'
import { ReloadIcon } from '@radix-icons/vue'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  to?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  size: 'default',
  variant: 'default',
  class: '',
  to: undefined,
})
</script>

<template>
  <Primitive
    v-if="!to"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="disabled || loading"
  >
    <ReloadIcon v-if="loading" class="animate-spin mr-1.5" />
    <slot />
  </Primitive>
  <NuxtLink
    v-else
    v-slot="{ href, target, rel, navigate, isExternal }"
    v-bind="$props"
    custom
  >
    <a
      v-bind="$attrs"
      :href="!disabled ? href : undefined"
      :aria-disabled="disabled ? 'true' : undefined"
      :role="disabled ? 'link' : undefined"
      :rel="rel"
      :target="target"
      :class="cn(buttonVariants({ variant, size }), props.class)"
      @click="(e: MouseEvent) => !isExternal && !disabled && navigate(e)"
    >
      <slot />
    </a>
  </NuxtLink>
</template>
