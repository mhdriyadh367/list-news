import Main from '@/views/Index.vue'

// Layouts
import DefaultLayout from '@/layouts/DefaultLayout.vue'
export default [
  {
    path: '/',
    name: 'home',
    component: Main,
    meta: {
      layout: DefaultLayout
    }
  }
]
