# Guess-Who-JS-Game
Guess Who? game reimagined for the web. Originally created by Ora and Theo Coster (Theora Design, 1979), licensed by Milton Bradley (Hasbro nowadays). Built with vanilla JavaScript, HTML and CSS as second project for _nology's training to become Full-Stack Engineer. Ask strategic questions to identify the mystery character from 24 options.

## Table of Contents

- [Game Overview](#-game-overview)
- [Features](#-features)
- [Demo](#-demo)
- [How to Play](#-how-to-play)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Design Features](#-design-features)
- [Technologies Used](#️-technologies-used)
- [Documentation](#-documentation)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)

##  Game Overview

Guess Who? is a two-player guessing game where players try to identify their opponent's mystery character by asking yes/no questions about physical attributes. In this single-player version, the computer randomly selects a mystery character, and you must deduce who it is through strategic questioning.

**Why This Project?**
This project was created as part of _nology's trainning to demonstrate proficiency in:
- Vanilla JavaScript programming
- DOM manipulation and event handling
- Responsive web design
- Game logic implementation
- Version control with Git

## Demo

**[Play the Game Live](https://nikomakr.github.io/Guess-Who-JS-Game/)** 

##  Technologies Used

- **HTML5**: Semantic markup for game structure
- **SCSS**: Styling with variables, nesting, and media queries
- **Vanilla JavaScript (ES6+)**: Game logic, DOM manipulation, event handling
- **CSS Grid**: Responsive character grid layout
- **Google Fonts**: Gaming fonts (Orbitron, Rajdhani, Exo 2)
- **Git & GitHub**: Version control and deployment
- **GitHub Pages**: Live deployment

##  Features

- **24 Unique Greek Characters**: Each with distinct traits (glasses, hat, beard, smile)
- **Strategic Binary Questioning**: Ask yes/no questions to eliminate characters
- **Visual Feedback**: Characters turn grey when eliminated based on answers
- **Live Statistics**: Real-time tracking of questions asked and characters remaining
- **Dynamic Character Rendering**: Grid populated via JavaScript for easy maintenance
- **Final Guess Mechanism**: Click any character card to make your guess
- **Win/Loss Detection**: Immediate modal feedback with game statistics
- **Play Again Functionality**: Restart with a new random mystery character
- **Responsive Design**: Adapts to mobile (2 cols), tablet (4 cols), desktop (6 cols)
- **Gaming Aesthetics**: Custom fonts and minimalistic styling

##  How to Play

1. The game randomly selects a mystery character (not visible to you)
2. Ask questions about traits by clicking the question buttons:
   - 👓 "Has Glasses?"
   - 🎩 "Wears a Hat?"
   - 🧔 "Has Beard?"
   - 😊 "Is Smiling?"
3. Characters that don't match the answer are automatically eliminated (greyed out)
4. Statistics update showing questions asked and characters remaining
5. Continue asking questions strategically to narrow down possibilities
6. Click on a character card to make your final guess
7. Modal appears showing if you won or lost, with your game statistics
8. Click "Play Again" to restart with a new mystery character
9. Try to guess correctly with the fewest questions possible!

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/nikomakr/Guess-Who-JS-Game.git
   cd Guess-Who-JS-Game
```

2. **Open the game**
   - Simply open `index.html` in your browser
   - Or use a local server:
   
   **Using Python:**
```bash
   python -m http.server 8000
   # Visit http://localhost:8000
```
   
   **Using Node.js:**
```bash
   npx http-server
   # Visit http://localhost:8080
```

### For Development (SCSS)

If you want to modify the styles:

1. **Install Sass** (if not already installed)
```bash
   npm install -g sass
```

2. **Watch SCSS files**
```bash
   sass --watch styles.scss:styles.css
```

3. **Edit `styles.scss`** - it will auto-compile to `styles.css`

## Documentation

### Game Logic Flow

1. **Initialization** (`initGame()`)
   - Random mystery character selection
   - Reset game state
   - Render all 24 characters
   - Update statistics display

2. **Question Handling** (`askQuestion()`)
   - Check mystery character's trait
   - Filter active characters based on answer
   - Update elimination count
   - Re-render grid with grey/colored states

3. **Guess Validation** (`makeGuess()`)
   - Compare selected character with mystery
   - Determine win/loss
   - Display modal with results

4. **Character Rendering** (`renderCharacters()`)
   - Clear existing grid
   - Create card elements dynamically
   - Apply eliminated state styling
   - Attach click event listeners

## Pseudocode 

1. User opens index.html in browser.
2. Browser loads interface, which displays "Guess Who?", score board, etc.
3. User starts the game by clicking on button of "Play".
4. Grid created and there are 24 characters visible to user.
5. Computer picks up randomly one character.
6. User chooses one of the four following questions to make:
        * "Has Glasses?"
        * "Wears a Hat?"
        * "Has Beard?"
        * "Is Smiling?"
7. Computer answers with Yes/No
8. Characters' get eliminated/greyed 
9. User chooses another question & the computer answers and results reflects on the screen as earlier
10. User choose one the colored character figures left on the grid, by clicking on the card.
11. Computer responses with Win/Try again respecting correct or not final answer.
12. Auto refreshes after a while or after user click "Play Again"

## Project Structure
```
Guess-Who-JS-Game/
├── index.html              # Main HTML structure
├── styles.scss             # SCSS source file
├── styles.css              # Compiled CSS (auto-generated)
├── styles.css.map          # Source map (auto-generated)
├── js/
│   ├── data.js            # 24 Greek character data
│   └── script.js          # Game logic and event handlers
├── README.md              # Project documentation
└── .gitignore            # Git ignore file
```

## Contributing

This is primarily an educational project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## Git commits - changelog

1. Date: 19/01/2026 Commit Message: Initial commit Commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/88c439783d1273457e8633d37df22bf8c30bc79e
2. Date: 19/01/2026 Commit Message: created and drafted README file including pseudocode Commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/4b5d52c60c5b19ce8192ad66744a6b91b94b9067
3. Date: 19/01/2026 Commit Message: created and drafted README file including pseudocode vol2 Commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/cbf8b4d4e98df517b9a1329d6357bb3e378afaf2
4. Date: 20/01/2026 Commit Message: HTML skeleton built, stats bar added, buttons, score, basic scs
s written, work in progress on script with characters creation Commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/169ad785f6f049b93294c06f381df259ad7ea877
5. Date: 21/01/2026 Commit Message: split data.js script.js into files fixed script loading added randomiser for character made dynamic grid by displaying characters added click eventlistener console clicks user makes Commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/f89136740cbe21eda9568420c6d2d2c85944df87
6. Date: 24/01/2026 Commit Message: Yesterdays work… Completed game logic with filtering, stats updating, and modal. Implemented questions filtering, characters rendering, and guess validation. Added event handlers for buttons and final guess click events. Created gameOver modal with win/lose popup and restart functionality. Added HTML modal structure and fixed button data-trait values. QA tested and fixed everything, verified correct coloured/grey character filtering. Commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/a13cafd753ff6c829cb07dd9e4274390a5b47cbe
7. Date: 24/01/2026 Commit Message: Commit Link:

## License

This project is open source and available for educational purposes.

**Note**: "Guess Who?" is a trademark of Hasbro. This is a non-commercial educational project inspired by the original game.

##  Author

Created as part of the **[_nology](https://nology.io/)** coding traineeship programme - Second project demonstrating JavaScript proficiency and game development skills.

**Nikolaos Makridiss**
- GitHub: [@nikomakr](https://github.com/nikomakr)
- Project: [Guess Who JS Game](https://github.com/nikomakr/Guess-Who-JS-Game)
- Live Demo: [Play Game](https://nikomakr.github.io/Guess-Who-JS-Game/)

##  Acknowledgements

- **_nology** for the coding traineership programme opportunity
- **Classic Guess Who?** game by Ora & Theo Coster (Theora Design, 1979), licensed by Milton Bradley (now Hasbro)
- **Google Fonts** for Crimson Pro and DM Mono typefaces
- **GitHub Pages** for free hosting