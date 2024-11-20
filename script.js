const gameBoard = document.getElementById("game-board");
const movesElement = document.getElementById("moves");
const timeElement = document.getElementById("time");
const restartButton = document.getElementById("restart-btn");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let interval;

// Iconos para las cartas
const icons = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍒", "🥭"];
const deck = [...icons, ...icons];

// Iniciar el juego
function initGame() {
  gameBoard.innerHTML = "";
  shuffledDeck = shuffleArray(deck);
  shuffledDeck.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
  resetGame();
}

// Reiniciar el estado del juego
function resetGame() {
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  timer = 0;
  movesElement.textContent = `Movimientos: ${moves}`;
  timeElement.textContent = `Tiempo: ${timer} segundos`;
  clearInterval(interval);
  interval = setInterval(updateTimer, 1000);
}

// Mezclar el mazo (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Actualizar el temporizador
function updateTimer() {
  timer++;
  timeElement.textContent = `Tiempo: ${timer} segundos`;
}

// Voltear una carta
function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) {
    return;
  }

  this.classList.add("flipped");
  this.textContent = this.dataset.icon;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Verificar si las cartas coinciden
function checkMatch() {
  moves++;
  movesElement.textContent = `Movimientos: ${moves}`;

  const [card1, card2] = flippedCards;
  if (card1.dataset.icon === card2.dataset.icon) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    if (matchedPairs === icons.length) {
      clearInterval(interval);
      alert(
        `¡Felicidades! Completaste el juego en ${moves} movimientos y ${timer} segundos.`
      );
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "";
      card2.textContent = "";
    }, 1000);
  }

  flippedCards = [];
}

// Reiniciar el juego al hacer clic en el botón
restartButton.addEventListener("click", initGame);

// Iniciar el juego al cargar la página
initGame();
