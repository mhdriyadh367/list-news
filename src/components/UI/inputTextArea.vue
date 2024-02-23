<script setup>
import { computed } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 4
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
  mandatory: {
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
</script>

<template>
  <div>
    <label v-if="label" class="block font-medium mb-1 text-gray-700" :for="name">
      {{ label }}<span v-if="mandatory" class="text-red-700">*</span>
    </label>
    <div class="mt-1">
      <textarea
        :id="name"
        :name="name"
        v-model="computedValue"
        :rows="rows"
        :placeholder="placeholder"
        :disabled="disabled"
        class="block rounded-md w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
      </textarea>
    </div>
  </div>
</template>
