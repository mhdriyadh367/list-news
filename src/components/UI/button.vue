<script setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  color: {
    type: String,
    default: 'default'
  },
  radius: {
    type: String,
    default: null,
    validator: (val) => {
      if (!['rounded', 'full', 'none', 'sm', 'md', 'lg', 'xl', '2xl'].includes(val)) {
        console.error(`Invalid value for prop "radius": ${val}`)
        return false
      }
      return true
    }
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  // text: {
  //   type: Boolean,
  //   default: false,
  // },
  outlined: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  underline: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    default: ''
  },
  href: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  }
  // icon: {
  //   type: Boolean,
  //   default: false,
  // },
})
const getColor = () => {
  if (props.disabled) {
    return 'bg-gray-200 text-gray-600 cursor-not-allowed'
  } else {
    switch (props.color) {
      case 'primary':
        return 'border-primary-600 hover:border-primary-700 focus:ring-purple-500 bg-primary-600 text-white hover:bg-primary-700 dark:text-white'
      case 'secondary':
        return 'border-white bg-white hover:bg-gray-200 hover:border-gray-100 focus:ring-gray-300 text-gray-700'
      case 'success':
        return 'border-green-500 bg-green-600 hover:bg-green-700 hover:border-green-600 focus:ring-green-300 text-white dark:text-white'
      case 'danger':
        return 'border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600 focus:ring-red-300 text-white dark:text-white'
      case 'warning':
        return 'border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 focus:ring-yellow-300 text-white dark:text-white'
      case 'info':
        return 'border-blue-500 bg-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:ring-blue-300 text-white dark:text-white'
      case 'primary-text':
        return 'border-white bg-white hover:text-primary-800 text-primary-600'
      default:
        return 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-900'
    }
  }
}

const getRadius = () => {
  switch (props.radius) {
    case 'full':
      return 'rounded-full'
    case 'none':
      return 'none'
    case 'sm':
      return 'rounded-sm'
    case 'md':
      return 'rounded-md'
    case 'lg':
      return 'rounded-lg'
    case 'xl':
      return 'rounded-xl'
    case '2xl':
      return 'rounded-2xl'
    default:
      return 'rounded'
  }
}

const getSize = () => {
  switch (props.size) {
    case 'xxs':
      return 'text-xs px-1.5 py-1'
    case 'xs':
      return 'text-xs px-2 py-1.5'
    case 'sm':
      return 'text-sm px-2.5 py-1.5'
    case 'md':
      return 'px-3 py-2'
    case 'lg':
      return 'text-base px-4 py-2.5'
    case 'xl':
      return 'text-lg px-5 py-3'
    case '2xl':
      return 'text-xl px-5 py-4'
  }
}
const classes = computed(() => {
  return [
    'inline-flex justify-center items-center appearance-none border font-semibold transition duration-300 focus:ring-1 focus:outline-none',
    `${getColor()}`,
    `${getRadius()}`,
    `${getSize()}`,
    {
      'p-0 inline border-none': props.outlined,
      'w-full block': props.block,
      underline: props.underline
    }
  ]
})
const tag = computed(() => (props.to ? 'nuxt-link' : props.href ? 'a' : 'button'))
</script>

<template>
  <component :is="tag" :to="to" :href="href" :type="type" :class="classes" :disabled="disabled">
    <div v-if="isLoading" class="mx-8">
      <!-- <Icon name="fa6-solid:spinner" class="-mr-1 h-5 w-5 animate-spin" aria-hidden="true" /> -->
    </div>
    <slot />
  </component>
</template>
