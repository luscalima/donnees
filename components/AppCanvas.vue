<script setup lang="ts">
import {
  EVENT_DRAG_START,
  newInstance,
  type BrowserJsPlumbInstance,
} from "@jsplumb/browser-ui";

const root = ref<HTMLElement | null>(null);
const canvas = ref<BrowserJsPlumbInstance | null>(null);

provide("canvas", canvas);

onMounted(() => {
  const value = newInstance({
    container: root.value!,
  });

  // Testa evento de arrastar para atualizar coordenadas do elemento
  // com relação ao canvas
  value.bind(EVENT_DRAG_START, (event) => {
    console.log(event);
  });

  canvas.value = value;
});
</script>

<template>
  <div ref="root" class="relative">
    <slot />
  </div>
</template>
