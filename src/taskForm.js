// createTaskForm.js
import { addTask, createTask } from "./tasks";
export function createTaskForm(todoList, projectId) {
    if (document.querySelector(".task-form")) return; // prevent multiple forms
    const todoContainer = document.querySelector(".todo-container");

    const form = document.createElement("form");
    form.className = "task-form";

    // Task title input
    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.placeholder = "Task Title";

    // Description textarea
    const description = document.createElement("textarea");
    description.placeholder = "Description...";

    // Priority dropdown
    const priority = document.createElement("select");
    priority.id = "priorityDropdown";
    const priorityData = ["low", "medium", "high"];
    priorityData.forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        priority.appendChild(option);
    });

    // Checkbox for completed
    const checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "myCheckbox";
    checkbox.name = "myCheckbox";

    const completedLabel = document.createElement("label");
    completedLabel.htmlFor = "myCheckbox";
    completedLabel.textContent = "Completed?";

    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(completedLabel);

    // Submit button
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "+ Add Task";

    // Form submit handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = createTask(
            taskTitle.value,
            description.value,
            priority.value,
            checkbox.checked,
            projectId,
            crypto.randomUUID()
        );
        todoList.push(newTask);
        addTask(projectId);
       // console.log(todoList);

        form.remove(); // remove form after adding
    });

    // Append everything to form
    form.appendChild(taskTitle);
    form.appendChild(description);
    form.appendChild(priority);
    form.appendChild(checkboxDiv);
    form.appendChild(saveButton);

    // Add form to container
    todoContainer.appendChild(form);
}
