import { useAuthStore } from '@/stores/auth.store.js'
import { useSegmentStore } from '@/stores/segment.store.js'

export default ({ to, from, next }) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  let url = to.fullPath
  let segments = url.split('/')
  let segmentStore = useSegmentStore()

  segmentStore.setSegment(segments)

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath

    return next({
      name: 'login'
    })
  }

  return next()
}
