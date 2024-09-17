<script lang="ts" setup>
import { GithubLogoIcon } from '@radix-icons/vue'
</script>

<template>
  <AppToaster />
  <AppTooltipProvider>
    <div class="container mx-auto text-zinc-900">
      <header
        class="grid grid-cols-3 gap-4 items-center h-16 border-b border-gray-100"
      >
        <div>
          <NuxtLink to="/">
            <strong>donnees</strong>
          </NuxtLink>
        </div>
        <div class="col-start-2 col-span-1">
          <AppInput placeholder="Search projects" />
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
