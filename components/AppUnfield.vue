<script lang="ts" setup>
withDefaults(
  defineProps<{
    name: string
    label?: string
    description?: string
    message?: string
    limit?: number
  }>(),
  {
    label: '',
    description: '',
    message: '',
    limit: 0,
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
      <AppFormDescription
        v-if="description || limit"
        class="flex justify-between"
      >
        <span>
          {{ description }}
        </span>
        <span v-if="limit" class="text-right">
          {{ componentField.modelValue?.length ?? 0 }}/{{ limit }}
        </span>
      </AppFormDescription>
      <AppFormMessage />
    </AppFormItem>
  </AppFormField>
</template>
