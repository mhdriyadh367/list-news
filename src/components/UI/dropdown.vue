<script setup>
import { computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  buttonIcon: {
    type: String,
    default: 'heroicons:ellipsis-vertical-20-solid'
  },
  options: {
    type: Array,
    default: () => {
      ;[]
    }
  },
  to: {
    type: [String, Object],
    default: null
  },
  href: {
    type: String,
    default: null
  },
  bgColor: {
    type: String,
    default: 'bg-gray-100'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
}

const tag = computed(() => (props.to ? 'nuxt-link' : props.href ? 'a' : 'button'))
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div v-if="props.label">
      <MenuButton
        class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        {{ props.label }}
        <Icon :name="props.buttonIcon" class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>
    <div v-else>
      <MenuButton
        class="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        :class="`${bgColor}`"
      >
        <span class="sr-only">Open options</span>
        <Icon :name="props.buttonIcon" class="h-5 w-5" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <slot />
          <MenuItem v-for="option in props.options" v-slot="{ active }" :key="option.label">
            <component
              :is="tag"
              :href="props.href"
              :to="props.to"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'group flex items-center px-4 py-2 text-sm w-full'
              ]"
              @click="handleChange(option)"
            >
              <Icon
                v-if="option.icon"
                :name="option.icon"
                class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {{ option.label }}
            </component>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
