const gameState = {
  mysteryCharacter: null,
  questionsAsked: 0,
  charactersEliminated: 0,
  activeCharacters: [],
  gameOver: false,
};

const characterGrid = document.getElementById("character-grid");
const questionsAskedEl = document.getElementById("questions-asked");
const charactersLeftEl = document.getElementById("characters-left");
const questionButtons = document.querySelectorAll(".question-btn");
const gameOverModal = document.getElementById("game-over-modal");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalQuestions = document.getElementById("modal-questions");
const modalEliminated = document.getElementById("modal-eliminated");
const playAgainBtn = document.getElementById("play-again");

function renderCharacters() {
  characterGrid.innerHTML = "";

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.setAttribute("data-id", character.id);

    const isEliminated = !gameState.activeCharacters.find(
      (c) => c.id === character.id,
    );
    if (isEliminated) {
      card.classList.add("eliminated");
    }

    card.innerHTML = `
            <div class="character-avatar">${character.emoji}</div>
            <h3 class="character-name">${character.name}</h3>
            <ul class="character-traits">
                <li>👓 Glasses: ${character.traits.glasses ? "Yes" : "No"}</li>
                <li>🎩 Hat: ${character.traits.hat ? "Yes" : "No"}</li>
                <li>🧔 Beard: ${character.traits.beard ? "Yes" : "No"}</li>
                <li>😊 Smile: ${character.traits.smile ? "Yes" : "No"}</li>
            </ul>
        `;

    card.addEventListener("click", () => {
      if (!isEliminated && !gameState.gameOver) {
        makeGuess(character);
      }
    });

    characterGrid.appendChild(card);
  });
}

function initGame() {
  const randomIndex = Math.floor(Math.random() * characters.length);
  gameState.mysteryCharacter = characters[randomIndex];

  gameState.questionsAsked = 0;
  gameState.charactersEliminated = 0;
  gameState.activeCharacters = [...characters];
  gameState.gameOver = false;

  updateStats();
  renderCharacters();

  if (gameOverModal) {
    gameOverModal.classList.add("hidden");
  }

  console.log("Mystery Character:", gameState.mysteryCharacter.name);
}

function updateStats() {
  questionsAskedEl.textContent = gameState.questionsAsked;
  charactersLeftEl.textContent = gameState.activeCharacters.length;
}

function makeGuess(character) {
  console.log("You clicked on:", character.name);
}

initGame();
