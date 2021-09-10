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
    if (displayDate == '') {
        return displayDate;
    }
    let day = displayDate.slice(5, 7)
    let monthText = displayDate.slice(8, 11);
    let year = displayDate.slice(12, );

    let date = year + '-' + getMonth(monthText) + '-' + day;
    return date;
}

function convertToJSON(obj) {
    return JSON.stringify(obj);
}

function getIsSelectedTaskCompleted() {
    let isCompleted = selectedTask.querySelector('.complete-circle')
    return isCompleted.classList.contains('checked') == true ? true : false;
}

function getSelectedTaskID() {
    return Number(selectedTask.id);
}

function getModalFields(modal) {
    return {
        description: modal.querySelector('.modal-input[type="text"]'),
        dueDate: modal.querySelector('.modal-input[type="date"]'),
        isToday: modal.querySelector('.fa-sun'),
        isImportant: modal.querySelector('.fa-star')
    }
}

function createTaskInfoFromModal(fields) {
    let task = {};
    task.ID = 0;
    task.description = fields.description.value;
    task.dueDate = fields.dueDate.value;
    fields.isToday.classList.contains('today') == true ? task.isToday = true : task.isToday = false;
    fields.isImportant.classList.contains('important') == true ? task.isImportant = true : task.isImportant = false;
    return task;
}

function getSelectedTaskFields() {
    return {
        description: selectedTask.querySelector('.task-desc'),
        dueDate: selectedTask.querySelector('.task-dueDate'),
        isToday: selectedTask.dataset.isToday,
        isImportant: selectedTask.querySelector('.important-star'),
        isCompleted: selectedTask.querySelector('.complete-circle')
    }
}

function createSelectedTaskInfo() {
    let fields = getSelectedTaskFields();
    let task = {};
    task.ID = getSelectedTaskID();
    task.description = fields.description.innerHTML;
    task.dueDate = getDate(fields.dueDate.innerHTML);
    task.isToday = Boolean(fields.isToday);
    fields.isImportant.classList.contains('important') == true ? task.isImportant = true : task.isImportant = false;
    fields.isCompleted.classList.contains('checked') == true ? task.isCompleted = true : task.isCompleted = false;
    return task;
}

function httpRequest(method, url, json) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let response;
    xhr.onload = function() {
        response = this.responseText;
    }
    xhr.send(json);
    return response
}