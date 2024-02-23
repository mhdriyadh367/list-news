<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Prev'
  },
  bgColor: {
    type: String,
    default: '#31C55D'
  },
  hoverColor: {
    type: String,
    default: '#28A745'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button
    class="rounded-md text-white p-[10px] bg-[#31C55D]"
    
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
