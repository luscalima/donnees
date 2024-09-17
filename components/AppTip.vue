<script lang="ts" setup>
defineProps<{
  description: string
}>()
</script>

<template>
  <AppTooltip>
    <AppTooltipTrigger>
      <slot />
    </AppTooltipTrigger>
    <AppTooltipContent>
      {{ description }}
    </AppTooltipContent>
  </AppTooltip>
</template>
