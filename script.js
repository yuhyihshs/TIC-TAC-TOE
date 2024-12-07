const board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

const boardElement = document.getElementById("game-board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

// Initialize board
function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.addEventListener("click", handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!board[index] && gameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner()) {
      statusElement.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell)) {
      statusElement.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

resetButton.addEventListener("click", resetGame);

// Start the game
createBoard();
statusElement.textContent = `Player ${currentPlayer}'s turn`;
