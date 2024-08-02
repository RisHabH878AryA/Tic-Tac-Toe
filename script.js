document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let isGameOver = false;

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

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return combination;
            }
        }
        return null;
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] !== '' || isGameOver) return;

        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winningCombination = checkWinner();
        if (winningCombination) {
            winningCombination.forEach(i => {
                board[i].classList.add('highlight');
            });
            alert(`Player ${currentPlayer} wins!`);
            isGameOver = true;
        } else if (!gameBoard.includes('')) {
            alert("It's a tie!");
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        board.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('highlight');
        });
        currentPlayer = 'X';
        isGameOver = false;
    }

    board.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
});
