<template>
  <div
    class="grid grid-cols-[2rem_minmax(0,_1fr)] grid-rows-[2rem_minmax(0,_1fr)] h-screen"
  >
    <div class="col-span-2 bg-blue-100">
      <slot name="header"></slot>
    </div>
    <div class="bg-red-100">
      <slot name="toolbar"></slot>
    </div>
    <div class="bg-green-100">
      <slot />
    </div>
  </div>
</template>
