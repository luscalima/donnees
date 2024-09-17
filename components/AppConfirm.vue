<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    description?: string
    okText?: string
    cancelText?: string
    isDestructive?: boolean
  }>(),
  {
    description: '',
    okText: 'OK',
    cancelText: 'Cancel',
    isDestructive: false,
  },
)

defineEmits<{ (e: 'ok'): void }>()
</script>

<template>
  <AppAlertDialog>
    <AppAlertDialogTrigger as-child>
      <slot />
    </AppAlertDialogTrigger>
    <AppAlertDialogContent>
      <AppAlertDialogHeader>
        <AppAlertDialogTitle>
          {{ title }}
        </AppAlertDialogTitle>
        <AppAlertDialogDescription>
          <slot name="description">
            {{ description }}
          </slot>
        </AppAlertDialogDescription>
      </AppAlertDialogHeader>
      <AppAlertDialogFooter>
        <AppAlertDialogCancel>
          {{ cancelText }}
        </AppAlertDialogCancel>
        <AppAlertDialogAction
          :variant="isDestructive ? 'destructive' : 'default'"
          @click="$emit('ok')"
        >
          {{ okText }}
        </AppAlertDialogAction>
      </AppAlertDialogFooter>
    </AppAlertDialogContent>
  </AppAlertDialog>
</template>
