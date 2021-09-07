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
    console.log('inside validateForm func');
    let usernameErr = passwordErr = true;

    let regex;
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    if (username.value.trim() == "") {
        DisplayError('username-err', 'Please enter your username', username);
    } else {
        regex = /^[a-zA-z]+$/;
        if (regex.test(username.value.trim()) == false) {
            DisplayError('username-err', 'username can only contain letters', username);
        } else {
            HideError('username-err', username);
            usernameErr = false;
        }
    }

    if (password.value.trim() == "") {
        DisplayError('password-err', 'Please enter your last name', password);
    } else {
        regex = /^[a-zA-z]+$/;
        if (regex.test(password.value.trim()) == false) {
            DisplayError('password-err', 'password can only contain letters', password);
        } else {
            HideError('password-err', password);
            passwordErr = false;
        }
    }


    if (usernameErr || passwordErr || emailErr || messageErr) {
        return false;
    } else {
        let info = 'First name: ' + username.value + ', Last name: ' + password.value + ', email: ' + email.value + ', message: ' + message.value;
        alert('About to submit: \n' + info);
        return true;
    }
}