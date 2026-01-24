function toggleForm(e) {
    e.preventDefault();
    const title = document.getElementById('auth-title');
    const desc = document.getElementById('auth-desc');
    const btn = document.querySelector('.auth-btn');
    const toggleLink = document.getElementById('toggle-auth');

    if (title.innerText === "Login") {
        title.innerText = "Create account";
        desc.innerText = "Join BUMDUZ community now!";
        btn.innerText = "Register";
        toggleLink.innerText = "Already have an account? Login";
    } else {
        title.innerText = "Login";
        desc.innerText = "Enter your info to reach your account";
        btn.innerText = "Continue";
        toggleLink.innerText = "Don't have an account? Register";
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const title = document.getElementById('auth-title').innerText;

    const endpoint = (title === "Login") ? "/login" : "/register";

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            alert(data.message || "Success!");
            if (endpoint === "/login") {
                localStorage.setItem('user', data.username);
                window.location.href = "store.html";
            }
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        alert("Srever connection failed");
    }
}