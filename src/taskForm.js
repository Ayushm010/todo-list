// createTaskForm.js
import { addTask, createTask } from "./tasks";
import { format } from 'date-fns';

export function createTaskForm(todoList, projectId) {
    if (document.querySelector(".task-form")) return; // prevent multiple forms
    const todoContainer = document.querySelector(".todo-container");

    const form = document.createElement("form");
    form.className = "task-form";

    // Heading
    const headingWrapper = document.createElement("div");
    headingWrapper.className = "heading-wrapper";

    const heading = document.createElement("h2");
    heading.textContent = "New Task";
    heading.className = "task-form-heading";

    // Task title input
    const taskTitle = document.createElement("input");
    taskTitle.type = "text";
    taskTitle.placeholder = "Task Title";
    taskTitle.required = true;
    taskTitle.className = "task-title-input";

    // Description textarea
    const description = document.createElement("textarea");
    description.placeholder = "Description...";
    description.required = true;
    description.className = "task-desc-textarea";

    // Priority wrapper div
    const priorityDiv = document.createElement("div");
    priorityDiv.className = "priority-wrapper";

    const priorityLabel = document.createElement("label");
    priorityLabel.htmlFor = "priorityDropdown";
    priorityLabel.textContent = "Priority:";
    priorityLabel.className = "priority-label";

    // Priority dropdown
    const priority = document.createElement("select");
    priority.id = "priorityDropdown";
    priority.className = "priority-dropdown";

    const priorityData = ["low", "medium", "high"];
    priorityData.forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
        priority.appendChild(option);
    });

    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(priority);

    // Due Date

    const dateInputWrapper = document.createElement("div");
    dateInputWrapper.className = "duedate-wrapper";

    const dateInputLabel = document.createElement("label");
    dateInputLabel.htmlFor = "duedate-label";
    dateInputLabel.textContent = "Due Date: ";
    dateInputLabel.className = "duedate-label";

    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "dueDate";
    dateInput.className = "due-date";
    dateInput.name = "due-date";
    dateInput.value = formattedDate;
    dateInputWrapper.append(dateInputLabel, dateInput);

    // Submit button
    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "+ Add Task";
    saveButton.className = "task-submit-btn";

    const closeTaskButton = document.createElement("button");
    closeTaskButton.type = "button";
    closeTaskButton.textContent = "X";
    closeTaskButton.className = "close-task-btn";

    headingWrapper.append(heading, closeTaskButton)

    // Form submit handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = createTask(
            taskTitle.value,
            description.value,
            priority.value,
            dateInput.value,
            projectId,
            crypto.randomUUID()
        );
        todoList.push(newTask);
        localStorage.setItem("todoStore", JSON.stringify(todoList)); // save tasks

        if (projectId !== "all-task-list" && projectId !== "completed-task-list")
            addTask(projectId);

        cleanup(); // remove listener
        form.remove(); // remove form after adding
    });

    // Append everything to form
    form.append(headingWrapper, taskTitle, description, priorityDiv, dateInputWrapper, saveButton);

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

    closeTaskButton.addEventListener("click", () => {
        form.remove(); // removes the form
    });
}
