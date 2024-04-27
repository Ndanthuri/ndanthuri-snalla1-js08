const game = new BaseballGame();

window.onload = function() {
    game.generateKey();
    updateKeyDisplay();
};


document.getElementById("new").addEventListener("click", () => {
    game.generateKey();
    updateKeyDisplay();
    clearTable();
});

function clearTable() {
    const tbody = document.getElementById("tbody-stat");
    tbody.innerHTML = "";
}

document.querySelectorAll(".digit").forEach(button => {
    button.addEventListener("click", () => {
        const digit = button.textContent;
        game.enterDigit(digit);
        const currentGuess = game.getGuess();
        updateGuessDisplay();

        button.disabled = true;

        if (game.isGuessComplete()) {
            const result = game.calculateResult();
            updateTable(currentGuess,result);
            updateGuessDisplay(true); 

            document.querySelectorAll(".digit").forEach(button => {
                button.disabled = false;
            });
            if (result.strikes === 3) {
                const message = `Strike Out ---\nThe key was ${game.getKey()}\n<New> to play again.`;
                alert(message);
            }
            
        }
    });
});


function updateKeyDisplay() {
    const keyDisplay = document.getElementById("key");
    keyDisplay.textContent = game.getKey().split('').join(',');
}

function updateGuessDisplay(clear = false) {
    const guessDisplay = document.getElementById("guess");
    if (clear) {
        guessDisplay.textContent = "";
    } else {
        const currentGuess = game.getGuess();
        guessDisplay.textContent = currentGuess.split("").join(",");
    }
}



function updateTable(currentGuess, result) {
    const tbody = document.getElementById("tbody-stat");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${currentGuess.split("").join(", ")}</td>
        <td>${result.balls}</td>
        <td>${result.strikes}</td>
    `;
    tbody.appendChild(row);
}