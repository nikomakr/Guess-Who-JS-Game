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

##  Technologies Used

- Vanilla JavaScript programming
- DOM manipulation and event handling
- Responsive web design
- Game logic implementation
- Version control with Git

##  Features

- **24 Unique Characters**: Each with distinct characteristics (glasses, hat, beard, smile)
- **Strategic Questioning Binary Answers**: Ask yes/no questions to eliminate characters
- **Visual Feedback**: Characters are eliminated visually based on your questions
- **Question Tracking**: Monitor how many questions you've asked
- **Final Guess**: Click on any remaining character to make your final guess
- **Win/Loss Detection**: Immediate feedback on your guess with game statistics
- **Responsive Design**: Works seamlessly on different size screens: mobile, tablet, desktop
- **Prersentable UI**: Appealing aesthetics with some animations

##  How to Play

1. The game randomly selects a mystery character (not visible to you)
2. Ask questions about traits by clicking the question buttons:
   - "Has Glasses?"
   - "Wears a Hat?"
   - "Has Beard?"
   - "Is Smiling?"
3. Characters that don't match the answer are automatically eliminated (greyed out)
4. Continue asking questions until you can identify the mystery character
5. Click on a character card to make your final guess
6. Try to guess correctly with the fewest questions possible!

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


## Git commits - changelog

1. Date: 19/01/2026 Name: Initial commit Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/88c439783d1273457e8633d37df22bf8c30bc79e
2. Date: 19/01/2026 Name: created and drafted README file including pseudocode Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/4b5d52c60c5b19ce8192ad66744a6b91b94b9067
3. Date: 19/01/2026 Name: created and drafted README file including pseudocode vol2 Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/cbf8b4d4e98df517b9a1329d6357bb3e378afaf2
4. Date: 20/01/2026 Name: HTML skeleton built, stats bar added, buttons, score, basic scs
s written, work in progress on script with characters creation Link: https://github.com/nikomakr/Guess-Who-JS-Game/commit/169ad785f6f049b93294c06f381df259ad7ea877
5. Date: 21/01/2026 Name: Link: 


##  Author

Created as part of the **[_nology](https://nology.io/)** coding traineeship programme - Second project demonstrating JavaScript proficiency and game development skills.

##  Acknowledgements

- **_nology** for the coding traineership programme opportunity
- **Classic Guess Who?** game by Ora & Theo Coster (Theora Design, 1979), licensed by Milton Bradley (now Hasbro)
- **Google Fonts** for Crimson Pro and DM Mono typefaces