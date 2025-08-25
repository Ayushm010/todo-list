import "./style.css";
import { allProjects } from "./projects";
import { todoStore } from "./todoStore";
import { createTodoList } from "./todoList";

allProjects();

const allTask = document.querySelector("#all-task-list");

allTask.addEventListener("click", () => {
    const addTaskButton = document.querySelector(".add-task");
    addTaskButton.classList.add("disabled");
    const projectName = document.querySelector(".project-name");
    projectName.textContent = "All Tasks";
    console.log(allTask.id);
    createTodoList(allTask.id);
});

const completedTask = document.querySelector("#completed-task-list");

completedTask.addEventListener("click",()=>{
 const projectName = document.querySelector(".project-name");
    projectName.textContent = "Completed";
    console.log(completedTask.id);
    createTodoList(completedTask.id);
});