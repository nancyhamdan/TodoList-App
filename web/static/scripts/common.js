document.getElementById('add-btn').addEventListener('click', showAddTaskPopUp);
document.getElementById('add-modal-close').addEventListener('click', hideAddTaskPopUp);
document.getElementById('add-modal-cancel').addEventListener('click', hideAddTaskPopUp);

document.getElementById('update-btn').addEventListener('click', showUpdateTaskPopUp);
document.getElementById('update-modal-close').addEventListener('click', hideUpdateTaskPopUp);
document.getElementById('update-modal-cancel').addEventListener('click', hideUpdateTaskPopUp);

document.getElementById('delete-btn').addEventListener('click', showDeleteTaskPopUp);
document.getElementById('delete-modal-close').addEventListener('click', hideDeleteTaskPopUp);
document.getElementById('delete-modal-cancel').addEventListener('click', hideDeleteTaskPopUp);

function showAddTaskPopUp() {
    document.getElementById('add-modal').style.display = "flex";
}

function hideAddTaskPopUp(event) {
    document.getElementById('add-modal').style.display = "none";
    if (event.target.classList.contains('close') == true) {
        document.getElementById('add-task-form').reset();
    }
}

function showDeleteTaskPopUp() {
    document.getElementById('delete-modal').style.display = "flex";
}

function hideDeleteTaskPopUp() {
    document.getElementById('delete-modal').style.display = "none";
}

function showUpdateTaskPopUp() {
    document.getElementById('update-modal').style.display = "flex";
}

function hideUpdateTaskPopUp() {
    console.log("hide update pop up");
    document.getElementById('update-modal').style.display = "none";
}

let selectedTask;

let tasks = document.getElementsByClassName("task-container");
for (let i = 0; i < tasks.length; i++) {
    tasks[i].addEventListener("click", selectTask);
}

function selectTask() {
    deselectOtherTasks(this);

    this.style.border = "thick solid rgb(212, 96, 64)";
    showButtons();

    selectedTask = this;
    let desc = selectedTask.querySelector('.task-desc');
    console.log("task desc:", desc.innerHTML);
}

function deselectOtherTasks(task) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] != task) {
            tasks[i].style.border = 'none';
        }
    }
}

function showButtons() {
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("delete-btn").style.display = "block";
}

function hideButtons() {
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("delete-btn").style.display = "none";
}

window.onclick = function(event) {
    if (event.target.className.includes('task-') != true && event.target.className.includes('modal') != true && event.target.className.includes('button') != true && event.target.className.includes('close') != true) {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.border = 'none';
            hideButtons();
        }
    }

    if (event.target.classList.contains('modal')) {
        hideAddTaskPopUp(event);
        hideUpdateTaskPopUp();
        hideDeleteTaskPopUp();
    }
}

let completeButtons = document.getElementsByClassName("complete-circle");
for (let i = 0; i < completeButtons.length; i++) {
    completeButtons[i].addEventListener("click", clickCompleteTask);
}

function clickCompleteTask() {
    let uncompletedTasks = document.getElementsByClassName("uncompleted-tasks")[0];
    let completedTasks = document.getElementsByClassName("completed-tasks")[0];
    if (this.classList.contains('checked')) {
        completedTasks.removeChild(this.parentNode);
        if (completedTasks.children.length == 1) {
            document.getElementById('completed-div').style.display = 'none';
        }
        uncompletedTasks.appendChild(this.parentNode);

        this.classList.replace('fa-check-circle', 'fa-circle');
        this.classList.remove("checked");
    } else {
        document.getElementById('completed-div').style.display = 'flex';
        uncompletedTasks.removeChild(this.parentNode);
        completedTasks.appendChild(this.parentNode);

        this.classList.replace('fa-circle', 'fa-check-circle');
        this.classList.add("checked");
    }
}

let starButtons = document.getElementsByClassName("important-star");
for (let i = 0; i < starButtons.length; i++) {
    starButtons[i].addEventListener("click", clickStarTask);
}

function clickStarTask() {
    if (this.classList.contains('important')) {
        this.classList.remove('important');
    } else {
        this.classList.add('important');
    }
}

let addToTodayButtons = document.getElementsByClassName("modal-today-icon");
for (let i = 0; i < addToTodayButtons.length; i++) {
    addToTodayButtons[i].addEventListener('click', clickAddToToday);
}

function clickAddToToday() {
    let icon = this.querySelector('.fa-sun');
    if (icon.classList.contains('today')) {
        icon.classList.remove('today');
    } else {
        icon.classList.add('today');
    }
}

let markImpButtons = document.getElementsByClassName("modal-star-icon");
for (let i = 0; i < addToTodayButtons.length; i++) {
    markImpButtons[i].addEventListener('click', clickMarkImp);
}

function clickMarkImp() {
    let icon = this.querySelector('.fa-star');
    if (icon.classList.contains('important')) {
        icon.classList.remove('important');
    } else {
        icon.classList.add('important');
    }
}