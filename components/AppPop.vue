<script lang="ts" setup>
import { type HTMLAttributes } from 'vue'
import type { PopoverContentProps, PopoverTriggerProps } from 'radix-vue'

defineProps<{
  trigger?: PopoverTriggerProps & { class?: HTMLAttributes['class'] }
  content?: PopoverContentProps
}>()
</script>

<template>
  <AppPopover class="group">
    <AppPopoverTrigger as-child v-bind="trigger">
      <slot />
    </AppPopoverTrigger>
    <AppPopoverContent class="flex flex-col w-fit p-1" v-bind="content">
      <slot name="content" />
    </AppPopoverContent>
  </AppPopover>
</template>
