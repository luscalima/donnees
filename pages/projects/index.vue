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
    id: '',
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
    state.project.id = ''
    state.project.name = ''
    state.project.description = ''
  },
})
const createModalOkText = computed(() => (state.project.id ? 'Save' : 'Create'))
const createModalTitel = computed(() =>
  state.project.id ? 'Edit project' : 'Create project',
)

async function handleProjectSubmit(event: FormSubmitEvent<ProjectSchema>) {
  const id = event.data.id
  const data = event.data

  await postProject(event.data, { isPut: !!id })

  const titleSuccess = `Project ${data.name} ${id ? 'updated' : 'created'}`
  const titleError = `Project ${id ? 'update' : 'creation'} failed`

  if (postError.value) {
    return toast.add({
      color: 'red',
      title: titleError,
      description: postError.value,
    })
  }

  toast.add({
    color: 'green',
    title: titleSuccess,
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

function loadProject(project: Project) {
  state.project.id = project.id
  state.project.name = project.name
  state.project.description = project.description ?? ''
  openCreate()
}

function confirmProjectDelete(project: Project) {
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
  <UModal v-model="isCreateOpen" prevent-close>
    <UCard :ui="{ ring: '' }">
      <template #header>
        <h2 class="text-xl">
          {{ createModalTitel }}
        </h2>
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
        <div class="flex justify-end gap-4">
          <UButton color="gray" @click="closeCreate">Cancel</UButton>
          <UButton type="submit" :loading="loading">
            {{ createModalOkText }}
          </UButton>
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
                    click() {
                      loadProject(project)
                    },
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
