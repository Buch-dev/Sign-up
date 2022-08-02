const form = document.getElementById('form')
const emailEl = document.getElementById('email')
const firstNameEl = document.getElementById('first-name')
const lastNameEl = document.getElementById('last-name')
const passwordEl = document.getElementById('password')
const confirmPasswordEl = document.getElementById('confirm_password')
const checkBoxEl = document.getElementById('accept')
const button = document.querySelector('button')
const togglePassword = document.getElementsByClassName('togglePassword')
const checkboxBox = document.querySelector('.checkbox_box')
const signupText = document.querySelector('.sign-up')
console.log(togglePassword);

form.addEventListener('submit', e => {
    // prevent the form from submitting
    e.preventDefault()

    // validate forms
    let isFirstnameValid = checkFirstname(),
        isLastnameValid = checkLastname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword(),
        isCheckboxValid = checkBox()

    let isFormValid = isFirstnameValid &&
        isLastnameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isCheckboxValid

        // submit to the server if the form is valid
        if (isFormValid) {
            
        }
})

// the following isRequired() function returns true if the input argument is empty
const isRequired = value => value === '' ? false : true

// the following isBetween() function returns false if the length argument is not between the min and max argument
const isBetween = (length, min, max) => length < min || length > max ? false : true

// to check if the email is valid, you'll use a regular expression
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

// to check if a password is strong, which match a specified pattern, you'll also use a regular expression
const isPasswordSecure = password => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})")
    return re.test(password)
}

// the following showError() function highlights the border of the input field and displays an error message if the input field is invalid
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement
    // add the error class
    formField.classList.remove('text-dark')
    // formField.classList.add('text-danger')

    const inputEl = formField.querySelector('input')
    inputEl.classList.add('border', 'border-2', 'border-danger')

    // show the error msg
    const error = formField.querySelector('small')
    error.textContent = message
}

// the function that shows the success indicator is similar to the showError() function
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement
    // remove the error class
    formField.classList.remove('text-danger')
    formField.classList.add('text-dark')

    const inputEl = formField.querySelector('input')
    inputEl.classList.remove('border', 'border-2', 'border-danger')

    // show the error msg
    const error = formField.querySelector('small')
    error.textContent = ''
}

// VALIDATE THE FIRSTNAME FIELD
const checkFirstname = () => {
    let valid = false
    const min = 3, max = 25
    const firstname = firstNameEl.value.trim()

    if (!isRequired(firstname)) {
        showError(firstNameEl, 'First name cannot be blank.')
    } else {
        showSuccess(firstNameEl)
        valid = true
    }
    return valid
}

// VALIDATE THE SECONDNAME FIELD
const checkLastname = () => {
    let valid = false
    const min = 3, max = 25
    const lastname = lastNameEl.value.trim()

    if (!isRequired(lastname)) {
        showError(lastNameEl, 'Last name cannot be blank.')
    } else {
        showSuccess(lastNameEl)
        valid = true
    }
    return valid
}

// VALIDATE THE EMAIL FIELD
const checkEmail = () => {
    let valid = false
    const email = emailEl.value.trim()

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.')
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid')
    } else {
        showSuccess(emailEl)
        valid = true
    }
    return valid
}

// VALIDATE THE PASSWORD FIELD
const checkPassword = () => {
    let valid = false
    const password = passwordEl.value.trim()

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.')
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must follow the criteria below')
    } else {
        showSuccess(passwordEl)
        valid = true
    }
    return valid
}

// VALIDATE THE CONFIRM PASSWORD FIELD
const checkConfirmPassword = () => {
    let valid = false
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim()
    const password = passwordEl.value.trim()

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again')
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Confirm password does not match')
    } else {
        showSuccess(confirmPasswordEl)
        valid = true
    }
    return valid
}

// VALIDATE THE CHECKBOX
const checkBox = () => {
    let valid = false

    if (checkBoxEl.checked == false) {
        signupText.textContent = 'You must agree to the terms first'
    } else {
        checkboxBox.classList.remove('border-danger')
        signupText.innerHTML = "Signing up for an account means you agree to the Privacy Policy <br/> and Terms of Service."
        valid = true
    }
    return valid
}

togglePassword[0].addEventListener('click', () => {
    // toggle the type attribute
    const type = passwordEl.getAttribute('type') === 'password' ? 'text' : 'password'
    passwordEl.setAttribute('type', type)

    // toggle the icon
    togglePassword[0].classList.toggle('bi-eye')
})

togglePassword[1].addEventListener('click', () => {
    // toggle the type attribute
    const type = confirmPasswordEl.getAttribute('type') === 'password' ? 'text' : 'password'
    confirmPasswordEl.setAttribute('type', type)

    // toggle the icon
    togglePassword[1].classList.toggle('bi-eye')
})