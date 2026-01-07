import { toDoTasksData, inProgressTasksData, doneTasksData } from "./tasksdata.js";
const filterButton = document.getElementById('filter-button');
const filterTasks = document.getElementById('filter-tasks');

filterButton
    .addEventListener('click', () => {
        filterTasks.style.display = filterTasks.style.display === 'none' ? 'block' : 'none';
    }
    );
filterTasks.querySelectorAll('button').forEach(item => {
    item.addEventListener('click', event => {
        filterButton.innerText = item.innerText + ' ▼';
        filterTasks.style.display = 'none';

    });
});
window.onclick = function (event) {
    if (!filterButton.contains(event.target) && !filterTasks.contains(event.target)) {
        filterTasks.style.display = 'none';
    }
}



document.querySelector('#theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});
function renderTasks(taskType) {
    let taskBox = '';
   taskType.forEach((task) => {
        taskBox += `<div class=" task-box">
            <p>${task.name}</p>
            <p> ${task.date}</p>
        </div>`
    })
    return taskBox;
}
function addTaskButton(taskType,tasksdata,taskbar){
         taskType.addEventListener('click', () => {
    tasksdata.push({name:"Buy groceries",
        date:"jan 6 2026"})
    taskbar.innerHTML = renderTasks(tasksdata);
});
}

const toDoTasksBar = document.querySelector('.to-do');
const inProgressTasksBar = document.querySelector('.in-progress');
const doneTasksBar = document.querySelector('.done');
toDoTasksBar.innerHTML = renderTasks(toDoTasksData);
inProgressTasksBar.innerHTML = renderTasks(inProgressTasksData);
doneTasksBar.innerHTML = renderTasks(doneTasksData);
const toDoAddButton = document.querySelector('.do-task-add-button');
const inProgressAddButton = document.querySelector('.in-progress-add-button');
const doneAddButton = document.querySelector('.done-add-button');
addTaskButton(toDoAddButton,toDoTasksData,toDoTasksBar);
addTaskButton(inProgressAddButton,inProgressTasksData,inProgressTasksBar);
addTaskButton(doneAddButton,doneTasksData,doneTasksBar);   
 