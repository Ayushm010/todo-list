import { addTask } from "./tasks";
import { createTaskForm } from "./taskForm";
import { todoStore ,projectArr} from "./todoStore";
import { onClickTask } from "./tasks";
import { removeTask } from "./tasks";

export function createTodoList( projectId) {

    const openForm = document.querySelector(".task-form");
    if (openForm) openForm.remove();

    const showButton = document.querySelector(".add-task");

    showButton.onclick = () => {
        console.log("Clicked for project:", projectId);
        createTaskForm(todoStore, projectId);
    };

    addTask(projectId);
  const taskGrid = document.querySelector(".task-grid");
     
      taskGrid.onclick = (event) => {
        const taskDiv = event.target.closest(".task");
        if (!taskDiv) return;
    
        if (event.target.classList.contains("remove-task-button")) {
          removeTask(taskDiv.id);
        } else {
          onClickTask(taskDiv.id);
        }
      };

}
