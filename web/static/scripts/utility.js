function getDisplayDate(dueDate) {
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
    console.log(typeof date, date);
    return date;
}