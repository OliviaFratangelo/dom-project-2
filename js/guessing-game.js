/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm run test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/
class Game {
    constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    }

    difference () {
        return Math.abs(this.playersGuess - this.winningNumber);
    };

    isLower () {
        if(this.playersGuess < this.winningNumber) {
            return true;
        }
        else {
            return false;
        }
    };

    playersGuessSubmission(number) {
        if (!Number.isInteger(number)) {
            throw new Error("That is an invalid guess.");
          }
        if(number < 1) {
            throw new Error("That is an invalid guess.");
        }
        if(number > 100) {
            throw new Error("That is an invalid guess.");
        }
        
        this.playersGuess = number;
        let result = this.checkGuess(); 
        return result;
    }; 

      
    checkGuess() {
        if(this.playersGuess === this.winningNumber) {
           // console.log('You win!');
           return "You Win!";
        }
        else if (this.pastGuesses.includes(this.playersGuess)) {
            return "You have already guessed that number.";
          }
        else {
            this.pastGuesses.push(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                return "You Lose.";
            }
            else {
                let diff = this.difference();
            if(diff < 10) {
                return "You're burning up!";
            }
            if(diff < 25) {
                return "You're lukewarm.";
            }

            if(diff < 50) {
                return "You're a bit chilly.";
            }

            if(diff < 100) {
                return "You're ice cold!"
            }

            }
        }
            
        }
    

    provideHint() {
        let hintArray = [];
        hintArray.push(this.winningNumber);
        hintArray.push(generateWinningNumber());
        hintArray.push(generateWinningNumber());
        return shuffle(hintArray);
    }
}

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
} 

function shuffle(array) {
 for (let i = array.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [array[i], array[j]] = [array[j], array[i]];
 }
 return array;
}

function newGame() {
    return new Game();
}

const input = document.getElementById("guessSubmission");
const playersGuess = document.getElementById("playersGuess")
const hintButton = document.getElementById("hintButton");
const guessesLeft = document.getElementById("guessesLeft");
const winningNumber = document.getElementById("winningNumber");
const Check = document.getElementById("Check");
const hint = document.getElementById("Hint");
const pastGuesses = document.getElementById("pastGuesses");
const resetButton = document.getElementById("resetButton");
const gameInstance = newGame();

input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      try {
        const number = parseInt(input.value.trim());
        const result = gameInstance.playersGuessSubmission(number)
        guesses = 5
        console.log("Success!");
        input.value = "";
        playersGuess.textContent = `Your Guess: ${number}`;
        Check.textContent = result;
        pastGuesses.textContent = "Past Guesses: " + gameInstance.pastGuesses.join(", ");
        const guessesLeftCount = 5 - gameInstance.pastGuesses.length;
      guessesLeft.textContent = `Guesses Left: ${Math.max(0, guessesLeftCount)}`;
        } catch (error) {
        console.error(error.message);
        Check.textContent = "Error: Please enter a valid number between 1 and 100";
      }
       }
});

hintButton.addEventListener("click", () => {
    const hintArray = gameInstance.provideHint();
    hint.textContent = hintArray.join(", ");
});

resetButton.addEventListener("click", () => {
    gameInstance.playersGuess = null;
    gameInstance.pastGuesses = [];
    gameInstance.winningNumber = generateWinningNumber();
    console.log("Game reset!");
    guessesLeft.textContent = "Guesses Left: 5";
    pastGuesses.textContent = "Past Guesses: ";
  });
  
  









  