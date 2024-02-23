<script setup>
const props = defineProps({
  idValue: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: 'Loading...'
  },
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  },
  rounded: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="animate-pulse">
    <div
      class="bg-gray-200"
      :class="`h-[${height}px] ${rounded ? 'rounded-lg' : 'rounded-none'}`"
      :style="`${idValue !== 'published' ? 'width: 100%' : `width: ${width}px`}`"
    >
      <span class="hidden">{{ text }}</span>
    </div>
  </div>
</template>
