<template>
  <div id="app">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script>
import DefaultLayout from './Layouts/DefaultLayout.vue'
export default {
  name: 'App',
  computed: {
    layout() {
      return DefaultLayout
    }
  }
}
</script>
