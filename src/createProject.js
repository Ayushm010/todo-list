export function createProject() {
  return {
    projectName: "",
    taskIds: [],
    projectId: crypto.randomUUID(), 
  };
}
