
// ========================================================================
//                          Useful Functions
// ========================================================================

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

/**
 * set HTML/CSS input error and set 'validForm' in sessionStorage 
 * to false;
 * @param {*} inputElement 
 * @param {*} message 
 */
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
    sessionStorage.setItem('validForm', false);
}

/**
 * Clear HTML/CSS input error and set 'validForm' in sessionStorage
 * to true;
 * @param {*} inputElement 
 */
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
    sessionStorage.setItem('validForm', true)
}

function switch_form(from, to){
    from.classList.add('form--hidden');
    to.classList.remove('form--hidden');
}

/**ㄉ
 * check if there already exists an user in the localStorage 
 * with the same email address.
 * 
 * @param {Array} userArray obtained from localStorage:Users
 * @param {String} email 
 * @returns true if matching email found; False if didn't
 */
function checkExisingUsers(userArray, email){
    if (userArray.some(item => item.email == email)){
        return true
    }
    else{
        return false 
    }
}

/**
 * Validate the password
 *      called within HTML
 * @param {DOMElement} password_elem 
 */
function validate_password(password_elem){
    if (password_elem.value.length <= 5){
        setInputError(password_elem, "Password must have at least 5 characters.")
    }
    else{
        clearInputError(password_elem)
    }
}

/**
 * Confirm two password entered matches
 *      called within HTML
 */
function confirm_password(){
    let signupPassword = document.getElementById('signupPassword');
    let confirm_signupPassword = document.getElementById('confirm_signupPassword');
    if (signupPassword.value == confirm_signupPassword.value){
        confirm_signupPassword.style.backgroundColor='rgb(0,255,0,0.2)';
        clearInputError(confirm_signupPassword);
    }
    else{
        confirm_signupPassword.style.backgroundColor= 'rgb(255, 0, 0, 0.2)';
        setInputError(confirm_signupPassword,"Password doesn't match");
    }
}

/**
 * Validate the format of email using regular expression
 * @param {DOMElement} email_elem 
 * @returns true if validated, false if not
 */

function validate_email(email_elem){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_elem.value)){
        return true
    }
    else{
        return false
    }
}

/**
 * Reveil male/female avatars depending on the radio button val
 * @param {DOMElement} selected 
 */
function create_avatar(selected){
    const genderSelectMale = document.getElementById('avatarTableMale');
    const genderSelectFemale = document.getElementById('avatarTableFemale')
    let gender_select = selected.value; 
    if (gender_select === 'male'){
        genderSelectFemale.classList.add('avatar--hidden');
        genderSelectMale.classList.remove('avatar--hidden');
    }
    if (gender_select === 'female'){
        genderSelectFemale.classList.remove('avatar--hidden');
        genderSelectMale.classList.add('avatar--hidden');
    }
}

function getLocalStorage(name){
    let name_array = JSON.parse(localStorage.getItem(name)) || [];
    return name_array;
}


    
// ========================================================================
//                          JS event listeners
// ========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // forms within this page
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const avatarForm = document.querySelector('#selectAvatar');
    const forgetPasswordForm = document.querySelector('#forgetPassword');
    // verify login status
    var loginStatus = sessionStorage.getItem('LoggedIn');
    if ( loginStatus == null || loginStatus == '' || loginStatus == 'false' ){
        document.getElementById('userLogo').style.display = 'none';
    }
    // Create Account Form vars: 
    var newUsername; 
    var newEmail; 
    var newPassword;

    // Login Form: click to create account
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        switch_form(loginForm, createAccountForm);
    });
    
    // Login Form: submit
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        inputEmail = document.getElementById('loginEmail').value; 
        inputEmail = inputEmail.toLowerCase();
        inputPassword = document.getElementById('loginPassword').value; 
        storedUsers = getLocalStorage('Users');
        queryUsers = storedUsers.filter(obj =>{
            return obj.email === inputEmail;
        })
        if (queryUsers.length === 1){
            // Users with same email is found, check password:
            if (inputPassword === queryUsers[0].password){
                sessionStorage.setItem('LoggedIn', queryUsers[0].email);
                alert(queryUsers[0].username + ' logged in!');
                window.location.replace('home.html');
            }
            else{
                setFormMessage(loginForm, "error", "Invalid username/password combination");
            }
        }
        else{
            setFormMessage(loginForm, "error", "User Not Found");
        }
    });

    // login form: forget password: 
    document.querySelector('#linkForgetPassword').addEventListener('click', e=>{
        e.preventDefault();
        switch_form(loginForm, forgetPasswordForm);
    })

    // CreateAccount Form: click to get back to Login
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        switch_form(createAccountForm, loginForm);
    });
    // CreateAccount Form: submit
    createAccountForm.addEventListener('submit', e =>{
        e.preventDefault();
        // Get input fields
        newUsername = document.getElementById('signupUsername').value;
        newEmail = document.getElementById('signupEmail').value;
        newEmail = newEmail.toLowerCase();
        newPassword = document.getElementById('signupPassword').value;
        if (window.sessionStorage.getItem('validForm') == 'true'){
            // take the user to avatar selection Form:
            switch_form(createAccountForm, avatarForm);
        }
        else{
            setFormMessage(createAccountForm, 'error','Error(s) in input fields')
        }
        
    })
    
    // CreateAccount: Input fields validation
    document.querySelectorAll(".form__input").forEach(inputElement => {
        //  validation performed by checking value(s) of input 
        //  elements at different input time: 
        //      - 'blur': when the input elem lose focus
        //      - 'input': when the input elem gain focus 
        //  When user starts entering anything, 'validForm' in session 
        //  storage is automatically set as true, and will only be set 
        //  to false if any of the validation didn't pass. 
        //  'validForm' is checked before the User registration information
        //  is saved into localStorage

        // when user start inputing, set 'validForm' as true
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });

        inputElement.addEventListener("blur", e => {
            // check if username was left blank: 
            if (e.target.id === 'signupUsername' && e.target.value.length === 0){
                setInputError(inputElement, 'You must enter an Username'); 
            }
            //check if username has length < 3
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 3) {
                setInputError(inputElement, "Username must be at least 3 characters in length");
            }
            // check if
            if (e.target.id === "signupEmail" && validate_email(e.target)==false){
                setInputError(inputElement, 'Invalid Email');
            }
        });         
    });

    // Avatar Selection: Submit Button
    avatarForm.addEventListener('submit', e =>{
        e.preventDefault();
        var avatarRadioChecked = document.querySelector('input[name="avatarRadio"]:checked')
        var avatarImgChecked = document.querySelector('img[for=' + avatarRadioChecked.id + ']')
        // Check if there's a Users in localstorage
        // If there isn't, create a new one and store the entered data
        // If there is, get the existing Users info, add the new one, 
        //      then write it to localstorage.
        if (localStorage.getItem('Users') != null){
            var storedUsers = getLocalStorage('Users');
            if (checkExisingUsers(storedUsers, newEmail)){
                setFormMessage(createAccountForm, 'error', 'Email already registered, Please login.');                
            }
            else{
                storedUsers.push({username: newUsername, email: newEmail, password: newPassword, avatar:avatarImgChecked.src});
                localStorage.setItem('Users', JSON.stringify(storedUsers));
                alert('Account created successfully! Now log in.');
                switch_form(avatarForm, loginForm);
            }
        }
        else{
            var storedUsers = [];
            storedUsers.push({username: newUsername, email: newEmail, password: newPassword, avatar:avatarImgChecked.src});
            localStorage.setItem('Users', JSON.stringify(storedUsers));
            alert('Account created successfully! Now log in.');
            switch_form(avatarForm, loginForm);
        }
    })

    // forget password form: Back to login link: 
    document.querySelector("#linkLoginFP").addEventListener("click", e => {
        e.preventDefault();
        switch_form(forgetPasswordForm, loginForm);
    });
});


