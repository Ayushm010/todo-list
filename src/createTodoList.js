import { createTaskForm } from "./taskForm";
export function createTodoList(projectArr, projectId) {
    let todoList = [];
    const showButton = document.querySelector(".add-task");
    showButton.addEventListener("click", () => {
        createTaskForm(todoList, projectId);
    });

    
    for(let i = 0;i<todoList.length;i++){
        if(projectId === i.projectId) console.log(todoList[i]);
    }
}