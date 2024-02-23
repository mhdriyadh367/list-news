<script setup>
import Quill from 'quill'

const props = defineProps({
  label: {
    type: String,
    default: 'null'
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    required: true,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const editor = ref(null)
const quillRef = ref(null)

onMounted(() => {
  if (!editor.value) return
  const quill = new Quill(editor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike', 'code-block', 'clean'],
        [{ list: 'bullet' }, { list: 'ordered' }],
        ['link', 'image', 'blockquote']
      ]
    }
  })

  // quill.setContents(props.modelValue)
  quill.root.innerHTML = props.modelValue
  quillRef.value = quill

  quill.on('text-change', () => {
    const html = quill.root.innerHTML
    emit('update:modelValue', html)
  })
})

onBeforeUnmount(() => {
  const quill = quillRef.value
  if (quill) quill.off('text-change')
})
</script>

<template>
  <div>
    <label v-if="label" class="font-medium">
      {{ label }}<span v-if="mandatory" class="text-red-700">*</span>
    </label>
    <div ref="editor" style="height: 100px; border-radius: 0 0 7px 7px" />
  </div>
</template>
