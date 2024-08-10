<template>
  <UModals />
  <UNotifications />
  <div class="container mx-auto text-gray-700">
    <header
      class="grid grid-cols-3 gap-4 items-center h-16 border-b border-gray-100"
    >
      <div>
        <strong>donnees</strong>
      </div>
      <div class="col-start-2 col-span-1">
        <UInput
          size="lg"
          icon="i-ph-magnifying-glass"
          placeholder="Search projects"
        />
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
</template>
