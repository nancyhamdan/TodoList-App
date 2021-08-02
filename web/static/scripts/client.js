function httpPOST(url, callback) {

}

// const sessionID;

// login

// make use of the page-name meta elemnt to know what kind of task it is

function createTaskInfo(fields) {
    let task = {};
    task.taskDesc = fields.taskDesc.value;
    task.dueDate = fields.dueDate.value;
    fields.isToday.classList.contains('today') == true ? task.isToday = true : task.isToday = false;
    fields.isImp.classList.contains('important') == true ? task.isImp = true : task.isImp = false;
    return task;
}

// add task
document.getElementById('submit-add').addEventListener('click', sendAddTask);

function sendAddTask() {
    let addForm = document.getElementById('add-modal');
    let fields = getModalFields(addForm);
    let task = createTaskInfo(fields);

    addTask(task);
    resetForm(addForm);
    hideAddTaskPopUp();
}

// update task (over all update)
document.getElementById('submit-update').addEventListener('click', sendUpdateTask);

function sendUpdateTask() {
    let updateForm = document.getElementById('update-modal');
    let fields = getModalFields(updateForm);
    let task = createTaskInfo(fields);

    updateTask(task);
    hideUpdateTaskPopUp();
}

// update task (completion)
let completeButtons = document.getElementsByClassName("complete-circle");
for (let i = 0; i < completeButtons.length; i++) {
    completeButtons[i].addEventListener("click", sendUpdateTaskCompletion);
}

function sendUpdateTaskCompletion() {
    toggleTaskComplete(icon);
}

// update task (importance)
let starButtons = document.getElementsByClassName("important-star");
for (let i = 0; i < starButtons.length; i++) {
    starButtons[i].addEventListener("click", sendUpdateTaskImportance);
}

function sendUpdateTaskImportance() {
    toggleTaskImportant(icon);
}

// delete task
document.getElementById('submit-delete').addEventListener('click', sendDeleteTask);

function sendDeleteTask() {

}