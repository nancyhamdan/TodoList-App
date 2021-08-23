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
        hideAddTaskModal();
        hideUpdateTaskModal();
        hideDeleteTaskModal();
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

    // Handle removing due date from a task
    if (target.classList.contains('rmv-due-date')) {
        removeDueDate(target);
    }

}

document.getElementById('add-btn').addEventListener('click', showAddTaskModal);
document.getElementById('add-modal-close').addEventListener('click', hideAddTaskModal);
document.getElementById('add-modal-cancel').addEventListener('click', hideAddTaskModal);
document.getElementById('submit-add').addEventListener('click', addTaskController);

document.getElementById('update-btn').addEventListener('click', showUpdateTaskModal);
document.getElementById('update-modal-close').addEventListener('click', hideUpdateTaskModal);
document.getElementById('update-modal-cancel').addEventListener('click', hideUpdateTaskModal);
document.getElementById('submit-update').addEventListener('click', updateTaskController);

document.getElementById('delete-btn').addEventListener('click', showDeleteTaskModal);
document.getElementById('delete-modal-close').addEventListener('click', hideDeleteTaskModal);
document.getElementById('delete-modal-cancel').addEventListener('click', hideDeleteTaskModal);
document.getElementById('submit-delete').addEventListener('click', deleteTaskController);