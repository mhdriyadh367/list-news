import { useProjectsUsersStore } from '@/stores/project-user.store.js'
export default function useHandleUpdateWorkspace() {
  let projectUserStore = useProjectsUsersStore()
  const updateHandleWorkspace = (id, Workspace) => {
    let workspaceValue = Workspace.exportJSON()
    // const stringWorkspace = JSON.stringify(workspaceValue);
    const data = {
      id: id,
      title: '',
      description: '',
      code: projectUserStore.project_user.code,
      dashboard_layouts: projectUserStore.project_user.dashboard_layouts,
      workspace: workspaceValue
    }
    projectUserStore.editProjectUser(id, data)
  }
  return {
    updateHandleWorkspace
  }
}
