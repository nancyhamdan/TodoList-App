function addTaskController() {
    let addModal = document.getElementById('add-modal');
    let fields = getModalFields(addModal);
    let task = createTaskInfoFromModal(fields);
    task.isCompleted = false;
    let taskJSON = convertToJSON(task);
    console.log(taskJSON);

    // get task id from server then add the task using addTask, task object should have an id
    task.ID = "8765"; // mock value
    addTask(task);
    resetFields(addModal);
    hideAddTaskPopUp();
}

function updateTaskController() {
    let updateModal = document.getElementById('update-modal');
    let fields = getModalFields(updateModal);
    let task = createTaskInfoFromModal(fields);
    let taskJSON = convertToJSON(task);
    console.log(taskJSON);

    updateTask(task);
    hideUpdateTaskPopUp();
}

function updateTaskCompletionController(completeButton) {
    toggleTaskComplete(completeButton);
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
    console.log(taskJSON);

}

function updateTaskImportanceController(isImportantButton) {
    toggleIsImportant(isImportantButton);
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
    console.log(taskJSON);
}

function deleteTaskController() {
    let task = createSelectedTaskInfo();
    let taskJSON = convertToJSON(task);
    console.log(taskJSON);

    deleteTask(task.ID);
    hideDeleteTaskPopUp();
}