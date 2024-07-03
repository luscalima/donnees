<script setup lang="ts">
import {
  AnchorLocations,
  type BrowserJsPlumbInstance,
} from "@jsplumb/browser-ui";

const root = ref(null);
const canvas = inject<Ref<BrowserJsPlumbInstance> | null>("canvas", null);

// TODO: consertar conexão entre os quadrados
watch(
  () => canvas?.value,
  (canvas) => {
    canvas!.addEndpoint(root.value!, {
      source: true,
      target: true,
      anchor: AnchorLocations.Top,
    });
  },
  { once: true }
);
</script>

<template>
  <div ref="root" class="relative w-10 h-10 bg-yellow-100"></div>
</template>
