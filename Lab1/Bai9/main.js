
function login() {
    var txtUsername = document.getElementById("username").value;
    var txtPassword = document.getElementById("password").value;
    
    if (txtUsername == 'admin' && txtPassword == '123') {
        document.write('Login success!');
    } else {
        alert('Login fail! Please check your username and password!')
    }
}

function reset() {
    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
}