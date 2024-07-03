<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="canvas">
    <ClientOnly>
      <AppCanvas>
        <AppCanvasSquare />
        <AppCanvasSquare />
        <AppCanvasSquare />
      </AppCanvas>
    </ClientOnly>
  </NuxtLayout>
</template>
