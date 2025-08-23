import { todoStore ,projectArr} from "./todoStore";

// function to create a new task object
export function createTask(title, description, priority, checklist, projectId) {
    return {
        title: title,
        description: description,
        priority: priority,
        checklist: checklist,
        projectId: projectId,
        taskId:crypto.randomUUID,
    };
}

// function to add tasks into the DOM grid
export function addTask(projectId,taskId) {
    const taskGrid = document.querySelector(".task-grid");
    taskGrid.innerHTML = "";

    const filteredTodoStore = todoStore.filter(todo => todo.projectId === projectId);

    for (let i = 0; i < filteredTodoStore.length; i++) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.id = todoStore[i].taskId;

        const taskName = document.createElement("p");
        taskName.textContent = filteredTodoStore[i].title;

        const removeTaskButton = document.createElement("button");
        removeTaskButton.classList.add("remove-task-button");
        removeTaskButton.textContent = "X";

        task.append(taskName,removeTaskButton);
        taskGrid.appendChild(task);
        console.log(filteredTodoStore[i]);
    }
}
export function onClickTask(projectId,taskId){
  
}
export function removeTask(projectId,taskId) {// When remove task button is clicked
const taskIdx = todoStore.findIndex(task => task.taskId === taskId);
  if (taskIdx !== -1) {
    todoStore.splice(taskIdx, 1);
  }
  addTask(projectId);
}