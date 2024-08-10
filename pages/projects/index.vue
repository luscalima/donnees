<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { AppModalConfirm } from '#components'

useHead({
  title: 'My projects - donnees',
})
definePageMeta({
  layout: false,
})

const { data: projects, execute: fetchProjects } = useFetch('/api/projects')
const {
  execute: postProject,
  loading,
  error: postError,
} = usePost('/api/projects')
const toast = useToast()
const modal = useModal()
const state = reactive({
  project: {
    name: '',
    description: '',
  },
})
const {
  isOpen: isCreateOpen,
  open: openCreate,
  close: closeCreate,
} = useModalControl({
  onClose() {
    state.project.name = ''
    state.project.description = ''
  },
})

async function handleProjectSubmit(event: FormSubmitEvent<ProjectSchema>) {
  await postProject(event.data)

  if (postError.value) {
    toast.add({
      color: 'red',
      title: 'Project creation failed',
      description: postError.value,
    })
    return
  }

  toast.add({
    color: 'green',
    title: `Project ${event.data.name} created`,
  })
  closeCreate()
  fetchProjects()
}

async function handleProjectDelete(id: string) {
  try {
    await useFetch(`/api/projects/${id}`, {
      method: 'delete',
    })
    toast.add({
      color: 'green',
      title: 'Project deleted',
    })
    modal.close()
    fetchProjects()
  } catch {
    toast.add({
      color: 'red',
      title: 'Project deletion failed',
    })
  }
}

function confirmProjectDelete(project: { id: string; name: string }) {
  modal.open(AppModalConfirm, {
    title: 'Delete project?',
    description: `Project ${project.name} will be permanently deleted and will not be recoverable.`,
    onOk() {
      handleProjectDelete(project.id)
    },
  })
}
</script>

<template>
  <UModal v-model="isCreateOpen">
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
          <UInput v-model="state.project.name" />
        </UFormGroup>
        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.project.description" />
        </UFormGroup>
        <div class="flex justify-end">
          <UButton type="submit" :loading="loading">Create</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>

  <NuxtLayout name="projects">
    <template #title>
      <UIcon name="i-ph-tree-structure" class="text-2xl" />
      <h2 class="text-xl">My projects</h2>
      <div class="ml-auto">
        <UButton
          size="xl"
          icon="i-ph-folder-simple-plus-fill"
          color="gray"
          :ui="{ rounded: 'rounded-full' }"
          @click="openCreate"
        >
          New project
        </UButton>
      </div>
    </template>
    <UTooltip
      v-for="project in projects"
      :key="project.id"
      :text="project.name"
      :open-delay="750"
    >
      <NuxtLink v-slot="{ navigate }" :to="`/projects/${project.id}`" custom>
        <UCard
          :ui="{ base: 'w-full h-fit cursor-pointer hover:bg-gray-50' }"
          @dblclick="navigate"
        >
          <div class="flex items-center gap-1">
            <UIcon name="i-ph-folder-simple-duotone" class="text-xl shrink-0" />
            <h2 class="truncate">{{ project.name }}</h2>
            <UDropdown
              :popper="{ placement: 'bottom-start' }"
              :items="[
                [
                  {
                    label: 'Edit',
                    icon: 'i-ph-note-pencil',
                  },
                  {
                    label: 'Delete',
                    icon: 'i-ph-trash',
                    click() {
                      confirmProjectDelete(project)
                    },
                  },
                ],
              ]"
              :ui="{ width: 'w-36' }"
              class="ml-auto"
            >
              <UButton
                color="gray"
                variant="soft"
                icon="i-ph-dots-three-vertical-bold"
                :ui="{ rounded: 'rounded-full' }"
              />
            </UDropdown>
          </div>
        </UCard>
      </NuxtLink>
    </UTooltip>
  </NuxtLayout>
</template>
