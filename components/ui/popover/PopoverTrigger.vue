<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { PopoverTrigger, type PopoverTriggerProps } from 'radix-vue'

const props = defineProps<
  PopoverTriggerProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <PopoverTrigger v-bind="props">
    <slot />
  </PopoverTrigger>
</template>
