import { createProjectForm } from "./projectForm";
let projectArr = [];

export function allProjects() {
    const showButton = document.querySelector(".add-project-btn");
    showButton.addEventListener("click", () => {  //When we click the "+Add Project" button
      
        createProjectForm(projectArr);
        console.log(projectArr);
    });
}