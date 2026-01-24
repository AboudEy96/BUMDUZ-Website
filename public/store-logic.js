document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('user');
    if (username) {
        document.getElementById('display-username').innerText = username;
        fetchUserCoins(username);
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
            alert(`Success! You added ${amount} coins to your account.`);
        }
    } catch (err) {
        alert("Transaction failed!");
    }
}