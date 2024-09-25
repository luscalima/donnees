<script lang="ts" setup>
import { ExitIcon, PersonIcon } from '@radix-icons/vue'

const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const username = computed(() => user.value?.user_metadata.user_name)
const avatarUrl = computed(() => user.value?.user_metadata.avatar_url)

async function handleLogout() {
  const { error } = await supabase.auth.signOut()

  if (!error) {
    router.push('/login')
  }
}
</script>

<template>
  <AppToaster />
  <AppTooltipProvider>
    <div class="container mx-auto text-zinc-900">
      <header
        class="grid grid-cols-3 gap-4 items-center h-16 border-b border-gray-100"
      >
        <div>
          <NuxtLink to="/" class="block w-fit">
            <img
              src="/public/logo.svg"
              alt="donnees logo"
              class="w-8 h-8"
              title="donnees"
            />
          </NuxtLink>
        </div>
        <div class="col-start-2 col-span-1">
          <AppInput placeholder="Search projects" class="shadow-none" />
        </div>
        <div class="flex items-center gap-4 ml-auto">
          <AppPop
            :trigger="{
              class:
                'hover:ring-4 ring-zinc-100 data-[state=open]:ring-4 data-[state=open]:ring-zinc-200',
            }"
            :content="{ align: 'end' }"
          >
            <AppAvatar class="cursor-pointer">
              <AppAvatarImage :src="avatarUrl" />
              <AppAvatarFallback>
                <PersonIcon class="w-4 h-4" />
              </AppAvatarFallback>
            </AppAvatar>
            <template #content>
              <div class="flex flex-col items-center gap-2 p-6">
                <AppAvatar size="base">
                  <AppAvatarImage :src="avatarUrl" />
                  <AppAvatarFallback>
                    <PersonIcon class="w-4 h-4" />
                  </AppAvatarFallback>
                </AppAvatar>
                <strong class="text-zinc-900 font-normal text-2xl">
                  Hi, {{ username }}!
                </strong>
              </div>
              <AppButton
                variant="ghost"
                class="justify-start"
                @click="handleLogout"
              >
                <ExitIcon class="w-4 h-4 mr-2" />
                Log out
              </AppButton>
            </template>
          </AppPop>
        </div>
      </header>
      <div class="py-8">
        <div class="flex flex-wrap items-center gap-2">
          <slot name="title" />
        </div>
        <div class="grid grid-cols-6 gap-4 py-8">
          <slot />
        </div>
      </div>
    </div>
  </AppTooltipProvider>
</template>
