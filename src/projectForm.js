import { addProject } from "./addProjects";

export function createProjectForm(newProject) {
  const sidebar = document.querySelector(".sidebar"); 

  // Create the form
  const form = document.createElement("form");
  form.classList.add("project-form");

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Project name";

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";

  form.appendChild(inputElement);
  form.appendChild(addButton);
  form.appendChild(closeButton);
  sidebar.appendChild(form); // appends to the sidebar

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    newProject.projectName = inputElement.value;
    addProject(newProject);
    form.remove(); //  remove form after adding
  });

  // Handle close
  closeButton.addEventListener("click", () => {
    form.remove(); // removes the form
  });
}
