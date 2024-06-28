<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: false,
});

const { id: projectId } = useRoute().params;
const { data: project } = await useFetch(`/api/projects/${projectId}`);
const { execute: postModel, loading, error } = usePost("/api/models");

useHead({
  title: `${project.value?.name} - donnees`,
});

const toast = useToast();
const state = reactive({
  isModalOpen: false,
  model: {
    projectId,
    name: "",
    description: "",
    type: "erd",
  },
});
const typeOptions = [
  { value: "erd", label: "ERD" },
  { value: "relational", label: "Relational" },
];

async function handleModelSubmit(event: FormSubmitEvent<ModelSchema>) {
  await postModel(event.data);

  if (error.value) {
    toast.add({
      color: "red",
      title: "Model creation failed",
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
  <UModal v-model="state.isModalOpen">
    <UCard :ui="{ ring: '' }">
      <template #header>
        <h2 class="text-xl">New model</h2>
      </template>
      <UForm
        :schema="modelSchema"
        :state="state.model"
        class="space-y-4"
        @submit="handleModelSubmit"
      >
        <div class="grid grid-cols-3 gap-4">
          <UFormGroup label="Name" name="name" required class="col-span-2">
            <UInput v-model="state.model.name" size="lg" />
          </UFormGroup>
          <UFormGroup label="Type" name="type">
            <USelect
              v-model="state.model.type"
              size="lg"
              :options="typeOptions"
            />
          </UFormGroup>
        </div>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.model.description" size="lg" />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton size="lg" type="submit" :loading="loading">Create</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>

  <NuxtLayout name="projects">
    <template #title>
      <UIcon name="i-ph-folder-simple" class="text-2xl" />
      <h2 class="text-xl">
        {{ project?.name }}
      </h2>
      <div class="ml-auto">
        <UButton
          size="xl"
          icon="i-ph-folder-simple-plus-fill"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
          @click="state.isModalOpen = true"
        >
          New model
        </UButton>
      </div>
      <div v-if="project?.description" class="w-full">
        <p>{{ project?.description }}</p>
      </div>
    </template>
  </NuxtLayout>
</template>
