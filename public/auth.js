function toggleForm(e) {
    e.preventDefault();
    const title = document.getElementById('auth-title');
    const desc = document.getElementById('auth-desc');
    const btn = document.querySelector('.auth-btn');
    const toggleLink = document.getElementById('toggle-auth');

    if (title.innerText === "Login") {
        title.innerText = "Create new account";
        desc.innerText = "be member on BUMDUZ community and get all game updates!";
        btn.innerText = "Create account";
        toggleLink.innerText = "You have an account already? Login";
    } else {
        title.innerText = "Login";
        desc.innerText = "Enter your info to reach your BUMDUZ account";
        btn.innerText = "Continue";
        toggleLink.innerText = "Don't have an account? register";
    }
}
function handleSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    alert("Hello " + username + " test debug");
}