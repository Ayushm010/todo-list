import { addProject } from "./addProjects";
import { createProjectForm } from "./projectForm";
import { onClickProject } from "./onClickProject";

export function allProjects() {
    const projectContainer = document.querySelector(".projects-list");
    let projectArr = [];
    const showButton = document.querySelector(".add-project-btn");
    showButton.addEventListener("click", () => {  //When we click the "+Add Project" button
        createProjectForm(projectArr);
        console.log(projectArr);
    });

    projectContainer.innerHTML = "";// clears all the previous projects to re-render
    for (let i = 0; i < projectArr.length; i++) {
        addProject(i,projectArr);
    }

   projectContainer.addEventListener("click", (event) => {//Adds event listener to each div inside the projectContainer
    if (event.target.classList.contains("project")) {
        onClickProject(projectArr,event.target.id);
      console.log("Clicked child ID:", event.target.id);
    }
  });
}