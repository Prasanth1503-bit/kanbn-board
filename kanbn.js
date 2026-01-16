import {
  toDoTasksData,
  inProgressTasksData,
  doneTasksData,
  addToLocal,
} from "./tasksdata.js";
const filterButton = document.getElementById("filter-button");
const filterTasks = document.getElementById("filter-tasks");
let idSetter = JSON.parse(localStorage.getItem("idSetter")) || 0;
filterButton.addEventListener("click", () => {
  filterTasks.style.display =
    filterTasks.style.display === "none" ? "block" : "none";
});
filterTasks.querySelectorAll("button").forEach((item) => {
  item.addEventListener("click", (event) => {
    filterButton.innerText = item.innerText + " ▼";
    filterTasks.style.display = "none";
  });
});
window.onclick = function (event) {
  if (
    !filterButton.contains(event.target) &&
    !filterTasks.contains(event.target)
  ) {
    filterTasks.style.display = "none";
  }
};
const toDoButton=document.querySelector('.todobutton');
const inProgressButton=document.querySelector('.inprogressbutton');
const doneButton=document.querySelector('.donebutton');
const alltasksButton=document.querySelector('.allTasksbutton')
const progrssBlock=document.querySelector('.in-progress-block')
const doBlock=document.querySelector('.to-do-block')
const doneBlock=document.querySelector('.done-block')
alltasksButton.addEventListener('click',()=>{
    progrssBlock.style.display='';
    doBlock.style.display=''
    doneBlock.style.display=''
})
toDoButton.addEventListener('click',()=>{
     doBlock.style.display=''
    progrssBlock.style.display='none';
    doneBlock.style.display='none'
})
inProgressButton.addEventListener('click',()=>{
     progrssBlock.style.display='';
    doneBlock.style.display='none';
    doBlock.style.display='none'
})
doneButton.addEventListener('click',()=>{
     doneBlock.style.display=''
    progrssBlock.style.display='none';
    doBlock.style.display='none'
})

document.querySelector("#theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
function renderTasks(taskType) {
  let taskBox = "";
  taskType.forEach((task) => {
    taskBox += `<div  draggable="true" class=" task-box" id="${task.id}" data-task-type="${task.type}">
            <p>${task.name}</p>
            <p> ${task.date}</p>
        </div>`;
  });
  return taskBox;
}
const toDoTasksBar = document.querySelector(".to-do");
const inProgressTasksBar = document.querySelector(".in-progress");
const doneTasksBar = document.querySelector(".done");
function renderAllTasks() {
  toDoTasksBar.innerHTML = renderTasks(toDoTasksData);
  inProgressTasksBar.innerHTML = renderTasks(inProgressTasksData);
  doneTasksBar.innerHTML = renderTasks(doneTasksData);
}

renderAllTasks();
const taskInput = document.querySelector(".task-input");
const doButton = document.querySelector(".do-button");
const taskValue = document.querySelector(".input");
let data = null;
document.querySelectorAll(".add-task-button").forEach((each) => {
  each.addEventListener("click", () => {
    taskInput.classList.toggle("show");
    taskValue.value = "";
    taskValue.focus();
    data = each.classList[1];
  });
});

doButton.addEventListener("click", () => {
  let dataType =
    data == "in-progress-add-button"
      ? inProgressTasksData
      : data == "do-task-add-button"
      ? toDoTasksData
      : doneTasksData;
  let type =
    data == "in-progress-add-button"
      ? "in-progress"
      : data == "do-task-add-button"
      ? "to-do"
      : "done";
  dataType.push({
    id: idSetter++,
    type: type,
    name: `${taskValue.value}`,
    date: new Date().toLocaleDateString(),
  });
  taskInput.classList.toggle("show");
  taskValue.value = "";
  renderAllTasks();
  addToLocal();
  localStorage.setItem("idSetter", JSON.stringify(idSetter));
});
const placeholder = document.createElement("div");
placeholder.classList.add("divelement");
document.querySelectorAll(".colums").forEach((contianer) => {
  contianer.addEventListener("dragstart", (e) => {
    const task = e.target.closest(".task-box");
    task.style.opacity = 0.5;
    const fromData = {
      id: task.id,
      type: task.dataset.taskType,
    };

    e.dataTransfer.setData("application/json", JSON.stringify(fromData));
  });
  contianer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const task = e.target.closest(".task-box");
    if (task && !task.classList.contains("dragovers")) {
      task.classList.add("dragovers");
    }
    if (!task) return;
    const rect = task.getBoundingClientRect();
    const offset = e.clientY - rect.top;
     const isAfter = offset > rect.height / 2;

  if (isAfter) {
    if (task.nextSibling !== placeholder) {
      task.after(placeholder);
    }
  } else {
    if (task.previousSibling !== placeholder) {
      task.before(placeholder);
    }
  }
  });
  contianer.addEventListener("dragleave", (e) => {
    const task = e.target.closest(".task-box");
    e.preventDefault();
    if (task && task.classList.contains("dragovers")) {
      task.classList.remove("dragovers");
    }
  
  });

  contianer.addEventListener("drop", (e) => {
    e.preventDefault();
    const fromData = JSON.parse(e.dataTransfer.getData("application/json"));
    const task = e.target.closest(".task-box");
    if (task == null) {
      const d = contianer.children[1].children[0].dataset.dataType;
      addatend(fromData.type, d, fromData.id);
      addToLocal();
      renderAllTasks();
      return;
    }
    const toData = {
      id: task.id,
      type: task.dataset.taskType,
    };
      if (placeholder.parentNode) {
      placeholder.remove();
    }
    const rect = task.getBoundingClientRect();
    const offset = e.clientY - rect.top;

    if (fromData.type === toData.type) {
      swap(fromData.type, fromData.id, toData.id);
    } else {
      if (offset > rect.height / 2) {
        addToAnotherAfter(fromData.type, toData.type, fromData.id, toData.id);
      } else {
        addToAnother(fromData.type, toData.type, fromData.id, toData.id);
      }
    }
    addToLocal();
    renderAllTasks();
  });
  contianer.addEventListener("dragend", (e) => {
    e.preventDefault();
    //  draggedTask.style.opacity = 1;

    //  draggedTask = null;
      if (placeholder.parentNode) {
      placeholder.remove();
    }
  });
});
function swap(type, id1, id2) {
  const data =
    type === "in-progress"
      ? inProgressTasksData
      : type === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const fromid = data.findIndex((task) => task.id == id1);
  const toid = data.findIndex((task) => task.id == id2);
  if (fromid == null || toid == null) return;
  const from = data[fromid];
  data[fromid] = data[toid];
  data[toid] = from;
}
function addToAnother(fromtype, totype, id1, id2) {
  const fromdata =
    fromtype === "in-progress"
      ? inProgressTasksData
      : fromtype === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const todata =
    totype === "in-progress"
      ? inProgressTasksData
      : totype === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const fromid = fromdata.findIndex((task) => task.id == id1);
  const toid = todata.findIndex((task) => task.id == id2);
  if (fromid == null || toid == null) return;
  const to = todata[0];
  const from = fromdata[fromid];
  from.type = to.type;
  fromdata.splice(fromid, 1);
  todata.splice(toid, 0, from);
}
function addToAnotherAfter(fromtype, totype, id1, id2) {
  const fromdata =
    fromtype === "in-progress"
      ? inProgressTasksData
      : fromtype === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const todata =
    totype === "in-progress"
      ? inProgressTasksData
      : totype === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const fromid = fromdata.findIndex((task) => task.id == id1);
  const toid = todata.findIndex((task) => task.id == id2);
  const toids = toid + 1;
  if (fromid == null || toids == null) return;
  const to = todata[0];
  const from = fromdata[fromid];
  from.type = to.type;
  fromdata.splice(fromid, 1);
  todata.splice(toids, 0, from);
}
function addatend(fromtype, totype, id1) {
  const fromdata =
    fromtype === "in-progress"
      ? inProgressTasksData
      : fromtype === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const todata =
    totype === "in-progress"
      ? inProgressTasksData
      : totype === "to-do"
      ? toDoTasksData
      : doneTasksData;
  const fromid = fromdata.findIndex((task) => task.id == id1);
  if (fromid == null) return;
  const from = fromdata[fromid];
  from.type = totype;
  fromdata.splice(fromid, 1);
  todata.push(from);
}
