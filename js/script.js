// Game state management
const gameState = {
  mysteryCharacter: null,
  questionsAsked: 0,
  maxQuestions: 4,
  askedTraits: [],
  charactersEliminated: 0,
  activeCharacters: [],
  gameOver: false,
};

// DOM element references
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

// Audio feedback system
function playSound(type) {
  const audio = new Audio();

  if (type === "win") {
    audio.src =
      "https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3";
  } else if (type === "lose") {
    audio.src =
      "https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3";
  } else if (type === "start") {
    audio.src =
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3";
  } else if (type === "yes") {
    audio.src =
      "https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3";
  } else if (type === "no") {
    audio.src =
      "https://assets.mixkit.co/active_storage/sfx/1864/1864-preview.mp3";
  }

  audio.volume = 0.3;
  audio.play().catch((err) => {
    // Silently handle autoplay restrictions
  });
}

// Random color generator for trait visual variety
function getRandomTraitColor() {
  const colors = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#e67e22",
    "#16a085",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Character grid rendering with elimination state
function renderCharacters() {
  characterGrid.innerHTML = "";

  const shuffledCharacters = shuffleArray(characters);

  // Separate active and eliminated characters
  const activeChars = [];
  const eliminatedChars = [];

  shuffledCharacters.forEach((character) => {
    const isEliminated = !gameState.activeCharacters.find(
      (c) => c.id === character.id,
    );

    if (isEliminated) {
      eliminatedChars.push(character);
    } else {
      activeChars.push(character);
    }
  });

  // Display active characters first, then eliminated
  const orderedCharacters = [...activeChars, ...eliminatedChars];

  // Build character cards
  orderedCharacters.forEach((character) => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.setAttribute("data-id", character.id);

    const isEliminated = !gameState.activeCharacters.find(
      (c) => c.id === character.id,
    );
    if (isEliminated) {
      card.classList.add("eliminated");
    }

    // Generate trait list with random colors
    let traitsHTML = '<ul class="character-traits">';

    if (character.traits.glasses) {
      traitsHTML += `<li class="trait-item" style="color: ${getRandomTraitColor()}">Glasses</li>`;
    }
    if (character.traits.hat) {
      traitsHTML += `<li class="trait-item" style="color: ${getRandomTraitColor()}">Hat</li>`;
    }
    if (character.traits.beard) {
      traitsHTML += `<li class="trait-item" style="color: ${getRandomTraitColor()}">Beard</li>`;
    }
    if (character.traits.smile) {
      traitsHTML += `<li class="trait-item" style="color: ${getRandomTraitColor()}">Smile</li>`;
    }

    traitsHTML += "</ul>";

    card.innerHTML = `
      <div class="character-avatar">
          <img src="${character.avatarURL}" alt="${character.name}" class="avatar-image">
      </div>
      <h3 class="character-name">${character.name}</h3>
      ${traitsHTML}
    `;

    // Enable guessing on active characters only
    card.addEventListener("click", () => {
      if (!isEliminated && !gameState.gameOver) {
        makeGuess(character);
      }
    });

    characterGrid.appendChild(card);
  });
}

// Flash animation on game start/restart
function showGameStartAnimation() {
  const statsBar = document.querySelector(".stats-bar");
  const questionSection = document.querySelector(".question-section");
  const charactersSection = document.querySelector(".characters-section");

  statsBar.classList.add("flash-animation");
  questionSection.classList.add("flash-animation");
  charactersSection.classList.add("flash-animation");

  setTimeout(() => {
    statsBar.classList.remove("flash-animation");
    questionSection.classList.remove("flash-animation");
    charactersSection.classList.remove("flash-animation");
  }, 1000);
}

// Initialize or reset game state
function initGame(playStartSound = false) {
  // Select random mystery character
  const randomIndex = Math.floor(Math.random() * characters.length);
  gameState.mysteryCharacter = characters[randomIndex];

  // Reset game state
  gameState.questionsAsked = 0;
  gameState.askedTraits = [];
  gameState.charactersEliminated = 0;
  gameState.activeCharacters = [...characters];
  gameState.gameOver = false;

  // Update UI
  updateStats();
  renderCharacters();

  // Reset question buttons
  questionButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("asked");
    button.classList.remove("disabled");
  });

  // Hide game over modal
  if (gameOverModal) {
    gameOverModal.classList.add("hidden");
  }

  // Play start sound and animation
  if (playStartSound) {
    playSound("start");
  }
  showGameStartAnimation();
}

// Update stats display
function updateStats() {
  questionsAskedEl.textContent = `${gameState.questionsAsked}/${gameState.maxQuestions}`;
  charactersLeftEl.textContent = gameState.activeCharacters.length;
}

// Process trait-based question and filter characters
function askQuestion(trait) {
  // Prevent questions after game over
  if (gameState.gameOver) {
    return;
  }

  // Prevent duplicate questions
  if (gameState.askedTraits.includes(trait)) {
    return;
  }

  // Enforce question limit
  if (gameState.questionsAsked >= gameState.maxQuestions) {
    return;
  }

  // Update question tracking
  gameState.questionsAsked++;
  gameState.askedTraits.push(trait);

  // Get answer from mystery character
  const answer = gameState.mysteryCharacter.traits[trait];

  // Filter characters based on answer
  if (answer === true) {
    gameState.activeCharacters = gameState.activeCharacters.filter(
      (character) => character.traits[trait] === true,
    );
  } else {
    gameState.activeCharacters = gameState.activeCharacters.filter(
      (character) => character.traits[trait] === false,
    );
  }

  // Update elimination count
  gameState.charactersEliminated =
    characters.length - gameState.activeCharacters.length;

  // Provide audio and visual feedback
  playSound(answer ? "yes" : "no");
  animateTraitColors(trait);
  showFeedback(answer, trait);

  // Update UI
  updateStats();
  updateQuestionButtons();
  renderCharacters();
}

// Animate trait color cycling on question
function animateTraitColors(trait) {
  const traitMap = {
    glasses: "Glasses",
    hat: "Hat",
    beard: "Beard",
    smile: "Smile",
  };

  const traitText = traitMap[trait];

  const allCards = document.querySelectorAll(
    ".character-card:not(.eliminated)",
  );

  allCards.forEach((card) => {
    const traitItems = card.querySelectorAll(".trait-item");
    traitItems.forEach((item) => {
      if (item.textContent === traitText) {
        item.classList.add("color-cycle");

        setTimeout(() => {
          item.classList.remove("color-cycle");
        }, 3000);
      }
    });
  });
}

// Disable asked questions and enforce question limit
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

// Display YES/NO feedback message
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

// Process final character guess
function makeGuess(character) {
  if (gameState.gameOver) {
    return;
  }

  gameState.gameOver = true;

  const isCorrect = character.id === gameState.mysteryCharacter.id;

  showGameOver(isCorrect, character);
}

// Display game over modal with results
function showGameOver(isCorrect, guessedCharacter) {
  if (isCorrect) {
    modalTitle.textContent = "Bravo! You won!";
    modalMessage.textContent = `Congrats! You correctly guessed ${guessedCharacter.name}!`;
    playSound("win");
  } else {
    modalTitle.textContent = "Oh no. Wrong guess!";
    modalMessage.textContent = `I am sorry, mystery character was ${gameState.mysteryCharacter.name}. Better luck next time!`;
    playSound("lose");
  }

  modalQuestions.textContent = gameState.questionsAsked;
  modalEliminated.textContent = gameState.charactersEliminated;

  gameOverModal.classList.remove("hidden");
}

// Event listeners
questionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const trait = button.getAttribute("data-trait");
    askQuestion(trait);
  });
});

playAgainBtn.addEventListener("click", () => {
  initGame(true);
});

// Initialize game on page load
initGame(false);