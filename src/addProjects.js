
export function addProject(newProject){
     const projectContainer = document.querySelector(".projects-list");
     const project = document.createElement("div");
     project.textContent = newProject.projectName;
     project.classList.add("project");
     project.id = newProject.projectId;
     projectContainer.appendChild(project);
}