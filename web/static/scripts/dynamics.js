// do event delegation instead of manual event handling
document.getElementById("tasks-container").onclick = function(event) {
    let target = event.target;

    if (target.closest('.task-container')) {
        selectTask(target.closest('.task-container'));
    }
}

window.onclick = function(event) {
    let target = event.target;

    if (target.className.includes('task-') != true && event.target.className.includes('modal') != true && event.target.className.includes('button') != true && event.target.className.includes('close') != true) {
        let tasks = document.getElementsByClassName("task-container");
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.border = 'none';
            hideButtons();
        }
    }

    if (target.classList.contains('modal')) {
        hideAddTaskPopUp(event);
        hideUpdateTaskPopUp();
        hideDeleteTaskPopUp();
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
    if (fields.isToday.classList.contains('today')) {
        fields.isToday.classList.remove('today');
    }
    if (fields.isImp.classList.contains('important')) {
        fields.isImp.classList.remove('important');
    }
}

let selectedTask;

function selectTask(task) {
    selectedTask = task;
    deselectOtherTasks(task);
    task.style.border = "thick solid rgb(212, 96, 64)";
    showButtons();
}

function deselectOtherTasks(task) {
    let tasks = document.getElementsByClassName("task-container");
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] != task) {
            tasks[i].style.border = 'none';
        }
    }
}

// Tasks container functionalities
document.getElementById('add-btn').addEventListener('click', showAddTaskPopUp);
document.getElementById('add-modal-close').addEventListener('click', hideAddTaskPopUp);
document.getElementById('add-modal-cancel').addEventListener('click', hideAddTaskPopUp);

function showAddTaskPopUp() {
    document.getElementById('add-modal').style.display = "flex";
}

function hideAddTaskPopUp() {
    document.getElementById('add-modal').style.display = "none";
    resetForm(document.getElementById('add-task-form'));
}

function showButtons() {
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("delete-btn").style.display = "block";
}

function hideButtons() {
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("delete-btn").style.display = "none";
}

document.getElementById('update-btn').addEventListener('click', showUpdateTaskPopUp);
document.getElementById('update-modal-close').addEventListener('click', hideUpdateTaskPopUp);
document.getElementById('update-modal-cancel').addEventListener('click', hideUpdateTaskPopUp);

function showUpdateTaskPopUp() {
    let updateForm = document.getElementById('update-modal');
    let taskDesc = updateForm.querySelector('.modal-input[type="text"]');
    let dueDate = updateForm.querySelector('.modal-input[type="date"]');
    console.log(dueDate);
    let isToday = updateForm.querySelector('.fa-sun');
    let isImp = updateForm.querySelector('.fa-star');

    taskDesc.value = selectedTask.querySelector('.task-desc').innerHTML;
    console.log(selectedTask.querySelector('.task-dueDate').innerHTML);
    dueDate.value = getDate(selectedTask.querySelector('.task-dueDate').innerHTML);
    selectedTask.dataset.isToday == 'true' ? isToday.classList.add('today') : isToday.classList.remove('today');
    selectedTask.querySelector('.important-star').classList.contains('important') == true ? isImp.classList.add('important') : isImp.classList.remove('important');

    updateForm.style.display = "flex";
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

let isTodayModalButtons = document.getElementsByClassName("modal-today-icon");
for (let i = 0; i < isTodayModalButtons.length; i++) {
    isTodayModalButtons[i].addEventListener('click', function() {
        toggleIsToday(this.querySelector('.fa-sun'));
    });
}

let isImpModalButtons = document.getElementsByClassName("modal-star-icon");
for (let i = 0; i < isImpModalButtons.length; i++) {
    isImpModalButtons[i].addEventListener('click', function() {
        toggleIsImportant(this.querySelector('.fa-star'));
    });
}

function addTask(task) {
    let html = '<div class="task-container flexbox"' + (task.isToday == true ? ' data-is-Today="true">' : ' data-is-Today="false">');
    html += '<a class="fa fa-circle icon complete-circle"></a>';
    html += '<div class="task-text">';
    html += '<div class="task-desc">' + task.taskDesc + '</div>';
    html += '<div class="task-dueDate">' + getDisplayDate(task.dueDate) + '</div>';
    html += '</div>';
    html += '<a class="fa fa-star icon important-star' + (task.isImp == true ? ' important">' : '">') + '</a>';
    html += '</div>';

    console.log(document.getElementsByClassName('uncompleted-tasks')[0]);
    document.getElementsByClassName('uncompleted-tasks')[0].innerHTML += html;
}

function updateTask(task) {
    selectedTask.querySelector('.task-desc').innerHTML = task.taskDesc;
    selectedTask.querySelector('.task-dueDate').innerHTML = getDisplayDate(task.dueDate);
    let isImp = selectedTask.querySelector('.important-star');
    task.isImp == true ? isImp.classList.add('important') : isImp.classList.remove('important');
}