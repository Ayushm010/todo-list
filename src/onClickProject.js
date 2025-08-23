import { createTodoList } from "./createTodoList";
export function onClickProject(projectArr,projectId){
    //here we can display all the todos form the project inside the main container
    const projectIdx = projectArr.findIndex(project =>project.projectId === projectId);
    const projectName = document.querySelector(".project-name");
    projectName.textContent = projectArr[projectIdx].projectName;
    console.log(projectArr[projectIdx].projectName +" "+ projectId);
    
    createTodoList(projectArr,projectId);
 }