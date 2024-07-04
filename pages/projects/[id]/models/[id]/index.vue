<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="canvas">
    <ClientOnly>
      <AppCanvas>
        <AppCanvasSquare id="1" />
        <AppCanvasSquare id="2" />
        <AppCanvasSquare id="3" />
      </AppCanvas>
    </ClientOnly>
  </NuxtLayout>
</template>
