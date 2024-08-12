<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description: string
    okText?: string
    onOk: () => void
    loading?: boolean
  }>(),
  { okText: 'OK', loading: false },
)
</script>

<template>
  <UModal>
    <UCard :ui="{ ring: '' }">
      <template #header>
        <h2 class="text-xl">
          {{ title }}
        </h2>
      </template>
      <p>
        {{ description }}
      </p>
      <template #footer>
        <div class="flex justify-end gap-4">
          <UButton color="gray" variant="ghost">Cancel</UButton>
          <UButton color="red" :loading="loading" @click="onOk">
            {{ okText }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
