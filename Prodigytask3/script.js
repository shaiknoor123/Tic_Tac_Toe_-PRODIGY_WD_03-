const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let cells = Array(9).fill(null);
let currentPlayer = 'X';

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        board.appendChild(cell);
    }
}

function makeMove(index) {
    if (cells[index] || checkWinner()) return;

    cells[index] = currentPlayer;
    updateBoard();
    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
    } else if (cells.every(cell => cell)) {
        message.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function updateBoard() {
    const cellElements = document.querySelectorAll('.cell');
    cellElements.forEach((cell, index) => {
        cell.textContent = cells[index];
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

resetButton.addEventListener('click', () => {
    cells.fill(null);
    currentPlayer = 'X';
    message.textContent = '';
    updateBoard();
});

createBoard();