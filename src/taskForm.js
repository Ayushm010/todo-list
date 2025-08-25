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
            projectId,
            crypto.randomUUID()
        );
        todoList.push(newTask);
       if(projectId !== "all-task-list" && projectId !== "completed-task-list")  addTask(projectId);
       // console.log(todoList);

        cleanup(); // remove listener
        form.remove(); // remove form after adding
    });

    // Append everything to form
    form.appendChild(taskTitle);
    form.appendChild(description);
    form.appendChild(priority);
  //  form.appendChild(checkboxDiv);
    form.appendChild(saveButton);

    // Add form to container
    todoContainer.appendChild(form);

    // Close form when clicking outside 
    const handleClickOutside = (e) => {
        if (!form.contains(e.target) && !todoContainer.contains(e.target)) {
            cleanup();
            form.remove();
        }
    };

    const cleanup = () => {
        document.removeEventListener("click", handleClickOutside);
    };

    document.addEventListener("click", handleClickOutside);
}
