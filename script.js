const board = document.getElementById("gameBoard");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const newGameBtn = document.getElementById("newGame");
const message = document.getElementById("message");

let cards = ["A","A","B","B","C","C","D","D"];
let firstCard = null;
let secondCard = null;
let moves = 0;
let matched = 0;
let time = 0;
let interval;

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    board.innerHTML = "";
    shuffleCards();

    cards.forEach(letter => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = letter;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

// Flip card
function flipCard() {

    if (this.classList.contains("flipped")) return;

    if (moves === 0 && time === 0) {
        startTimer();
    }

    this.textContent = this.dataset.value;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        movesText.textContent = moves;
        checkMatch();
    }
}

// Check if cards match
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matched++;
        resetCards();

        if (matched === cards.length / 2) {
            clearInterval(interval);
            message.textContent = "Congratulations! You Won!";
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    }
}

// Reset selected cards
function resetCards() {
    firstCard = null;
    secondCard = null;
}

// Start timer
function startTimer() {
    interval = setInterval(() => {
        time++;
        timerText.textContent = time;
    }, 1000);
}

// New Game
newGameBtn.addEventListener("click", function() {
    moves = 0;
    matched = 0;
    time = 0;
    movesText.textContent = 0;
    timerText.textContent = 0;
    message.textContent = "";
    clearInterval(interval);
    createBoard();
});

createBoard();