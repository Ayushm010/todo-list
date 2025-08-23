import { todoStore, projectArr } from "./todoStore";

// function to create a new task object
export function createTask(title, description, priority, checklist, projectId, taskId) {
  return {
    title: title,
    description: description,
    priority: priority,
    checklist: checklist,
    projectId: projectId,
    taskId: taskId,
  };
}

// function to add tasks into the DOM grid
export function addTask(projectId) {
  const taskGrid = document.querySelector(".task-grid");
  taskGrid.innerHTML = "";

  const filteredTodoStore = todoStore.filter(todo => todo.projectId === projectId);

  for (let i = 0; i < filteredTodoStore.length; i++) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.id = todoStore[i].taskId;

    const headSection = document.createElement("div");
      headSection.classList.add("head-section")

    const taskName = document.createElement("p");
    taskName.textContent = filteredTodoStore[i].title;

    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("remove-task-button");
    removeTaskButton.textContent = "X";

    headSection.append(taskName, removeTaskButton);
    task.appendChild(headSection);
    taskGrid.appendChild(task);
    console.log(filteredTodoStore[i]);
  }
}

export function onClickTask(taskId) {
  const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  if (taskIdx === -1) return;

  const taskList = document.getElementsByClassName("task");

  Array.from(taskList).forEach(task => {
    if (task.id === todoStore[taskIdx].taskId) {
      task.innerHTML = "";
      
      const headSection = document.createElement("div");
      headSection.classList.add("head-section")
      const taskName = document.createElement("p");
      taskName.textContent = todoStore[taskIdx].title;

      const removeTaskButton = document.createElement("button");
      removeTaskButton.classList.add("remove-task-button");
      removeTaskButton.textContent = "X";
      
      const details = document.createElement("div");

      const description = document.createElement("p");
      description.textContent = todoStore[taskIdx].description;

      headSection.append(taskName, removeTaskButton);
      details.append(description);
      task.append(headSection,details);
      
    }
  });
}

export function removeTask(projectId, taskId) {// When remove task button is clicked
  const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  if (taskIdx !== -1) {
    todoStore.splice(taskIdx, 1);
  }
  addTask(projectId);
}