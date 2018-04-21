function setUser(user) {
    localStorage.user = user;
}

function getUser() {
    return localStorage.getItem("user");
}

function resetUser() {
    localStorage.user = "UserNotfound";
}