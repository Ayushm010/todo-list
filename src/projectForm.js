import { addProject, createProject } from "./projects";

export function createProjectForm(projectArr) {
  if (document.querySelector(".project-form")) return; // This will prevent multiple forms from opening at the same time

  const sidebar = document.querySelector(".sidebar");

  // Create the form
  const form = document.createElement("form");
  form.classList.add("project-form");

  // Heading
  const heading = document.createElement("h2");
  heading.textContent = "New Project";
  heading.className = "project-form-heading";

  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Project name";
  inputElement.className = "input-element"

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add";
  addButton.className = "project-submit-btn";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.textContent = "Close";
  closeButton.className = "close-btn";

  form.append(heading, inputElement, addButton, closeButton);
  sidebar.appendChild(form); // appends to the sidebar

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newProject = createProject();// creates object for newproject

    if (inputElement.value.trim() === "") return;// prevents from adding to the array if the input is empty

    newProject.projectName = inputElement.value.trim();// trims all the white spaces

    projectArr.push(newProject);

    addProject(newProject);// calls the addProject function which adds the newProject to the sidebar

    form.remove(); //  remove form after adding

  });

  // Handle close
  closeButton.addEventListener("click", () => {
    form.remove(); // removes the form
  });
}
