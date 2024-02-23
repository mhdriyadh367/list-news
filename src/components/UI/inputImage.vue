<script setup>
import { uploadImage } from '@/assets/svg/index'
const props = defineProps({
  // Assuming modelValue is a string representing the image URL
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Label here'
  },
  name: {
    type: String,
    default: 'name'
  },
  mandatory: {
    type: Boolean,
    default: false
  }
})

const imageUrl = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

function onImageChange(event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imageUrl.value = reader.result
    emit('update:modelValue', imageUrl.value)
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    imageUrl.value = newValue
  }
)
</script>

<template>
  <div>
    <label v-if="label" class="block font-medium mb-1 text-grey-700" :for="name">
      {{ label }}<span v-if="mandatory" class="text-red-700">*</span>
    </label>

    <div class="flex mb-1 rounded-md shadow-sm outline outline-1 outline-gray-300">
      <div class="p-3 m-3 w-72 h-32 outline rounded-md outline-1 outline-gray-300 bg-gray-200">
        <img class="w-full h-full" :src="imageUrl" v-if="imageUrl" />
        <uploadImage v-else class="mt-9 mx-auto" />
      </div>
      <div class="p-3 my-auto text-sm text-gray-6000">
        <p class="text-gray-500 -mt-3">Size: 700x430 pixels</p>
        <p class="text-gray-500">File Support: jpg, .jpeg,. gif, or .png.</p>
        <div class="mt-5">
          <label
            for="imageInput"
            class="w-full px-4 py-2 bg-primary-600 rounded-md text-white cursor-pointer hover:bg-primary-700 transition duration-300 ease-in-out"
          >
            Upload Image
          </label>
          <input type="file" id="imageInput" ref="imageInput" @change="onImageChange" hidden />
        </div>
      </div>
    </div>
  </div>
</template>
