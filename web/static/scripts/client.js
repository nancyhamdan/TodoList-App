function httpPOST(url, callback) {

}

// add task
function sendAddTask() {
    let addModal = document.getElementById('add-modal');
    let fields = getModalFields(addModal);
    let task = createTaskInfoFromModal(fields);
    task.isCompleted = false;
    let taskJSON = convertToJSON(task);

    // get task id from server then add the task using addTask, task object should have an id
    task.ID = "8765"; // mock value
    addTask(task);
    resetFields(addModal);
    hideAddTaskPopUp();
}

// update task (over all update)
function sendUpdateTask() {
    let updateModal = document.getElementById('update-modal');
    let fields = getModalFields(updateModal);
    let task = createTaskInfoFromModal(fields);
    let taskJSON = convertToJSON(task);

    updateTask(task);
    hideUpdateTaskPopUp();
}

// update task (completion only)
function sendUpdateTaskCompletion(completeButton) {
    toggleTaskComplete(completeButton);
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
}

// update task (importance only)
function sendUpdateTaskImportance(isImportantButton) {
    toggleIsImportant(isImportantButton);
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
}

// delete task
function sendDeleteTask() {
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);

    deleteTask(task.ID);
    hideDeleteTaskPopUp();
}