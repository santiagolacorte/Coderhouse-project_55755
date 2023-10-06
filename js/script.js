document.addEventListener("DOMContentLoaded", function() {
    let gameData = {
        totalScore: 0,
        numbersClicked: []
    };

    let gameDuration = 60000;

    setTimeout(function() {
        clearInterval(interval);
        const gameOverElement = document.getElementById("game-over");
        gameOverElement.textContent = `Game finished. Total score: ${gameData.totalScore}`;
        gameOverElement.classList.add("show");

        // Convierte el objeto JSON a una cadena JSON y almacénalo localmente
        const jsonData = JSON.stringify(gameData);
        localStorage.setItem("gameData", jsonData);
    }, gameDuration);

    let interval = setInterval(function() {
        const numberObject = {
            value: Math.floor(Math.random() * 100),
            clicked: false
        };

        // Crea dinámicamente un número
        const numberElement = document.createElement("div");
        numberElement.textContent = numberObject.value;
        numberElement.className = "floating-number";

        // Posición aleatoria del número dentro del documento
        const xPos = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
        const yPos = window.innerHeight - window.innerHeight * 0.35;
        numberElement.style.left = xPos + "px";
        numberElement.style.top = yPos + "px";

        numberElement.addEventListener("click", function() {
            if (!numberObject.clicked) {
                numberObject.clicked = true;
                const clickedNumber = numberObject.value;
                if (clickedNumber % 3 === 0 && clickedNumber % 5 === 0) {
                    gameData.totalScore += 3;
                } else if (clickedNumber % 3 === 0 || clickedNumber % 5 === 0) {
                    gameData.totalScore += 1;
                } else {
                    gameData.totalScore -= 1;
                }

                gameData.numbersClicked.push(clickedNumber);

                updateScore(); 
                numberElement.remove();
            }
        });

        document.body.appendChild(numberElement);

        setTimeout(function() {
            if (!numberObject.clicked) {
                numberObject.clicked = true;
                numberElement.remove();
            }
        }, 7000);

    }, 1000);

    function updateScore() {
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = "Puntuación: " + gameData.totalScore;
    }
});
