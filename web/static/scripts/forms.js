function toggleShowPassword() {
    var box = document.getElementById('password');
    if (box.type === 'password') {
        box.type = 'text';
    } else {
        box.type = 'password';
    }
}

function DisplayError(elementID, errorMessage, inputField) {
    document.getElementById(elementID).innerHTML = errorMessage;
    inputField.style.marginBottom = 0;
    document.getElementById(elementID).style.display = 'block';
}

function HideError(elementID, inputField) {
    inputField.style.marginBottom = '2vh';
    document.getElementById(elementID).style.display = 'none';
}

function validateForm() {
    let usernameErr = passwordErr = true;

    let regex;
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    if (username.value.trim() == "") {
        DisplayError('username-err', 'Please enter your username', username);
    } else {
        regex = /^[a-zA-z]{1}([a-zA-z]|\.|[0-9])+$/;
        if (regex.test(username.value.trim()) == false) {
            DisplayError('username-err', 'username can must start with a letter and only contain alphanumeric characters and dots', username);
        } else if (username.value.trim().length < 5) {
            DisplayError('username-err', 'username must be at least 5 characters long', username);
        } else {
            HideError('username-err', username);
            usernameErr = false;
        }
    }

    if (password.value.trim() == "") {
        DisplayError('password-err', 'Please enter your password', password);
    } else {
        if (password.value.trim().length < 8) {
            DisplayError('password-err', 'password must be at least 8 characters long', password);
        } else {
            HideError('password-err', password);
            passwordErr = false;
        }
    }


    if (usernameErr || passwordErr) {
        return false;
    } else {
        username.value = username.value.trim()
        password.value = password.value.trim()
        return true;
    }
}