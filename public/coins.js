async function addCoins(amount) {
    const username = localStorage.getItem('user');

    if (!username) {
        alert("please login first to earn coins!");
        return;
    }

    try {
        const response = await fetch('/update-coins', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                amount: amount
            })
        });
        const data = await response.json();

        if (data.success) {
            const coinDisplay = document.getElementById('coin-balance');
            if (coinDisplay) {
                coinDisplay.innerText = data.newBalance;
            }
            console.log("coins saved todb");
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Connection error:", error);
    }
}