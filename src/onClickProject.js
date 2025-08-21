 export function onClickProject(projectArr,projectId){
    //here we can display all the todos form the project inside the main container
    const idx = projectArr.findIndex(project =>project.projectId === projectId);
    console.log(idx);
 }