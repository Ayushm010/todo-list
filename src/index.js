import "./style.css";
import { allProjects } from "./projects";
import { todoStore } from "./todoStore";

allProjects();

function onclickAllTask() {
    const allTask = document.querySelector("#all-task");
    const taskGrid = document.querySelector(".task-grid");
    taskGrid.innerHTML = "";

 allTask.addEventListener("click",()=>{
    
    for (let i = 0; i < todoStore.length; i++) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.id = todoStore[i].taskId;

        const headSection = document.createElement("div");
        headSection.classList.add("head-section")

        const taskName = document.createElement("p");
        taskName.textContent = todoStore[i].title;

        const removeTaskButton = document.createElement("button");
        removeTaskButton.classList.add("remove-task-button");
        removeTaskButton.textContent = "X";

        headSection.append(taskName, removeTaskButton);
        task.appendChild(headSection);
        taskGrid.appendChild(task);
    }
 });
}
onclickAllTask();