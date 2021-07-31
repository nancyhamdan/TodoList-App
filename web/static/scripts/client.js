function httpPOST(url, callback) {

}

const sessionID;

// login

// make use of the page-name meta elemnt to know what kind of task it is

// add task
document.getElementById('submit-add').addEventListener('click', addTask);

function addTask() {

}

// update task (over all update)
document.getElementById('submit-update').addEventListener('click', updateTask);

function updateTask() {

}

// update task (completetion)
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