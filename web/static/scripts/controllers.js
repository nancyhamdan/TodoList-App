// add task
function addTaskController() {
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
function updateTaskController() {
    let updateModal = document.getElementById('update-modal');
    let fields = getModalFields(updateModal);
    let task = createTaskInfoFromModal(fields);
    let taskJSON = convertToJSON(task);

    updateTask(task);
    hideUpdateTaskPopUp();
}

// update task (completion only)
function updateTaskCompletionController(completeButton) {
    toggleTaskComplete(completeButton);
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
}

// update task (importance only)
function updateTaskImportanceController(isImportantButton) {
    toggleIsImportant(isImportantButton);
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
}

// delete task
function deleteTaskController() {
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);

    deleteTask(task.ID);
    hideDeleteTaskPopUp();
}