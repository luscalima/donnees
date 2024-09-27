<script lang="ts" setup>
import { GithubLogoIcon, LaptopIcon, RocketIcon } from '@radix-icons/vue'
</script>

<template>
  <div class="flex flex-col w-full h-screen bg-zinc-50 bg-opacity-50">
    <div class="bg-white pb-28">
      <div class="container mx-auto">
        <header
          class="flex items-center h-16 mb-28 border-b border-gray-100 text-zinc-900"
        >
          <div>
            <NuxtLink to="/">
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
        <h1 class="text-zinc-900 text-7xl font-bold capitalize">
          the open source <br />
          <span class="text-zinc-500">database modeling</span> tool
        </h1>
        <div class="flex gap-4 mt-20">
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
    <div class="container">
      <section>
        <div class="my-16 text-xl text-zinc-600 uppercase">
          <h2>See what you can do</h2>
        </div>
      </section>
    </div>
  </div>
</template>
