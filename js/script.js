const gameState = {
  mysteryCharacter: null,
  questionsAsked: 0,
  maxQuestions: 4,
  askedTraits: [],
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

function playSound(type) {
  const audio = new Audio();
  
  if (type === 'win') {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
  } else if (type === 'lose') {
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3';
  }
  
  audio.volume = 0.3;
  audio.play().catch(err => {
    console.log('Sound play failed:', err);
  });
}

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
      <div class="character-avatar">
          <img src="${character.avatarURL}" alt="${character.name}" class="avatar-image">
      </div>
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
  gameState.askedTraits = [];
  gameState.charactersEliminated = 0;
  gameState.activeCharacters = [...characters];
  gameState.gameOver = false;

  updateStats();
  renderCharacters();

  questionButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("asked");
    button.classList.remove("disabled");
  });

  if (gameOverModal) {
    gameOverModal.classList.add("hidden");
  }

  // console.log("Mystery Character:", gameState.mysteryCharacter.name); // Leaving here for the moment for testing purposes.
}

function updateStats() {
  questionsAskedEl.textContent = `${gameState.questionsAsked}/${gameState.maxQuestions}`;
  charactersLeftEl.textContent = gameState.activeCharacters.length;
}

function askQuestion(trait) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.askedTraits.includes(trait)) {
    console.log("Question already asked!");
    return;
  }

  if (gameState.questionsAsked >= gameState.maxQuestions) {
    console.log("Maximum questions reached!");
    return;
  }

  gameState.questionsAsked++;
  gameState.askedTraits.push(trait);

  const answer = gameState.mysteryCharacter.traits[trait];

  if (answer === true) {
    gameState.activeCharacters = gameState.activeCharacters.filter(
      (character) => character.traits[trait] === true,
    );
  } else {
    gameState.activeCharacters = gameState.activeCharacters.filter(
      (character) => character.traits[trait] === false,
    );
  }

  gameState.charactersEliminated =
    characters.length - gameState.activeCharacters.length;

  showFeedback(answer, trait);
  updateStats();
  updateQuestionButtons();
  renderCharacters();

  console.log(`Question asked: ${trait}`);
  console.log(`Answer: ${answer ? "YES" : "NO"}`);
  console.log(`Characters left: ${gameState.activeCharacters.length}`);
  console.log(
    `Questions remaining: ${gameState.maxQuestions - gameState.questionsAsked}`,
  );
}

function updateQuestionButtons() {
  questionButtons.forEach((button) => {
    const trait = button.getAttribute("data-trait");

    if (gameState.askedTraits.includes(trait)) {
      button.disabled = true;
      button.classList.add("asked");
    }

    if (gameState.questionsAsked >= gameState.maxQuestions) {
      button.disabled = true;
      button.classList.add("disabled");
    }
  });
}

function showFeedback(answer, trait) {
  const feedbackEl = document.getElementById("feedback");

  feedbackEl.classList.remove("show", "yes", "no");

  const traitNames = {
    glasses: "glasses",
    hat: "a hat",
    beard: "a beard",
    smile: "smiling",
  };

  const icon = answer ? "✅" : "❌";
  const yesNo = answer ? "YES!" : "NO.";
  const hasOrNot = answer ? "has" : "doesn't have";
  const traitName = traitNames[trait] || trait;

  let message;
  if (trait === "smile") {
    message = answer
      ? `${icon} ${yesNo} The mystery character is smiling.`
      : `${icon} ${yesNo} The mystery character is not smiling.`;
  } else {
    message = `${icon} ${yesNo} The mystery character ${hasOrNot} ${traitName}.`;
  }

  feedbackEl.textContent = message;

  feedbackEl.classList.add(answer ? "yes" : "no");

  setTimeout(() => {
    feedbackEl.classList.add("show");
  }, 50);

  setTimeout(() => {
    feedbackEl.classList.remove("show");
  }, 3000);
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
    modalTitle.textContent = "Bravo! You won!";
    modalMessage.textContent = `Congrats! You correctly guessed ${guessedCharacter.name}!`;
    playSound('win');
  } else {
    modalTitle.textContent = "Oh no. Wrong guess!";
    modalMessage.textContent = `I am sorry, mystery character was ${gameState.mysteryCharacter.name}. Better luck next time!`;
    playSound('lose');
  }

  modalQuestions.textContent = gameState.questionsAsked;
  modalEliminated.textContent = gameState.charactersEliminated;

  gameOverModal.classList.remove("hidden");
}

questionButtons.forEach(button => {
  button.addEventListener("click", () => {
    const trait = button.getAttribute("data-trait");
    askQuestion(trait);
  });
});

playAgainBtn.addEventListener("click", () => {
  initGame();
});

initGame();