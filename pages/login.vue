<script lang="ts" setup>
import { GithubLogoIcon } from '@radix-icons/vue'

const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

async function handleLogin(provider: 'github' | 'google') {
  auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  })
}
</script>

<template>
  <div class="container mx-auto text-zinc-900">
    <header
      class="grid grid-cols-2 gap-4 items-center h-16 border-b border-gray-100"
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
      <div class="ml-auto">
        <AppButton
          to="https://www.github.com/luscalima/donnees"
          target="_blank"
          variant="link"
        >
          <GithubLogoIcon class="w-4 h-4" />
        </AppButton>
      </div>
    </header>
    <main class="w-72 mx-auto mt-56">
      <h1 class="mb-8 text-center text-2xl font-semibold">Log in to donnees</h1>
      <div class="flex flex-col gap-2">
        <AppButton
          size="lg"
          class="bg-[#25292f]"
          @click="handleLogin('github')"
        >
          <GithubLogoIcon class="w-4 h-4 mr-2" />
          Continue with GitHub
        </AppButton>
        <!-- <AppButton
          size="lg"
          class="bg-[#4285f4]"
          @click="handleLogin('google')"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mr-2"
          >
            <path
              d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z"
              fill="currentColor"
            />
          </svg>
          Continue with Google
        </AppButton> -->
      </div>
    </main>
  </div>
</template>
