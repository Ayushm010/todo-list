import { createTodoList } from "./todoList";
import { projectArr } from "./todoStore";  // 
import { createProjectForm } from "./projectForm";
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
  project.classList.add("project");
  project.id = newProject.projectId;

  const projectName = document.createElement("p");
  projectName.textContent = newProject.projectName;

 const removeProjectButton = document.createElement("button");
 removeProjectButton.classList.add("remove-project-button");
 removeProjectButton.textContent = "X";


  project.append(projectName,removeProjectButton);
  projectContainer.appendChild(project);
}

// when project is clicked from sidebar
export function onClickProject(projectArr, projectId){
  const projectIdx = projectArr.findIndex(project => project.projectId === projectId);
  if (projectIdx === -1) return;

  const projectName = document.querySelector(".project-name");
  projectName.textContent = projectArr[projectIdx].projectName;
  
  createTodoList(projectId); // Create todo
}

// When remove project button is clicked
export function removeProject(projectId) {
  // Remove from project array
  const projectIdx = projectArr.findIndex(p => p.projectId === projectId);
  if (projectIdx !== -1) {
    projectArr.splice(projectIdx, 1);
  }

  // Remove from sidebar
  const projectElement = document.getElementById(projectId);
  if (projectElement) projectElement.remove();

  // Reset project name display
  const projectNameDisplay = document.querySelector(".project-name");
  if (projectNameDisplay) projectNameDisplay.textContent = "No project";

  // Clear task grid
  const taskGrid = document.querySelector(".task-grid");
  if (taskGrid) taskGrid.innerHTML = "";
}



// Initilizes all the projects
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
    const projectDiv = event.target.closest(".project");
    if (!projectDiv) return;

    if (event.target.classList.contains("remove-project-button")) {
      removeProject(projectDiv.id);
    } else {
      onClickProject(projectArr, projectDiv.id);
    }
  });

}

