<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string
    label?: string
    description?: string
    message?: string
  }>(),
  {
    label: '',
    description: '',
    message: '',
  },
)
</script>

<template>
  <AppFormField v-slot="{ componentField }" :name="name">
    <AppFormItem class="mb-2">
      <AppFormLabel v-if="label">
        {{ label }}
      </AppFormLabel>
      <AppFormControl>
        <slot :field="componentField" />
      </AppFormControl>
      <AppFormDescription v-if="description">
        {{ description }}
      </AppFormDescription>
      <AppFormMessage />
    </AppFormItem>
  </AppFormField>
</template>
