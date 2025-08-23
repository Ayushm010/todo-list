import { addTask } from "./tasks";
import { createTaskForm } from "./taskForm";
import { todoStore } from "./todoStore";

export function createTodoList( projectId) {

    const openForm = document.querySelector(".task-form");
    if (openForm) openForm.remove();

    const showButton = document.querySelector(".add-task");

    showButton.onclick = () => {
        console.log("Clicked for project:", projectId);
        createTaskForm(todoStore, projectId);
    };

    addTask(projectId);

    

}
