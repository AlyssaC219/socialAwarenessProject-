/* Contributor: Alyssa Chen
*/

/** Contributor: Alyssa Chen
 * retrieve locally stored JSON data and parse them into an array
 * @param {*} name 
 * @returns 
 */
function getLocalStorage(name){
    let name_array = JSON.parse(localStorage.getItem(name)) || [];
    return name_array;
}
/** Contributor: Alyssa Chen
 * log the current user out by setting 'LoggedIn' to false
 */
function logout(){
    sessionStorage.setItem('LoggedIn', 'false');
}

document.addEventListener("DOMContentLoaded", () => {
    /* 
    Contributor: Alyssa Chen
    */ 
    // check if users are logged in:
    var loginStatus = sessionStorage.getItem('LoggedIn');
    var storedUsers = getLocalStorage('Users');
    var loggedInUser = storedUsers.filter(obj => {return obj.email===loginStatus});
    var loggedInUser = loggedInUser[0];
    /*if (loggedInUser == null){
        location.replace('login.html');
    }*/
    // User logged in, load content
    // set avatar
    userAvatar = document.getElementById('userAvatar')
    userAvatar.src = loggedInUser.avatar;

    
})

