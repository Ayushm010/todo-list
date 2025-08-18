import { addProject } from "./addProjects";
export function createProjectForm() {
   const dialog = document.querySelector("dialog");
    const showButton = document.querySelector(".project-btn");
    const addButton = document.querySelector(".add-btn");
    const closeButton = document.querySelector(".close-btn");

    // Show the dialog box
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    addButton.addEventListener("click",()=>{
        const inputElement = document.querySelector("#project-name");
        const projectName = inputElement.value;
        console.log(projectName);
        //This should add the project to the Projects div
        addProject(projectName);
        dialog.close();
    });

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
        dialog.close();
    });
}