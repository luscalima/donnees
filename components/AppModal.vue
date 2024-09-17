<script lang="ts" setup>
withDefaults(
  defineProps<{
    title: string
    description: string
    okText?: string
    closeText?: string
    okHandler?: () => void
    showOk?: boolean
    showClose?: boolean
    showFooter?: boolean
  }>(),
  {
    okText: 'OK',
    closeText: 'Cancel',
    showOk: true,
    showClose: true,
    showFooter: true,
    okHandler: () => {},
  },
)
const emit = defineEmits<{ (e: 'close'): void }>()
const open = defineModel('open', { type: Boolean, default: false })

watch(open, value => {
  if (!value) {
    emit('close')
  }
})
</script>

<template>
  <AppDialog v-model:open="open" modal>
    <AppDialogContent>
      <AppDialogHeader>
        <AppDialogTitle v-if="title">{{ title }}</AppDialogTitle>
        <AppDialogDescription v-if="description">
          {{ description }}
        </AppDialogDescription>
      </AppDialogHeader>
      <slot />
      <AppDialogFooter v-if="showFooter">
        <AppDialogClose v-if="showClose" as-child>
          <AppButton variant="secondary">{{ closeText }}</AppButton>
        </AppDialogClose>
        <slot name="footer">
          <AppButton v-if="showOk" @click="okHandler">
            {{ okText }}
          </AppButton>
        </slot>
      </AppDialogFooter>
    </AppDialogContent>
  </AppDialog>
</template>
