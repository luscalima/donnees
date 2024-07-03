<script setup lang="ts">
import { newInstance, type BrowserJsPlumbInstance } from "@jsplumb/browser-ui";

const root = ref<HTMLElement | null>(null);
const canvas = ref<BrowserJsPlumbInstance | null>(null);

provide("canvas", canvas);

onMounted(() => {
  canvas.value = newInstance({
    container: root.value!,
  });
});
</script>

<template>
  <div ref="root" class="relative">
    <slot />
  </div>
</template>
