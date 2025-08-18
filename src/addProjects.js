export function addProject(projectName){
     const projectContainer = document.querySelector(".projects");
     const newProject = document.createElement("div");
     newProject.textContent = projectName;
     projectContainer.appendChild(newProject);
}