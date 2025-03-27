    /* script.js */
    document.addEventListener("DOMContentLoaded", () => {
        const cells = document.querySelectorAll(".cell");
        const newGameBtn = document.querySelector(".new-game-btn");
        const resultScreen = document.querySelector(".result-screen");
        const resultMessage = document.getElementById("result-message");
        const restartBtn = document.querySelector(".restart-btn");
        const gameContainer = document.querySelector(".game-container");

        let board = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";
        let gameActive = true;
        
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        function checkWinner() {
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    gameActive = false;
                    showResult(`${board[a]} Wins!`);
                    return;
                }
            }
            if (!board.includes("")) {
                gameActive = false;
                showResult("It's a Draw!");
            }
        }

        function showResult(message) {
            resultMessage.textContent = message;
            resultScreen.style.display = "block";
            gameContainer.style.display = "none";
        }

        function restartGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            gameActive = true;
            currentPlayer = "X";
            cells.forEach(cell => {
                cell.textContent = "";
                cell.style.color = "black";
            });
            resultScreen.style.display = "none";
            gameContainer.style.display = "block";
        }

        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (board[index] === "" && gameActive) {
                    board[index] = currentPlayer;
                    cell.textContent = currentPlayer;
                    cell.style.color = currentPlayer === "X" ? "red" : "blue";
                    checkWinner();
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            });
        });

        newGameBtn.addEventListener("click", restartGame);
        restartBtn.addEventListener("click", restartGame);
        
        setTimeout(() => {
            document.querySelector(".splash-screen").style.display = "none";
            gameContainer.style.display = "block";
        }, 4500);
    });
