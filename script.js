const squares = document.querySelectorAll('.square');
const resetBtn = document.querySelector('.reset');
const newGameBtn = document.querySelector('.new-game');
const winnerText = document.querySelector('.winner');
const winnerDisplay = document.querySelector('.winning-display');
const gameContainer = document.querySelector('.container');

let playerX = true;
let xSquares = [];
let oSquares = [];
let winner;
let hasWinner = false;
let moves = 0;

const winningCombos = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];

function reset() {
  squares.forEach((square) => {
    square.classList.remove('taken');
    square.innerHTML = '';
  });
  gameContainer.classList.remove('is-blurred');
  winnerDisplay.classList.add('hidden');
  playerX = true;
  xSquares = [];
  oSquares = [];
  moves = 0;
  hasWinner = false;
}

function displayWinner() {
  winnerText.textContent = `${winner} wins!`;
  gameContainer.classList.add('is-blurred');
  winnerDisplay.classList.remove('hidden');
}
function displayDraw() {
  winnerText.textContent = `Drawn game!`;
  gameContainer.classList.add('is-blurred');
  winnerDisplay.classList.remove('hidden');
}

function checkWinner() {
  const isWinner = (array1, array2) =>
    array2.every((el) => array1.includes(el));

  winningCombos.forEach((item) => {
    if (isWinner(xSquares, item)) {
      winner = 'Player 1';
      displayWinner();
      hasWinner = true;
    }
    if (isWinner(oSquares, item)) {
      winner = 'Player 2';
      displayWinner();
      hasWinner = true;
    }
  });

  if (moves === 9 && !hasWinner) displayDraw();
}

squares.forEach((square) => {
  square.addEventListener('click', () => {
    if (square.classList.contains('taken')) return;
    if (!winnerDisplay.classList.contains('hidden')) return;
    if (playerX) {
      square.innerHTML = `<p>X</p>`;
      square.classList.add('taken');
      xSquares.push(square.dataset.number);
      playerX = false;
    } else {
      square.innerHTML = `<p>O</p>`;
      square.classList.add('taken');
      oSquares.push(square.dataset.number);
      playerX = true;
    }
    moves++;
    checkWinner();
  });
});

resetBtn.addEventListener('click', reset);
newGameBtn.addEventListener('click', reset);
