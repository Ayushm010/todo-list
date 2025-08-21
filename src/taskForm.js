import { createTask } from "./createTask";
export function createTaskForm(todoList,projectId) {
    if (document.querySelector(".task-form")) return;
    const todoContainer = document.querySelector(".todo-container");

    const form = document.createElement("form");
    form.className = "task-form";

    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.placeholder = "Task Title"

    const description = document.createElement("input");
    description.type = "textarea";
    description.placeholder = "Description...."

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "+Add Task";

    const priority = document.createElement('select');
    priority.id = "priorityDropdown";
    const priorityData = ["low", "medium", "high"];

    // Add options 
    priorityData.forEach(level => {
        const option = document.createElement('option');
        option.value = level;   // set value attribute
        option.text = level.charAt(0).toUpperCase() + level.slice(1); // Capitalize first letter
        priority.appendChild(option);
    });
    
    const checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox")
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = "myCheckbox";
    checkbox.name = "myCheckbox?"

    const completedLabel = document.createElement('label');
    completedLabel.htmlFor = "myCheckbox";  // links label to checkbox
    completedLabel.textContent = "completed?";
    checkboxDiv.appendChild(completedLabel);
    checkboxDiv.appendChild(checkbox);


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = createTask(taskTitle.value, description.value, priority.value,checkbox.checked,projectId);
        todoList.push(newTask);
        console.log(todoList);
        form.remove(); //  remove form after adding
       
    });

    form.appendChild(taskTitle);
    form.appendChild(description);
    form.appendChild(priority);
    form.appendChild(checkboxDiv);
    form.appendChild(saveButton);
    todoContainer.appendChild(form);

}