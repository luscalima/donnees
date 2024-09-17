<template>
  <AppPopover>
    <AppPopoverTrigger as-child>
      <slot />
    </AppPopoverTrigger>
    <AppPopoverContent class="flex flex-col w-fit p-2">
      <slot name="content" />
    </AppPopoverContent>
  </AppPopover>
</template>
