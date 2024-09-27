<script setup lang="ts">
import { PlusIcon } from '@radix-icons/vue'

definePageMeta({
  layout: false,
})

const { id: projectId } = useRoute().params
const { data: project } = await useFetch(`/api/projects/${projectId}`)

if (project.value?.name) {
  useHead({ title: `${project.value.name} - donnees` })
}

const state = reactive({
  diagramModal: false,
  diagram: {
    projectId,
    name: '',
    description: '',
    type: 'erd',
  },
})
// const typeOptions = [
//   { value: 'erd', label: 'ERD' },
//   { value: 'relational', label: 'Relational' },
// ]

// TODO: testar auth com supabase
// TODO: criar projeto no github e vincular com o supabase
</script>

<template>
  <NuxtLayout name="projects">
    <template #title>
      <AppBreadcrumb class="select-none">
        <AppBreadcrumbList class="text-xl">
          <AppBreadcrumbItem>
            <AppBreadcrumbLink href="/projects">My projects </AppBreadcrumbLink>
          </AppBreadcrumbItem>
          <AppBreadcrumbSeparator />
          <AppBreadcrumbItem>
            <AppBreadcrumbPage>{{ project?.name }}</AppBreadcrumbPage>
          </AppBreadcrumbItem>
        </AppBreadcrumbList>
      </AppBreadcrumb>
      <div class="ml-auto">
        <AppButton @click="state.diagramModal = true">
          New diagram
          <PlusIcon class="w-4 h-4 ml-2" />
        </AppButton>
      </div>
      <div v-if="project?.description" class="mt-4 text-sm text-zinc-700">
        <p>{{ project?.description }}</p>
      </div>
    </template>
  </NuxtLayout>
</template>
