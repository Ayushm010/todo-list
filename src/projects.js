import { createProjectForm } from "./ProjectForm";
import { createTodoList } from "./todoList";
import { projectArr } from "./todoStore";  // 

// function to create project object
export function createProject() {
  return {
    projectName: "",
    taskIds: [],
    projectId: crypto.randomUUID(), 
  };
}

// function to add project to sidebar
export function addProject(newProject) {
  const projectContainer = document.querySelector(".projects-list");
  const project = document.createElement("div");
  project.textContent = newProject.projectName;
  project.classList.add("project");
  project.id = newProject.projectId;
  projectContainer.appendChild(project);
}

// when project is clicked from sidebar
export function onClickProject(projectArr, projectId){
  const projectIdx = projectArr.findIndex(project => project.projectId === projectId);
  if (projectIdx === -1) return;

  const projectName = document.querySelector(".project-name");
  projectName.textContent = projectArr[projectIdx].projectName;
  
  createTodoList(projectArr, projectId);
}

// Main projects initializer
export function allProjects() {
  const projectContainer = document.querySelector(".projects-list");
  if (!projectContainer) return;

  // Load default projects into sidebar
  projectArr.forEach(p => addProject(p));

  const showButton = document.querySelector(".add-project-btn");
  showButton.addEventListener("click", () => {
    createProjectForm(projectArr);
  });

  projectContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("project")) {
      onClickProject(projectArr, event.target.id);
    }
  });
}
