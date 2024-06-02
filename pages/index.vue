<template>
  <div class="flex flex-col w-full h-screen bg-gray-50">
    <header
      class="flex items-center h-16 mx-auto container border-b border-gray-200 text-gray-700"
    >
      <div>
        <strong> donnees </strong>
      </div>
      <div class="ml-auto">
        <UButton
          to="https://www.github.com"
          target="_blank"
          icon="i-ph-github-logo-bold"
          color="gray"
          variant="link"
        />
      </div>
    </header>
    <div class="my-auto">
      <h1 class="text-gray-700 text-6xl text-center font-bold capitalize">
        the open source <br />
        <span class="text-amber-500">database modeling</span> tool
      </h1>
      <div class="flex justify-center gap-4 mt-20">
        <UButton to="/projects" size="lg" icon="i-ph-rocket-launch" trailing>
          Get Started
        </UButton>
        <UButton size="lg" variant="outline"> Get Involved </UButton>
      </div>
    </div>
  </div>
</template>
