function httpPOST(url, callback) {

}

// const sessionID;

// login

// make use of the page-name meta elemnt to know what kind of task it is

// add task
document.getElementById('submit-add').addEventListener('click', addTask);

function addTask() {
    let addForm = document.getElementById('add-modal');
    let fields = getModalFields(addForm);
    let task = {};

    task.taskDesc = fields.taskDesc.value;
    task.dueDate = fields.dueDate.value;
    fields.isToday.classList.contains('today') == true ? task.isToday = true : task.isToday = false;
    fields.isImp.classList.contains('important') == true ? task.isImp = true : task.isImp = false;
    console.log(task);
    createTask(task);
    resetForm(addForm);
    hideAddTaskPopUp();
}

// update task (over all update)
document.getElementById('submit-update').addEventListener('click', updateTask);

function updateTask() {

}

// update task (completion)
let completeButtons = document.getElementsByClassName("complete-circle");
for (let i = 0; i < completeButtons.length; i++) {
    completeButtons[i].addEventListener("click", updateTaskCompletion);
}

function updateTaskCompletion() {
    toggleTaskComplete(icon);
}

// update task (importance)
let starButtons = document.getElementsByClassName("important-star");
for (let i = 0; i < starButtons.length; i++) {
    starButtons[i].addEventListener("click", updateTaskImportance);
}

function updateTaskImportance() {
    toggleTaskImportant(icon);
}

// delete task
document.getElementById('submit-delete').addEventListener('click', deleteTask);

function deleteTask() {

}