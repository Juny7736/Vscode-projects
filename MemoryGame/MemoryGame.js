document.addEventListener("DOMContentLoaded", function () {
  createGameBoard();
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", restartGame);
});

const symbols = [
  "🍎",
  "🍌",
  "🍒",
  "🍉",
  "🍇",
  "🥝",
  "🍓",
  "🍊",
  "🍋",
  "🍍",
  "🥭",
  "🍑",
];
const totalPairs = 12;

let cards = [];
let selectedCards = [];

function createGameBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  selectedCards = [];

  const duplicatedSymbols = [...symbols, ...symbols];
  const shuffledSymbols = shuffleSymbols(duplicatedSymbols);

  for (let i = 0; i < totalPairs * 2; i++) {
    const symbol = shuffledSymbols[i];
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
    cards.push(card);
  }
}

function shuffleSymbols(symbols) {
  const shuffledSymbols = symbols.slice();
  for (let i = shuffledSymbols.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSymbols[i], shuffledSymbols[j]] = [
      shuffledSymbols[j],
      shuffledSymbols[i],
    ];
  }
  return shuffledSymbols;
}

function flipCard(card) {
  if (
    selectedCards.length < 2 &&
    !selectedCards.includes(card) &&
    !card.classList.contains("matched")
  ) {
    card.classList.add("flip");
    card.textContent = card.dataset.symbol;
    selectedCards.push(card);
    if (selectedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [firstCard, secondCard] = selectedCards;
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    selectedCards.forEach((card) => {
      card.classList.add("matched");
      card.removeEventListener("click", () => flipCard(card));
    });
  } else {
    selectedCards.forEach((card) => {
      card.textContent = "?";
      card.classList.remove("flip");
    });
  }
  selectedCards = [];
  checkWin();
}

function checkWin() {
  if (cards.every((card) => card.classList.contains("matched"))) {
    alert("Congratulations! You win!");
  }
}

function restartGame() {
  shuffleSymbols(symbols);
  createGameBoard();
}
