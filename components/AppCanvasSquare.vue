<script setup lang="ts">
import {
  AnchorLocations,
  type BrowserJsPlumbInstance,
  type EndpointOptions,
} from "@jsplumb/browser-ui";

const props = defineProps<{ id: string }>();
const root = ref(null);
const canvas = inject<Ref<BrowserJsPlumbInstance> | null>("canvas", null);
const endpointConfig: EndpointOptions = {
  source: true,
  target: true,
  maxConnections: 3,
};

const grow = ref(false);

setTimeout(() => {
  grow.value = true;
}, 5_000);

watch(
  () => canvas?.value,
  (canvas) => {
    // Cria endpoints em 4 direções cardeais
    [
      AnchorLocations.Top,
      AnchorLocations.Right,
      AnchorLocations.Bottom,
      AnchorLocations.Left,
    ].forEach((anchor) => {
      canvas?.addEndpoint(root.value!, {
        ...endpointConfig,
        anchor,
        uuid: props.id,
      });
    });
  },
  { once: true }
);
</script>

<template>
  <div ref="root" class="absolute bg-yellow-100 p-4">
    <textarea name="" id=""></textarea>
    <!-- Testa o acompanhamento dos endpoints em caso de redimensionamento do elemento -->
    <textarea v-if="grow" name="" id=""></textarea>
  </div>
</template>
