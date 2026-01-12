import { toDoTasksData, inProgressTasksData, doneTasksData, addToLocal } from "./tasksdata.js";
const filterButton = document.getElementById('filter-button');
const filterTasks = document.getElementById('filter-tasks');
let idSetter = JSON.parse(localStorage.getItem('idSetter')) || 0;
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
        taskBox += `<div  draggable="true" class=" task-box" id="${task.id}" data-task-type="${task.type}">
            <p>${task.name}</p>
            <p> ${task.date}</p>
        </div>`
    })
    return taskBox;
}
const toDoTasksBar = document.querySelector('.to-do');
const inProgressTasksBar = document.querySelector('.in-progress');
const doneTasksBar = document.querySelector('.done');
function renderAllTasks() {
    toDoTasksBar.innerHTML = renderTasks(toDoTasksData);
    inProgressTasksBar.innerHTML = renderTasks(inProgressTasksData);
    doneTasksBar.innerHTML = renderTasks(doneTasksData);
}
function swapTasks(tasktype, id1, id2) {
    const fromId = tasktype.findIndex((task) => (task.id == id1))
    const toId = tasktype.findIndex((tasks) => (tasks.id == id2))
    if (fromId == -1 || toId == -1 || fromId == null || toId == null) return
    const f = tasktype[fromId]
    tasktype[fromId] = tasktype[toId]
    tasktype[toId] = f
}
function updateArray(fromtask, totask, id1, id2, type) {
    const fromId = fromtask.findIndex((task) => (task.id == id1))
    const toId = totask.findIndex((task) => (task.id == id2))
    const data = fromtask[fromId]
    if (toId == null || toId == -1) {
        console.log('add to end')
        data.type = type
        fromtask.splice(fromId, 1)
        totask.push(data)
        return
    }
    else if (fromId == -1 || fromId == null) {
        console.log('error')
        return
    }

    console.log(fromId)
    console.log(toId)
    data.type = type
    fromtask.splice(fromId, 1)
    totask.splice(toId, 0, data)

}
function updateArrayatEnd(fromtask, totask, id1, type) {
    const fromId = fromtask.findIndex((task) => (task.id == id1))
    //  const toId = totask.findIndex((task) => (task.id == id2))
    if (fromId == -1 || fromId == null) {
        console.log('error')
        return
    }
    const data = fromtask[fromId]
    console.log('add to end')
    data.type = type
    fromtask.splice(fromId, 1)
    totask.push(data)

}

renderAllTasks();
const taskInput = document.querySelector('.task-input')
const doButton = document.querySelector('.do-button')
const taskValue = document.querySelector('.input')
let data = null
document.querySelectorAll('.add-task-button').forEach((each) => {
    each.addEventListener('click', () => {
        taskInput.classList.toggle('show')

        data = each.classList[1]
    })
})

doButton.addEventListener('click', () => {
    let dataType = data == 'in-progress-add-button' ? inProgressTasksData : data == 'do-task-add-button' ? toDoTasksData : doneTasksData
    let type = data == 'in-progress-add-button' ? 'in-progress' : data == 'do-task-add-button' ? 'to-do' : 'done'
    dataType.push({
        id: idSetter++,
        type: type,
        name: `${taskValue.value}`,
        date: new Date().toLocaleDateString()

    })
    taskInput.classList.toggle('show')
    taskValue.value = ''
    renderAllTasks()
    addToLocal()
    localStorage.setItem('idSetter', JSON.stringify(idSetter))


})
