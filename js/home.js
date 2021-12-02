function getLocalStorage(name){
    let name_array = JSON.parse(localStorage.getItem(name)) || [];
    return name_array;
}

function logout(){
    sessionStorage.setItem('LoggedIn', 'false');
}

document.addEventListener("DOMContentLoaded", () => {
    // check if users are logged in:
    var loginStatus = sessionStorage.getItem('LoggedIn');
    var storedUsers = getLocalStorage('Users');
    var loggedInUser = storedUsers.filter(obj => {return obj.email===loginStatus});
    var loggedInUser = loggedInUser[0];
    if (loggedInUser == null){
        location.replace('login.html');
    }
    // User logged in, load content
    // welcome message
    welcomeMessage = document.getElementById('homeWelcome');
    welcomeMessage.innerHTML = ('Welcome, '+loggedInUser.username);
    // set avatar
    userAvatar = document.getElementById('userAvatar')
    userAvatar.src = loggedInUser.avatar;
})