import { todoStore, projectArr } from "./todoStore";
import { format } from 'date-fns';


// function to create a new task object
export function createTask(title, description, priority, dueDate, projectId, taskId) {
  return {
    title: title,
    description: description,
    priority: priority,
    dueDate: dueDate,
    projectId: projectId,
    taskId: taskId,
    completed: false
  };
}

//  create task head section 
function createTaskHead(taskObj) {
  const headSection = document.createElement("div");
  headSection.classList.add("head-section");

  const taskName = document.createElement("p");
  taskName.textContent = taskObj.title;

  const removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("remove-task-button");
  removeTaskButton.textContent = "X";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "Checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = taskObj.completed;

  if (taskObj.completed === true) { // if the checkbox is ticked
    taskName.innerHTML = `<del>${taskObj.title}</del>`;
  }

  headSection.append(checkbox, taskName, removeTaskButton);
  return headSection;
}

// create task details
function createTaskDetails(taskObj) {

  const details = document.createElement("div");
  details.classList.add("details");
  const taskDetails = document.createElement("div");
  taskDetails.classList.add("task-details");

  const description = document.createElement("p");
  description.textContent = taskObj.description;

  const priority = document.createElement("p")
  priority.textContent = `Priority: ${taskObj.priority}`;


  const editButtonContainer = document.createElement("div");
  editButtonContainer.classList.add("edit-button-container");

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.textContent = "edit";

  const dueDate = document.createElement("p");
  const date =  taskObj.dueDate.split("-");
  dueDate.textContent = `DueDate: ${date[2]+"-"+ date[1]+"-"+date[0]}`;


  taskDetails.append(description, priority, dueDate);
  editButtonContainer.append(editButton);
  details.append(taskDetails, editButtonContainer);
  return details;
}

// function to add tasks into the DOM 
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

    const headSection = createTaskHead(filteredTodoStore[i]);
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
    // re-render 
    taskDiv.classList.remove("expanded");
    taskDiv.innerHTML = "";

    const headSection = createTaskHead(todoStore[taskIdx]);
    taskDiv.append(headSection);
  } else {
    taskDiv.classList.add("expanded");
    taskDiv.innerHTML = "";

    const headSection = createTaskHead(todoStore[taskIdx]);
    const details = createTaskDetails(todoStore[taskIdx]);

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

export function onClickEdit(taskId) {
  const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  const projectId = todoStore[taskIdx].projectId;
  if (document.querySelector(".task-form")) return; // prevent multiple forms
  const todoContainer = document.querySelector(".todo-container");

  const headingWrapper = document.createElement("div");
  headingWrapper.className = "heading-wrapper";

  const heading = document.createElement("h2");
  heading.textContent = "Edit Task";
  heading.className = "task-form-heading";


  const form = document.createElement("form");
  form.className = "task-form";

  // Task title input
  const taskTitle = document.createElement("input");
  taskTitle.type = "text";
  taskTitle.placeholder = "Task Title";
  taskTitle.className = "task-title-input";
  taskTitle.value = todoStore[taskIdx].title;

  // Description textarea
  const description = document.createElement("textarea");
  description.placeholder = "Description...";
  description.className = "task-desc-textarea";
  description.value = todoStore[taskIdx].description;

  const priorityDiv = document.createElement("div");
  priorityDiv.className = "priority-wrapper";

  const priorityLabel = document.createElement("label");
  priorityLabel.htmlFor = "priorityDropdown";
  priorityLabel.textContent = "Priority:";
  priorityLabel.className = "priority-label";

  // Priority dropdown
  const priority = document.createElement("select");
  priority.id = "priorityDropdown";
  priority.className = "priority-dropdown";

  const priorityData = ["low", "medium", "high"];
  priorityData.forEach(level => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    priority.appendChild(option);
  });
  priority.value = todoStore[taskIdx].priority;

  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(priority);

  // Due date
  const dateInputWrapper = document.createElement("div");
  dateInputWrapper.className = "duedate-wrapper";

  const dateInputLabel = document.createElement("label");
  dateInputLabel.htmlFor = "duedate-label";
  dateInputLabel.textContent = "Due Date: ";
  dateInputLabel.className = "duedate-label";

  const currentDueDate = new Date(todoStore[taskIdx].dueDate);
  const formattedDate = format(currentDueDate, "yyyy-MM-dd");

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "due-date";
  dateInput.className = "due-date";
  dateInput.name = "dueDate";
  dateInput.value = formattedDate;

  dateInputWrapper.append(dateInputLabel,dateInput);

  // Submit button
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Edit Task";
  saveButton.className = "task-submit-btn";

  const closeTaskButton = document.createElement("button");
  closeTaskButton.type = "button";
  closeTaskButton.textContent = "X";
  closeTaskButton.className = "close-task-btn";

  headingWrapper.append(heading, closeTaskButton)

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
   
    todoStore[taskIdx].title = taskTitle.value;
    todoStore[taskIdx].description = description.value;
    todoStore[taskIdx].priority = priority.value;
    todoStore[taskIdx].dueDate = dueDate.value;

    if (projectId !== "all-task-list" && projectId !== "completed-task-list") addTask(projectId);
    // console.log(todoList);

    cleanup(); // remove listener
    form.remove(); // remove form after adding
  });

  // Append everything to form
  form.append(headingWrapper, taskTitle, description, priorityDiv, dateInputWrapper, saveButton);

  // Add form to container
  todoContainer.appendChild(form);

  // Close form when clicking outside 
  const handleClickOutside = (e) => {
    if (!form.contains(e.target) && !todoContainer.contains(e.target)) {
      cleanup();
      form.remove();
    }
  };

  const cleanup = () => {
    document.removeEventListener("click", handleClickOutside);
  };

  document.addEventListener("click", handleClickOutside);

  closeTaskButton.addEventListener("click", () => {
    form.remove(); // removes the form
  });
}