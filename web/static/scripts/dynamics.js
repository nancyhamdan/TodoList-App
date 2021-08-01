// do event delegation instead of manual event handling

// Tasks container functionalities
document.getElementById('add-btn').addEventListener('click', showAddTaskPopUp);
document.getElementById('add-modal-close').addEventListener('click', hideAddTaskPopUp);
document.getElementById('add-modal-cancel').addEventListener('click', hideAddTaskPopUp);

function showAddTaskPopUp() {
    document.getElementById('add-modal').style.display = "flex";
}

function hideAddTaskPopUp(event) {
    document.getElementById('add-modal').style.display = "none";
    if (event.target.classList.contains('close') == true) {
        resetForm(document.getElementById('add-task-form'));
    }
}

function getModalFields(modal) {
    return {
        taskDesc: modal.querySelector('.modal-input[type="text"]'),
        dueDate: modal.querySelector('.modal-input[type="date"]'),
        isToday: modal.querySelector('.fa-sun'),
        isImp: modal.querySelector('.fa-star')
    }
}

function resetForm(form) {
    let fields = getModalFields(form);

    fields.taskDesc.value = '';
    fields.dueDate.value = '';
    toggleIsToday(fields.isToday);
    toggleIsImportant(fields.isImp);
}

// Task functionalities
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

document.getElementById('update-btn').addEventListener('click', showUpdateTaskPopUp);
document.getElementById('update-modal-close').addEventListener('click', hideUpdateTaskPopUp);
document.getElementById('update-modal-cancel').addEventListener('click', hideUpdateTaskPopUp);

function showUpdateTaskPopUp() {
    document.getElementById('update-modal').style.display = "flex";
}

function hideUpdateTaskPopUp() {
    console.log("hide update pop up");
    document.getElementById('update-modal').style.display = "none";
}

document.getElementById('delete-btn').addEventListener('click', showDeleteTaskPopUp);
document.getElementById('delete-modal-close').addEventListener('click', hideDeleteTaskPopUp);
document.getElementById('delete-modal-cancel').addEventListener('click', hideDeleteTaskPopUp);

function showDeleteTaskPopUp() {
    document.getElementById('delete-modal').style.display = "flex";
}

function hideDeleteTaskPopUp() {
    document.getElementById('delete-modal').style.display = "none";
}

function toggleTaskComplete() {
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

function toggleIsToday(icon) {
    icon.classList.contains('today') == true ? icon.classList.remove('today') : icon.classList.add('today');
}

function toggleIsImportant(icon) {
    icon.classList.contains('important') == true ? icon.classList.remove('important') : icon.classList.add('important');
}

// for buttons in the modals
let addToTodayButtons = document.getElementsByClassName("modal-today-icon");
for (let i = 0; i < addToTodayButtons.length; i++) {
    addToTodayButtons[i].addEventListener('click', function() {
        toggleIsToday(this.querySelector('.fa-sun'));
    });
}

let markImpButtons = document.getElementsByClassName("modal-star-icon");
for (let i = 0; i < addToTodayButtons.length; i++) {
    markImpButtons[i].addEventListener('click', function() {
        toggleIsImportant(this.querySelector('.fa-star'));
    });
}

function showAddTask(task) {
    let html = '<div class="task-container flexbox">';
    html += '<a class="fa fa-circle icon complete-circle"></a>';
    html += '<div class="task-text">';
    html += '<div class="task-desc">' + task.taskDesc + '</div>';
    html += '<div class="task-dueDate">' + task.dueDate + '</div>';
    html += '</div>';
    html += '<a class="fa fa-star icon important-star"></a>';
    html += '</div>';

    console.log(document.getElementsByClassName('uncompleted-tasks')[0]);
    document.getElementsByClassName('uncompleted-tasks')[0].innerHTML += html;
}