function addTaskController() {
    let addModal = document.getElementById('add-modal');
    let fields = getModalFields(addModal);
    let task = createTaskInfoFromModal(fields);
    task.isCompleted = false;

    let taskJSON = convertToJSON(task);
    task.ID = httpRequest("POST", "/tasks", taskJSON);

    addTask(task);
    resetFields(addModal);
    hideAddTaskModal();
}

function updateTaskController() {
    let updateModal = document.getElementById('update-modal');
    let fields = getModalFields(updateModal);
    let task = createTaskInfoFromModal(fields);
    task.ID = getSelectedTaskID();
    getIsSelectedTaskCompleted() == true ? task.isCompleted = true : task.isCompleted = false;

    let taskJSON = convertToJSON(task);
    httpRequest("PUT", "/tasks/" + task.ID, taskJSON);

    updateTask(task);
    hideUpdateTaskModal();
}

function updateTaskCompletionController(completeButton) {
    toggleTaskComplete(completeButton);
    let task = createSelectedTaskInfo();

    let taskJSON = convertToJSON(task);
    httpRequest("PUT", "/tasks/" + task.ID, taskJSON);
}

function updateTaskImportanceController(isImportantortantButton) {
    let shouldDelete = toggleIsImportant(isImportantortantButton);

    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
    httpRequest("PUT", "/tasks/" + task.ID, taskJSON);

    if (shouldDelete) {
        deleteTask(task.ID);
        hideButtons()
    }
}

function deleteTaskController() {
    let task = createSelectedTaskInfo();

    let taskJSON = convertToJSON(task);
    httpRequest("DELETE", "/tasks/" + task.ID, taskJSON);

    deleteTask(task.ID);
    hideDeleteTaskModal();
}