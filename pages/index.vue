<template>
  <div class="flex flex-col w-full h-screen bg-white">
    <div class="container mx-auto">
      <header
        class="flex items-center h-16 border-b border-gray-100 text-zinc-900"
      >
        <div>
          <NuxtLink to="/">
            <strong> donnees </strong>
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
    </div>
    <div class="my-auto">
      <h1 class="text-zinc-900 text-6xl text-center font-bold capitalize">
        the open source <br />
        <span class="text-amber-500">database modeling</span> tool
      </h1>
      <div class="flex justify-center gap-4 mt-20">
        <AppButton to="/projects">
          Get Started
          <RocketIcon class="w-4 h-4 ml-2" />
        </AppButton>
        <AppButton variant="outline">
          Get Involved
          <LaptopIcon class="w-4 h-4 ml-2" />
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GithubLogoIcon, LaptopIcon, RocketIcon } from '@radix-icons/vue'
</script>
