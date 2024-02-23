import { useProjectsUsersStore } from '@/stores/project-user.store.js'
import { useProjectsHomeStore } from '@/stores/project-home.store.js'
import { useProjectsStore } from '@/stores/project.store.js'
export default function useDeleteStateSearch() {
  let projectUserStore = useProjectsUsersStore()
  let projectHomeStore = useProjectsHomeStore()
  let projectStore = useProjectsStore()
  const deleteSearch = () => {
    projectHomeStore.searchValue = ''
    projectUserStore.searchValue = ''
    projectStore.searchValue = ''
  }
  return {
    deleteSearch
  }
}
