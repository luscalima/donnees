<script setup lang="ts">
import {
  FileIcon,
  PlusIcon,
  DotsVerticalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import type { GenericObject } from 'vee-validate'
import { useToast } from '~/components/ui/toast'

useHead({
  title: 'My projects - donnees',
})
definePageMeta({
  layout: false,
})

const router = useRouter()
const { data: projects, refresh: fetchProjects } = useFetch('/api/projects')
const {
  execute: postProject,
  loading: postLoading,
  error: postError,
} = usePost('/api/projects')
const { toast } = useToast()
const state = reactive({
  projectModal: false,
  project: {
    id: '',
    name: '',
    description: '',
  },
})
const createModalOkText = computed(() => (state.project.id ? 'Save' : 'Create'))
const createModalTitle = computed(() =>
  state.project.id ? 'Edit project' : 'Create project',
)

async function handleProjectSubmit(data: ProjectSchema | GenericObject) {
  data.id = state.project.id
  const { id } = data

  await postProject(data, { isPut: !!id })

  const titleSuccess = `Project ${data.name} ${id ? 'updated' : 'created'}`
  const titleError = `Project ${id ? 'update' : 'creation'} failed`

  if (postError.value) {
    return toast({
      title: titleError,
      description: postError.value,
    })
  }

  toast({
    title: titleSuccess,
  })
  clearCreate()
  fetchProjects()
}

async function handleProjectDelete(id: string) {
  try {
    await useFetch(`/api/projects/${id}`, { method: 'delete' })

    toast({ title: 'Project deleted' })
    state.projectModal = false
    fetchProjects()
  } catch {
    toast({ title: 'Project deletion failed' })
  }
}

function loadProject(project: Project) {
  state.project.id = project.id
  state.project.name = project.name
  state.project.description = project.description ?? ''
  state.projectModal = true
}

async function clearCreate() {
  state.projectModal = false
  state.project.id = ''
  state.project.name = ''
  state.project.description = ''
}

function handleProjctNavigation(id: string) {
  router.push(`/projects/${id}`)
}
</script>

<template>
  <AppModal
    v-model:open="state.projectModal"
    :title="createModalTitle"
    description="Fill in the information. Click create when you're done."
    @close="clearCreate"
  >
    <AppForm
      id="projectForm"
      :validation-schema="toTypedSchema(projectSchema)"
      @submit="handleProjectSubmit"
    >
      <AppUnfield
        v-model="state.project.name"
        name="name"
        label="Name"
        class="mb-10"
        :limit="60"
      >
        <template #default="{ field }">
          <AppInput v-bind="field" />
        </template>
      </AppUnfield>
      <AppUnfield
        v-model="state.project.description"
        name="description"
        label="Description"
        :limit="1000"
      >
        <template #default="{ field }">
          <AppTextarea v-bind="field" rows="5" />
        </template>
      </AppUnfield>
    </AppForm>
    <template #footer>
      <AppButton type="submit" form="projectForm" :loading="postLoading">
        {{ createModalOkText }}
      </AppButton>
    </template>
  </AppModal>

  <NuxtLayout name="projects">
    <template #title>
      <h2 class="text-xl">My projects</h2>
      <div class="ml-auto">
        <AppButton @click="state.projectModal = true">
          New project
          <PlusIcon class="w-4 h-4 ml-2" />
        </AppButton>
      </div>
    </template>

    <AppTip
      v-for="project in projects"
      :key="project.id"
      :description="project.name"
    >
      <AppCard
        tabindex="0"
        class="select-none shadow-none hover:bg-zinc-50 focus:bg-orange-100"
        @dblclick="() => handleProjctNavigation(project.id)"
        @keyup.enter="() => handleProjctNavigation(project.id)"
      >
        <AppCardHeader>
          <AppCardTitle
            class="flex items-center h-fit font-normal leading-normal"
          >
            <FileIcon class="w-4 h-4 mr-2 shrink-0" />
            <span class="truncate">{{ project.name }}</span>
            <ClientOnly>
              <AppPop>
                <AppButton
                  variant="ghost"
                  class="shrink-0 h-fit ml-auto px-2 rounded-full"
                >
                  <DotsVerticalIcon class="w-4 h-4" />
                </AppButton>
                <template #content>
                  <AppButton
                    variant="ghost"
                    class="justify-start pl-2"
                    @click="() => loadProject(project)"
                  >
                    <Pencil2Icon class="w-4 h-4 mr-2" />
                    Edit
                  </AppButton>

                  <AppConfirm
                    title="Delete project?"
                    ok-text="Delete"
                    is-destructive
                    @ok="() => handleProjectDelete(project.id)"
                  >
                    <template #description>
                      Project <strong>{{ project.name }}</strong> will be
                      permanently deleted and will not be recoverable.
                    </template>
                    <AppButton variant="ghost" class="justify-start pl-2">
                      <TrashIcon class="w-4 h-4 mr-2" />
                      Delete
                    </AppButton>
                  </AppConfirm>
                </template>
              </AppPop>
            </ClientOnly>
          </AppCardTitle>
        </AppCardHeader>
      </AppCard>
    </AppTip>
  </NuxtLayout>
</template>
