function getDisplayDate(dueDate) {
    if (dueDate == '') {
        return dueDate;
    }
    let date = new Date(dueDate);

    let dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    let day = date.getDate();
    let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    let year = date.getFullYear();

    return dayName.slice(0, 3) + ", " + (day <= 9 ? '0' + day : day) + " " + month.slice(0, 3) + " " + year;
}

function getMonth(monthText) {
    switch (monthText) {
        case 'Jan':
            return '01';
        case 'Feb':
            return '02';
        case 'Mar':
            return '03';
        case 'Apr':
            return '04';
        case 'May':
            return '05';
        case 'Jun':
            return '06';
        case 'Jul':
            return '07';
        case 'Aug':
            return '08';
        case 'Sep':
            return '09';
        case 'Oct':
            return '10';
        case 'Nov':
            return '11';
        case 'Dec':
            return '12';
    }
}

function getDate(displayDate) {
    let day = displayDate.slice(5, 7)
    let monthText = displayDate.slice(8, 11);
    let year = displayDate.slice(12, );

    let date = year + '-' + getMonth(monthText) + '-' + day;
    return date;
}

function convertToJSON(obj) {
    return JSON.stringify(obj);
}

function getSelectedTaskID() {
    return selectedTask.id;
}

function getModalFields(modal) {
    return {
        taskDesc: modal.querySelector('.modal-input[type="text"]'),
        dueDate: modal.querySelector('.modal-input[type="date"]'),
        isToday: modal.querySelector('.fa-sun'),
        isImp: modal.querySelector('.fa-star')
    }
}

function createTaskInfoFromModal(fields) {
    let task = {};
    task.taskDesc = fields.taskDesc.value;
    task.dueDate = fields.dueDate.value;
    fields.isToday.classList.contains('today') == true ? task.isToday = true : task.isToday = false;
    fields.isImp.classList.contains('important') == true ? task.isImp = true : task.isImp = false;
    return task;
}

function getSelectedTaskFields() {
    return {
        taskDesc: selectedTask.querySelector('.task-desc'),
        dueDate: selectedTask.querySelector('.task-dueDate'),
        isToday: selectedTask.dataset.isToday,
        isImp: selectedTask.querySelector('.important-star'),
        isCompleted: selectedTask.querySelector('.complete-circle')
    }
}

function createSelectedTaskInfo() {
    let fields = getSelectedTaskFields();
    let task = {};
    task.ID = getSelectedTaskID();
    task.taskDesc = fields.taskDesc.innerHTML;
    task.dueDate = getDate(fields.dueDate.innerHTML);
    task.isToday = fields.isToday;
    fields.isImp.classList.contains('important') == true ? task.isImp = true : task.isImp = false;
    fields.isCompleted.classList.contains('checked') == true ? task.isCompleted = true : task.isCompleted = false;
    return task;
}

function httpPOST(url, json) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(json);
}