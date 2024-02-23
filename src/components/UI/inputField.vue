<script setup>
import { toRefs, computed } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps({
  label: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: 'name'
  },
  helper: {
    type: String,
    default: () => ''
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  placeholder: {
    type: String,
    default: 'Placeholder here'
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
  useIcon: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])
const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
const { name, rules } = toRefs(props)
const { errorMessage } = useField(name, rules)
</script>

<template>
  <div>
    <label v-if="label" class="block font-medium mb-1 text-gray-700" :for="name">
      {{ label }}<span v-if="mandatory" class="text-red-700">*</span>
    </label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div
        v-if="useIcon"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot />
      </div>
      <input
        :id="name"
        v-model="computedValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        autocomplete="current-password"
        class="rounded-md w-full h-[48px] focus:border-primary transition duration-300 sm:text-base"
        :class="[
          errorMessage
            ? 'border-red-500 focus:ring-red-500 focus:ring-opacity-50 focus:border-red-500'
            : 'border-gray-300 focus:ring-opacity-50',
          useIcon ? 'pl-10' : null,
          disabled ? 'bg-gray-300 text-gray-500' : 'bg-white'
        ]"
      />
    </div>
    <div v-if="helper" class="text-gray-500 text-xs italic mt-1">
      {{ helper }}
    </div>
    <div v-if="errorMessage" class="text-red-500 text-sm mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>
