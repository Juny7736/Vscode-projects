document.addEventListener("DOMContentLoaded", function () {
  createGameBoard();
});

const symbols = ["🍎", "🍌", "🍒", "🍉", "🍇", "🥝", "🍓", "🍊", "🍋"]; // Add more symbols if needed
const totalPairs = 9; // Set the number of pairs here

let cards = [];
let selectedCards = [];

function createGameBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  selectedCards = [];
  for (let i = 0; i < totalPairs * 2; i++) {
    const symbol = symbols[i % totalPairs];
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
    cards.push(card);
  }
}

function flipCard(card) {
  if (
    selectedCards.length < 2 &&
    !selectedCards.includes(card) &&
    !card.classList.contains("matched")
  ) {
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
    selectedCards.forEach((card) => (card.textContent = "?"));
  }
  selectedCards = [];
  checkWin();
}

function checkWin() {
  if (cards.every((card) => card.classList.contains("matched"))) {
    alert("Congratulations! You win!");
  }
}

document.getElementById("restartButton").addEventListener("click", () => {
  console.log("Restart button clicked"); // Check if the event listener is triggered

  // Shuffle the cards array
  shuffleCards();
  console.log("Cards shuffled"); // Check if cards are shuffled

  // Remove the "matched" class and reset the text content of all cards
  cards.forEach((card) => {
    card.classList.remove("matched");
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
  });
  console.log("Cards reset"); // Check if cards are reset

  selectedCards = []; // Reset selectedCards array

  // Regenerate the game board with shuffled cards
  createGameBoard();
});
