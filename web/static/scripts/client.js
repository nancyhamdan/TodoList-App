function httpPOST(url, callback) {

}

function createTaskInfo(fields) {
    let task = {};
    task.taskDesc = fields.taskDesc.value;
    task.dueDate = fields.dueDate.value;
    fields.isToday.classList.contains('today') == true ? task.isToday = true : task.isToday = false;
    fields.isImp.classList.contains('important') == true ? task.isImp = true : task.isImp = false;
    return task;
}

// add task
function sendAddTask() {
    let addForm = document.getElementById('add-modal');
    let fields = getModalFields(addForm);
    let task = createTaskInfo(fields);
    // get task id from server then add the task using addTask, task object should have an id
    addTask(task);
    resetForm(addForm);
    hideAddTaskPopUp();
}

// update task (over all update)
function sendUpdateTask() {
    let updateForm = document.getElementById('update-modal');
    // fix it so obj also has isCompleted
    let fields = getModalFields(updateForm);
    let task = createTaskInfo(fields);

    updateTask(task);
    hideUpdateTaskPopUp();
}

// update task (completion only)
function sendUpdateTaskCompletion() {
    toggleTaskComplete(icon);
}

// update task (importance only)
function sendUpdateTaskImportance() {
    toggleTaskImportant(icon);
}

// delete task
function sendDeleteTask() {

}