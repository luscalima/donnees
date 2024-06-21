<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

useHead({
  title: "My projects - donnees",
});

const { execute, loading, error } = usePost("/api/projects");
const toast = useToast();
const state = reactive({
  isModalOpen: false,
  project: {
    name: "",
    description: "",
  },
});

watch(
  () => state.isModalOpen,
  (isOpen) => {
    if (!isOpen) {
      clearProject();
    }
  }
);

function clearProject() {
  state.project.name = "";
  state.project.description = "";
}

async function handleProjectSubmit(event: FormSubmitEvent<ProjectSchema>) {
  await execute(event.data);

  if (error.value) {
    toast.add({
      color: "red",
      title: "Project creation failed",
      description: error.value,
    });
    return;
  }

  toast.add({
    color: "green",
    title: `Project ${event.data.name} created`,
  });
  state.isModalOpen = false;
}
</script>

<template>
  <UNotifications />

  <UModal v-model="state.isModalOpen">
    <UCard :ui="{ ring: '' }">
      <template #header>
        <h2 class="text-xl">New project</h2>
      </template>
      <UForm
        :schema="projectSchema"
        :state="state.project"
        class="space-y-4"
        @submit="handleProjectSubmit"
      >
        <UFormGroup label="Name" name="name" required>
          <UInput v-model="state.project.name" size="lg" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.project.description" size="lg" />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton size="lg" type="submit" :loading="loading">Create</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>

  <div class="container mx-auto text-gray-700">
    <header
      class="grid grid-cols-3 gap-4 items-center h-16 border-b border-gray-100"
    >
      <div>
        <strong>donnees</strong>
      </div>
      <div class="col-start-2 col-span-1">
        <UInput
          size="lg"
          icon="i-ph-magnifying-glass"
          placeholder="Search projects"
        />
      </div>
    </header>
    <div class="py-8">
      <div class="flex items-center gap-2">
        <UIcon name="i-ph-tree-structure" class="text-2xl" />
        <h2 class="text-xl">My projects</h2>
      </div>
      <div class="grid grid-cols-6 gap-4 py-8">
        <UCard>
          <UButton
            size="xl"
            icon="i-ph-plus-bold"
            color="gray"
            variant="ghost"
            block
            :ui="{ rounded: 'rounded-full' }"
            @click="state.isModalOpen = true"
          >
            New
          </UButton>
        </UCard>
      </div>
    </div>
  </div>
</template>
