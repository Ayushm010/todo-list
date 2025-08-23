import { todoStore } from "./todoStore";

// function to create a new task object
export function createTask(title,description,priority,checklist,projectId) {
  return {
    title: title,
    description: description,
    priority: priority,
    checklist: checklist,
    projectId: projectId,
  };
}

// function to add tasks into the DOM grid
export function addTask(projectId) {
  const taskGrid = document.querySelector(".task-grid");
  taskGrid.innerHTML = "";

  const filteredTodoStore = todoStore.filter(todo => todo.projectId === projectId);

  for (let i = 0; i < filteredTodoStore.length; i++) {
    const task = document.createElement("div");
    task.textContent = filteredTodoStore[i].title;
    taskGrid.appendChild(task);
    console.log(filteredTodoStore[i]);
  }
}
