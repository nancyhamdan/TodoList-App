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
    fields.isToday.classList.remove('today');
    fields.isImp.classList.remove('important');
}

let selectedTask;

function selectTask(task) {
    selectedTask = task;
    deselectOtherTasks();
    task.style.border = "thick solid rgb(212, 96, 64)";
    showButtons();
}

function deselectOtherTasks() {
    let tasks = document.getElementsByClassName("task-container");
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] != selectedTask) {
            tasks[i].style.border = 'none';
        }
    }
}

// Tasks container functionalities

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

function showUpdateTaskPopUp() {
    let updateForm = document.getElementById('update-modal');
    let taskDesc = updateForm.querySelector('.modal-input[type="text"]');
    let dueDate = updateForm.querySelector('.modal-input[type="date"]');
    let isToday = updateForm.querySelector('.fa-sun');
    let isImp = updateForm.querySelector('.fa-star');

    taskDesc.value = selectedTask.querySelector('.task-desc').innerHTML;
    dueDate.value = getDate(selectedTask.querySelector('.task-dueDate').innerHTML);
    selectedTask.dataset.isToday == 'true' ? isToday.classList.add('today') : isToday.classList.remove('today');
    selectedTask.querySelector('.important-star').classList.contains('important') == true ? isImp.classList.add('important') : isImp.classList.remove('important');

    updateForm.style.display = "flex";
}

function hideUpdateTaskPopUp() {
    document.getElementById('update-modal').style.display = "none";
}

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