<template>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      v-model="enabled"
      :class="[
        enabled ? 'bg-blue-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        ]"
      />
    </Switch>
    <SwitchLabel v-if="props.label" as="span" class="ml-3">
      <span class="text-sm" :class="[enabled ? 'font-medium text-gray-900' : 'text-gray-500']">{{
        props.label
      }}</span>
    </SwitchLabel>
  </SwitchGroup>
</template>

<script setup>
import { ref, watch } from 'vue'
import { SwitchGroup, Switch, SwitchLabel } from '@headlessui/vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: () => {
      ''
    }
  }
})
const emit = defineEmits(['update:modelValue', 'change'])

const enabled = ref(!!props.modelValue)

watch(enabled, () => {
  emit('update:modelValue', enabled.value)
  emit('change')
})

watch(
  () => props.modelValue,
  () => {
    enabled.value = !!props.modelValue
  }
)
</script>
