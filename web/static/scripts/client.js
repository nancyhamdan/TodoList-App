function httpPOST(url, callback) {

}

// add task
function sendAddTask() {
    let addModal = document.getElementById('add-modal');
    let fields = getModalFields(addModal);
    let task = createTaskInfo(fields);
    // get task id from server then add the task using addTask, task object should have an id
    addTask(task);
    resetFields(addModal);
    hideAddTaskPopUp();
}

// update task (over all update)
function sendUpdateTask() {
    let updateModal = document.getElementById('update-modal');
    let fields = getModalFields(updateModal);
    let task = createTaskInfo(fields);

    updateTask(task);
    hideUpdateTaskPopUp();
}

// update task (completion only)
function sendUpdateTaskCompletion(completeButton) {
    toggleTaskComplete(completeButton);
}

// update task (importance only)
function sendUpdateTaskImportance(isImportantButton) {
    toggleIsImportant(isImportantButton);
}

// delete task
function sendDeleteTask() {

}