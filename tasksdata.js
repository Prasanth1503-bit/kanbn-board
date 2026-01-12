

export const toDoTasksData =
    JSON.parse(localStorage.getItem('toDoTasksData')) || []
export const inProgressTasksData = 
    JSON.parse(localStorage.getItem('inProgressTasksData')) || []

export const doneTasksData = 
    JSON.parse(localStorage.getItem('doneTasksData')) || []

export function addToLocal() {
    localStorage.setItem('toDoTasksData', JSON.stringify(toDoTasksData))
    localStorage.setItem('inProgressTasksData', JSON.stringify(inProgressTasksData))
    localStorage.setItem('doneTasksData', JSON.stringify(doneTasksData))
   
}
