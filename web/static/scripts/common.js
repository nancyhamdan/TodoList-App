function showAddTaskPopUp() {
    let modals = document.getElementsByClassName("modal");
    modals[0].style.display = "flex";
}

function hideAddTaskPopUp() {
    let modals = document.getElementsByClassName("modal");
    modals[0].style.display = "none";
}

let selectedTask;

let tasks = document.getElementsByClassName("task-container");
for (let i = 0; i < tasks.length; i++) {
    tasks[i].addEventListener("click", selectTask);
}

function selectTask() {
    console.log("inside selectTask");
    this.style.border = "thick solid rgb(212, 96, 64)";
    showButtons();
    selectedTask = this;
    console.log(selectedTask)
    let desc = selectedTask.querySelector('.task-desc');
    console.log("task desc:", desc.innerHTML);
}

function showButtons() {
    document.getElementById("update-btn").style.display = "block";
    document.getElementById("delete-btn").style.display = "block";
}