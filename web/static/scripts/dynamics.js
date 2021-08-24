// Global variable to keep track of the currently selected task
let selectedTask;

// showButtons and hideButtons are used to display and hide the "Update Task" and "Delete Task" buttons
function showButtons() {
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("delete-btn").style.display = "block";
}

function hideButtons() {
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("delete-btn").style.display = "none";
}

// selectTask saves the currently selected task, outlines it and deselects any other selected tasks
function selectTask(task) {
    selectedTask = task;
    deselectOtherTasks();
    task.style.border = 'thick solid rgb(212, 96, 64)';
    showButtons();
}

function deselectOtherTasks() {
    let tasks = document.getElementsByClassName('task-container');
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] != selectedTask) {
            tasks[i].style.border = 'none';
        }
    }
}

function resetFields(modal) {
    let fields = getModalFields(modal);
    fields.taskDesc.value = '';
    fields.dueDate.value = '';
    fields.isToday.classList.remove('today');
    fields.isImp.classList.remove('important');
}

// addTask adds a given task to the uncompleted tasks
function addTask(task) {
    let html = '<div class="task-container flexbox" id="' + task.ID + '" ' + (task.isToday == true ? ' data-is-Today="true">' : ' data-is-Today="false">');
    html += '<a class="fa fa-circle icon complete-circle"></a>';
    html += '<div class="task-text">';
    html += '<div class="task-desc">' + task.taskDesc + '</div>';
    if (task.dueDate != "") {
        html += '<div class="task-dueDate">' + getDisplayDate(task.dueDate) + '</div>';
    } else {
        html += '<div class="task-dueDate hidden"></div>';
    }
    html += '</div>';
    html += '<a class="fa fa-star icon important-star' + (task.isImp == true ? ' important">' : '">') + '</a>';
    html += '</div>';

    document.getElementsByClassName('uncompleted-tasks')[0].innerHTML += html;
}

function shouldDeleteTask(task) {
    let page = document.getElementById('page').dataset.page;

    switch (page) {
        case 'Today':
            if (task.isToday == false) {
                return true;
            }
            break;
        case 'Important':
            if (task.isImp == false) {
                return true;
            }
            break;
        case 'Planned':
            if (task.dueDate == '') {
                return true;
            }
            break;
    }
    return false;
}

// updateTask updates the currently selected task to newTask
function updateTask(newTask) {
    let shouldTaskBeDeleted = shouldDeleteTask(newTask);
    if (shouldTaskBeDeleted == false) {
        selectedTask.querySelector('.task-desc').innerHTML = newTask.taskDesc;

        let taskDueDate = selectedTask.querySelector('.task-dueDate');
        taskDueDate.innerHTML = getDisplayDate(newTask.dueDate);
        if (taskDueDate.innerHTML != "") {
            taskDueDate.classList.remove('hidden');
        }

        newTask.isToday == true ? selectedTask.dataset.isToday = true : selectedTask.dataset.isToday = false;

        let isImp = selectedTask.querySelector('.important-star');
        newTask.isImp == true ? isImp.classList.add('important') : isImp.classList.remove('important');
    } else {
        deleteTask(selectedTask.id);
    }
}

function deleteTask(taskID) {
    let task = document.getElementById(taskID);
    let completedTasks = document.getElementsByClassName('completed-tasks flexbox')[0];
    let uncompletedTasks = document.getElementsByClassName('uncompleted-tasks flexbox')[0];
    let shouldHideButtons = false;

    task.remove();
    if (completedTasks.children.length == 1) {
        document.getElementById('completed-div').style.display = 'none';
        shouldHideButtons = true;
    }

    if (uncompletedTasks.children.length == 0 && shouldHideButtons == true) {
        hideButtons();
    }
}

function removeDueDate(rmvButton) {
    let dueDate = rmvButton.closest('.modal').querySelector('.modal-input[type="date"]');
    dueDate.value = "";
}

function showAddTaskModal() {
    document.getElementById('add-modal').style.display = "flex";
}

function hideAddTaskModal() {
    document.getElementById('add-modal').style.display = "none";
    resetFields(document.getElementById('add-task-form'));
}

// showUpdateTaskModal displays the update task modal by getting the selected task's info and filling the modal with it
function showUpdateTaskModal() {
    let updateModal = document.getElementById('update-modal');
    let taskDesc = updateModal.querySelector('.modal-input[type="text"]');
    let dueDate = updateModal.querySelector('.modal-input[type="date"]');
    let isToday = updateModal.querySelector('.fa-sun');
    let isImp = updateModal.querySelector('.fa-star');

    taskDesc.value = selectedTask.querySelector('.task-desc').innerHTML;
    dueDate.value = getDate(selectedTask.querySelector('.task-dueDate').innerHTML);
    selectedTask.dataset.isToday == 'true' ? isToday.classList.add('today') : isToday.classList.remove('today');
    selectedTask.querySelector('.important-star').classList.contains('important') == true ? isImp.classList.add('important') : isImp.classList.remove('important');

    updateModal.style.display = "flex";
}

function hideUpdateTaskModal() {
    document.getElementById('update-modal').style.display = "none";
}

function showDeleteTaskModal() {
    document.getElementById('delete-modal').style.display = "flex";
}

function hideDeleteTaskModal() {
    document.getElementById('delete-modal').style.display = "none";
}

// toggleTaskComplete marks a task as comepleted or uncompleted depending on the task's state (checked or not) 
function toggleTaskComplete(completeButton) {
    let task = completeButton.parentNode;
    let uncompletedTasks = document.getElementsByClassName("uncompleted-tasks")[0];
    let completedTasks = document.getElementsByClassName("completed-tasks")[0];

    if (completeButton.classList.contains('checked')) {
        completedTasks.removeChild(task);
        if (completedTasks.children.length == 1) {
            document.getElementById('completed-div').style.display = 'none';
        }
        uncompletedTasks.appendChild(task);

        completeButton.classList.replace('fa-check-circle', 'fa-circle');
        completeButton.classList.remove("checked");
    } else {
        document.getElementById('completed-div').style.display = 'flex';
        uncompletedTasks.removeChild(task);
        completedTasks.appendChild(task);

        completeButton.classList.replace('fa-circle', 'fa-check-circle');
        completeButton.classList.add("checked");
    }
}

function toggleIsToday(icon) {
    icon.classList.contains('today') == true ? icon.classList.remove('today') : icon.classList.add('today');
}

function toggleIsImportant(icon) {
    icon.classList.contains('important') == true ? icon.classList.remove('important') : icon.classList.add('important');
}