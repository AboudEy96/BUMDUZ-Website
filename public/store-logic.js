document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('user');
    if (username) {
        document.getElementById('display-username').innerText = username;
        fetchUserCoins(username);
    } else {
        console.log("No user logged in found in localStorage");
    }
});

async function fetchUserCoins(username) {
    try {
        const response = await fetch(`/get-coins/${username}`);
        const data = await response.json();
        if (data.success) {
            document.getElementById('coin-balance').innerText = data.coins;
        }
    } catch (err) {
        console.error("Error fetching coins:", err);
    }
}

async function buyCoins(amount) {
    const username = localStorage.getItem('user');

    if (!username) {
        alert("Please login first!");
        window.location.href = "auth.html";
        return;
    }

    try {
        const response = await fetch('/update-coins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, amount })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('coin-balance').innerText = data.newBalance;
            alert(`Success! Added ${amount} coins.`);
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error("Fetch error:", err);
        alert("Transaction failed! Check server connection.");
    }
}