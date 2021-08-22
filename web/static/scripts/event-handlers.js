window.onclick = function(event) {
    let target = event.target;

    // Deselect task and hide "Update Task" and "Delete Task" buttons when clicking away from the selected task
    if (target.className.includes('task-') != true && event.target.className.includes('modal') != true && event.target.className.includes('button') != true && event.target.className.includes('close') != true) {
        let tasks = document.getElementsByClassName("task-container");
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].style.border = 'none';
            hideButtons();
        }
    }

    // Hide the currently shown Pop Up when clicking away from it
    if (target.classList.contains('modal')) {
        hideAddTaskPopUp(event);
        hideUpdateTaskPopUp();
        hideDeleteTaskPopUp();
    }

    // Select the task that was clicked
    if (target.closest('.task-container')) {
        selectTask(target.closest('.task-container'));
    }

    // Toggle highlighting "Add to today" button in a modal on click
    if (target.classList.contains('modal-icon') && target.classList.contains('fa-sun')) {
        toggleIsToday(target);
    }

    // Toggle highlighting "Mark as Important" button in a modal on click
    if (target.classList.contains('modal-icon') && target.classList.contains('fa-star')) {
        toggleIsImportant(target);
    }

    // Handle completing a task
    if (target.classList.contains('complete-circle')) {
        updateTaskCompletionController(target);
    }

    // Handle marking a task as important
    if (target.classList.contains('important-star')) {
        updateTaskImportanceController(target);
    }

}

document.getElementById('add-btn').addEventListener('click', showAddTaskPopUp);
document.getElementById('add-modal-close').addEventListener('click', hideAddTaskPopUp);
document.getElementById('add-modal-cancel').addEventListener('click', hideAddTaskPopUp);
document.getElementById('submit-add').addEventListener('click', addTaskController);

document.getElementById('update-btn').addEventListener('click', showUpdateTaskPopUp);
document.getElementById('update-modal-close').addEventListener('click', hideUpdateTaskPopUp);
document.getElementById('update-modal-cancel').addEventListener('click', hideUpdateTaskPopUp);
document.getElementById('submit-update').addEventListener('click', updateTaskController);

document.getElementById('delete-btn').addEventListener('click', showDeleteTaskPopUp);
document.getElementById('delete-modal-close').addEventListener('click', hideDeleteTaskPopUp);
document.getElementById('delete-modal-cancel').addEventListener('click', hideDeleteTaskPopUp);
document.getElementById('submit-delete').addEventListener('click', deleteTaskController);