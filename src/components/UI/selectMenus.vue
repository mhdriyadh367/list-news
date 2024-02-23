<script setup>
import { computed } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/20/solid'
import { CaretDown } from '@/assets/icons/index.js'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: () => {
      ;[]
    }
  },
  defaultValue: {
    type: [String, Number, Array],
    default: () => {
      ;[]
    }
  },
  modelValue: {
    type: [String, Number, Array, Object],
    default: () => {
      ;[]
    }
  },
  placeholder: {
    type: String,
    default: 'Select option'
  },
  multiple: Boolean,
  error: {
    type: String,
    default: null
  },
  customWidth: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: 'w-full'
  },
  customBgColor: {
    type: String,
    default: 'bg-white'
  },
  customTxtColor: {
    type: String,
    default: 'text-black'
  },
  customPadding: {
    type: String,
    default: 'py-2 pl-3 pr-10'
  },
  position: {
    type: String,
    default: 'left'
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
}

const label = computed(() => {
  return props.options
    ?.filter((option) => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(option.value)
      }

      return props.modelValue === option.value
    })
    .map((option) => option.label)
    .join(', ')
})
</script>
<template>
  <Listbox
    as="div"
    :model-value="props.modelValue"
    :multiple="props.multiple"
    :default-value="props.defaultValue"
    @update:model-value="(value) => emit('update:modelValue', value)"
  >
    <ListboxLabel v-if="props.label" class="block text-base font-medium text-gray-700"
      >{{ props.label }}<span v-if="mandatory" class="text-red-700">*</span>
    </ListboxLabel>
    <div class="relative mt-1">
      <ListboxButton
        :disabled="disabled"
        class="relative w-full cursor-default rounded-md border border-none dark:bg-slate-700 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-white"
        :class="[disabled ? 'bg-neutral-50 text-neutral-500' : customBgColor, customPadding]"
      >
        <span v-if="label" class="block truncate" :class="customTxtColor">{{ label }}</span>
        <span v-else :class="customTxtColor">{{ props.placeholder }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <CaretDown aria-hidden="true" class="h-5 w-5 text-gray-400" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          :class="[
            props.customWidth ? props.width : 'w-full',
            props.position === 'right' ? 'right-0' : 'left-0',
            props.customBgColor
          ]"
        >
          <ListboxOption
            v-for="option in props.options"
            :key="option.label"
            v-slot="{ active, selected }"
            :value="option.value"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : props.customTxtColor,
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]"
              @click="handleChange(option)"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                option.label
              }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon aria-hidden="true" class="h-5 w-5" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
      <div v-if="errorMessage" class="ml-1 text-red-600 text-xs mt-1">{{ errorMessage }}</div>
    </div>
  </Listbox>
</template>
