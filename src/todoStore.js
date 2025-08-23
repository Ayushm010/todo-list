// store/todoStore.js

// Shared array of todos for ALL projects
export const todoStore = [];

// Shared array of projects (default ones included)
export const projectArr = [
  {
    projectName: "Personal",
    taskIds: [],
    projectId: "default-project-1",
  },
  {
    projectName: "Work",
    taskIds: [],
    projectId: "default-project-2",
  }
];

// Add some default tasks
todoStore.push(
  {
    title: "Buy groceries",
    description: "Milk, Eggs, Bread, and Fruits",
    priority: "medium",
    checklist: false,
    projectId: "default-project-1",
    taskId: "default-task-1.1"
  },
  {
    title: "Morning workout",
    description: "30 minutes cardio",
    priority: "high",
    checklist: false,
    projectId: "default-project-1",
    taskId: "default-task-1.2"
  },
  {
    title: "Finish report",
    description: "Prepare quarterly report for meeting",
    priority: "high",
    checklist: false,
    projectId: "default-project-2",
    taskId: "default-task-2.1"
  }
);
