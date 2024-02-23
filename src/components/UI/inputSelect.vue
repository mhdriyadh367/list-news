<script setup>
import { computed, ref, onMounted } from 'vue'
const props = defineProps({
  name: {
    type: String,
    default: null
  },
  id: {
    type: String,
    default: null
  },
  autocomplete: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  inputmode: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  useIcon: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: ''
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  required: Boolean,
  borderless: Boolean,
  transparent: Boolean,
  ctrlKFocus: Boolean
})
const emit = defineEmits(['update:modelValue', 'setRef'])
const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
const inputElClass = computed(() => {
  const base = [
    'max-w-full border-gray-300 rounded-md w-full',
    'dark:placeholder-gray-400',
    props.borderless ? 'border-0' : 'border',
    props.transparent ? 'bg-white' : 'bg-[#EBEBEB] dark:bg-slate-800',
    props.useIcon ? 'pl-10' : null
  ]
  if (props.icon) {
    base.push('pl-10')
  }
  return base
})
const selectEl = ref(null)
const textareaEl = ref(null)
const inputEl = ref(null)
onMounted(() => {
  if (selectEl.value) {
    emit('setRef', selectEl.value)
  } else if (textareaEl.value) {
    emit('setRef', textareaEl.value)
  } else {
    emit('setRef', inputEl.value)
  }
})
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
      <select :id="id" v-model="computedValue" :name="name" :class="inputElClass" class="h-[48px]">
        <option value="" disabled hidden>{{ props.placeholder }}</option>
        <option v-for="option in options" :key="option.key" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
