import { todoStore, projectArr } from "./todoStore";

// function to create a new task object
export function createTask(title, description, priority, projectId, taskId) {
  return {
    title: title,
    description: description,
    priority: priority,
    projectId: projectId,
    taskId: taskId,
    completed: false
  };
}

// function to add tasks into the DOM grid
export function addTask(projectId) {
  const taskGrid = document.querySelector(".task-grid");
  taskGrid.innerHTML = "";
  let filteredTodoStore;

  if (projectId === "completed-task-list") {
    // show only completed tasks
    filteredTodoStore = todoStore.filter(todo => todo.completed === true);
  }
  else if (projectId === "all-task-list") {
    console.log("hii i am alltask");
    filteredTodoStore = todoStore;
  } else {
    console.log("hii i am normal project");
    filteredTodoStore = todoStore.filter(todo => todo.projectId === projectId);
  }

  for (let i = 0; i < filteredTodoStore.length; i++) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.id = filteredTodoStore[i].taskId;

    const headSection = document.createElement("div");
    headSection.classList.add("head-section");

    const taskName = document.createElement("p");
    taskName.textContent = filteredTodoStore[i].title;

    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("remove-task-button");
    removeTaskButton.textContent = "X";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "Checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = filteredTodoStore[i].completed;

    if (filteredTodoStore[i].completed === true) { // if the checkbox is ticked
      taskName.innerHTML = `<del>${filteredTodoStore[i].title}</del>`;
    }

    headSection.append(checkbox, taskName, removeTaskButton);
    task.appendChild(headSection);
    taskGrid.appendChild(task);
  }
}

export function onClickCheckbox(taskDiv, taskId) {
  const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  if (taskIdx === -1) return;

  const checkbox = taskDiv.querySelector(".checkbox");
  const textPara = taskDiv.querySelector("p");

  todoStore[taskIdx].completed = checkbox.checked; // when the checkbox is checked it will update the property

  if (checkbox.checked) {
    textPara.innerHTML = `<del>${todoStore[taskIdx].title}</del>`;
  } else {
    textPara.textContent = todoStore[taskIdx].title;
  }
}

export function onClickTask(taskId) {
  const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  if (taskIdx === -1) return;

  const taskDiv = document.getElementById(taskId);
  if (!taskDiv) return;

  // Toggle details
  if (taskDiv.classList.contains("expanded")) {
    // re-render minimal view
    taskDiv.classList.remove("expanded");
    taskDiv.innerHTML = "";

    const headSection = document.createElement("div");
    headSection.classList.add("head-section");
    const taskName = document.createElement("p");
    taskName.textContent = todoStore[taskIdx].title;

    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("remove-task-button");
    removeTaskButton.textContent = "X";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.name = "Checkbox";
    checkbox.checked = todoStore[taskIdx].completed;

    if (todoStore[taskIdx].completed === true) { // if the checkbox is ticked
      taskName.innerHTML = `<del>${todoStore[taskIdx].title}</del>`;
    }

    headSection.append(checkbox, taskName, removeTaskButton);
    taskDiv.append(headSection);
  } else {
    taskDiv.classList.add("expanded");
    taskDiv.innerHTML = "";

    const headSection = document.createElement("div");
    headSection.classList.add("head-section");
    const taskName = document.createElement("p");
    taskName.textContent = todoStore[taskIdx].title;

    const removeTaskButton = document.createElement("button");
    removeTaskButton.classList.add("remove-task-button");
    removeTaskButton.textContent = "X";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "Checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = todoStore[taskIdx].completed;

    if (todoStore[taskIdx].completed === true) {
      taskName.innerHTML = `<del>${todoStore[taskIdx].title}</del>`;
    }

    const details = document.createElement("div");
    details.classList.add("details");
    const description = document.createElement("p");
    description.textContent = todoStore[taskIdx].description;

    headSection.append(checkbox, taskName, removeTaskButton);
    details.append(description);
    taskDiv.append(headSection, details);
  }
}

export function removeTask(projectId, taskId) { // When remove task button is clicked
  const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  if (taskIdx !== -1) {
    todoStore.splice(taskIdx, 1);
  }
  addTask(projectId);
}
