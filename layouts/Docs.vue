<template>
  <div class="container mx-auto text-gray-700">
    <header
      class="grid grid-cols-3 gap-4 items-center h-16 border-b border-gray-100"
    >
      <div>
        <strong>donnees</strong>
      </div>
    </header>
    <div class="py-8">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
