import { createProjectForm } from "./projectForm";
import { createProject } from "./createProject";
let projectArr = [];

export function allProjects() {
    const showButton = document.querySelector(".add-project-btn");
    showButton.addEventListener("click", () => {  //When we click the "+Add Project" button
        const newProject = createProject(crypto.randomUUID());
        projectArr.push(newProject);
        console.log(newProject.projectId);


        createProjectForm(newProject);
    });
}