export function createTask(title,description,priority,checklist,projectId) {
    return {
        title: title,
        description: description,
        priority: priority,
        checklist:checklist,
        projectId: projectId,
    }
}
