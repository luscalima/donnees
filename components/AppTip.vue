<script lang="ts" setup>
defineProps<{
  description: string
}>()
</script>

<template>
  <AppTooltip>
    <AppTooltipTrigger as-child>
      <slot />
    </AppTooltipTrigger>
    <AppTooltipContent>
      {{ description }}
    </AppTooltipContent>
  </AppTooltip>
</template>
