<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="projects">
    <template #title>
      <UIcon name="i-ph-folder-simple" class="text-2xl" />
      <h2 class="text-xl">Teste</h2>
      <div class="ml-auto">
        <UButton
          size="xl"
          icon="i-ph-folder-simple-plus-fill"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
        >
          New diagram
        </UButton>
      </div>
    </template>
  </NuxtLayout>
</template>
