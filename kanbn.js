
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