const gameBoard = document.getElementById("gameBoard");
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
let cards = [...cardValues, ...cardValues]; // Duplicate cards for pairs
let firstCard, secondCard;
let isFlipping = false;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create card elements
cards.forEach(value => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.innerText = ""; // Initially, hide the card value
  gameBoard.appendChild(card);

  card.addEventListener("click", () => {
    if (isFlipping || card === firstCard || card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.innerText = value;

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      isFlipping = true;

      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetCards();
      } else {
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          firstCard.innerText = "";
          secondCard.classList.remove("flipped");
          secondCard.innerText = "";
          resetCards();
        }, 1000);
      }
    }
  });
});

function resetCards() {
  [firstCard, secondCard, isFlipping] = [null, null, false];
}