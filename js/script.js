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

function askQuestion(trait) {
  if (gameState.gameOver) {
    return;
  }

gameState.questionsAsked++;

const answer = gameState.mysteryCharacter.traits[trait];

if (answer === true) {
  gameState.activeCharacters = gameState.activeCharacters.filter(
    character => character.traits[trait] === true
  );
} else {
  gameState.activeCharacters = gameState.activeCharacters.filter(
    character => character.traits[trait] === false
  );
}

gameState.charactersEliminated = characters.length - gameState.activeCharacters.length;

showFeedback(answer, trait);

updateStats();

renderCharacters();

console.log(`Question asked: ${trait}`);
console.log(`Answer: ${answer ? 'YES' : 'NO'}`);
console.log(`Characters left: ${gameState.activeCharacters.length}`);
}

function showFeedback(answer, trait) {
  console.log(`Feedback: ${answer ? 'YES' : 'NO'} for ${trait}`);
}

function makeGuess(character) {
  if (gameState.gameOver) {
    return;
  }

  gameState.gameOver = true;

  const isCorrect = character.id === gameState.mysteryCharacter.id;

  showGameOver(isCorrect, character);

  console.log(`You guessed: ${character.name}`);
  console.log(`Mystery was: ${gameState.mysteryCharacter.name}`);
  console.log(`Correct: ${isCorrect}`);
}

function showGameOver(isCorrect, guessedCharacter) {
  if (isCorrect) {
    modalTitle.textContent = 'Bravo! You won!';
    modalMessage.textContent = `Congrats! You correctly guessed ${guessedCharacter.name}!`;
  } else {
    modalTitle.textContent = 'Oh no. Wrong guess!';
    modalMessage.textContent = `I am sorry, mystery character was ${gameState.mysteryCharacter.name}. Better luck next time!`;
  }

  modalQuestions.textContent = gameState.questionsAsked;
  modalEliminated.textContent = gameState.charactersEliminated;

  gameOverModal.classList.remove('hidden');
}

questionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const trait = button.getAttribute('data-trait');
    askQuestion(trait);
  });
});

playAgainBtn.addEventListener('click', () => {
  initGame();
});
