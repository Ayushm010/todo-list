import "./style.css";
import { allProjects } from "./projects";
import { todoStore, projectArr } from "./todoStore";
import { createTodoList } from "./todoList";

// restore projectArr
if (localStorage.getItem("projectArr")) {
  projectArr.length = 0;
  projectArr.push(...JSON.parse(localStorage.getItem("projectArr")));
}

// restore todoStore
if (localStorage.getItem("todoStore")) {
  todoStore.length = 0;
  todoStore.push(...JSON.parse(localStorage.getItem("todoStore")));
}

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

//toggle theme
import lightModeIcon from "./img/light-mode.svg";
import darkModeIcon from "./img/dark-mode.svg";

const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeBtn.src = lightModeIcon;
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeBtn.src = darkModeIcon;
  }
});

// restore theme on reload
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.src = lightModeIcon;
} 

