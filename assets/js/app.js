// sweetAlert function
function showAlert(title, comment, icon, button) {
  swal(title, comment, {
    icon: icon,
    buttons: {
      confirm: {
        className: button
      }
    }
  });
}

// submit number from guessForm and check for correct guess
const guessFormEl = document.querySelector('#guessForm');
const guessedNumberEl = document.querySelector('#guessedNumber');
let numberOfGuesses = 0;
const guessSlotEl = document.querySelector('#guessSlot');
const remainingGuessEl = document.querySelector('#remainingGuess');
const displayMessagEl = document.querySelector('#displayMessag');
const startNewGameEl = document.querySelector('#startNewGameBtn');
let startNewGame = false;
const submitGuessBtnEl = document.querySelector('#submitGuessBtn');

// generate a random number between 1 and 100
let randomNumber = parseInt((Math.random() * 100) + 1);

// guessFormEl submit function
guessFormEl.onsubmit = (e) => {
  e.preventDefault();
  // get guess value from user
  const guessValue = parseInt(guessedNumberEl.value);
  validateGuess(guessValue);
}

// record of guesses
let previousGuesses = [];

// check if guess is correct
function validateGuess(guess) {
  if (isNaN(guess)) {
    showAlert("Error", "Please submit a valid number", "error", "btn btn-primary");
  } else if (guess < 1) {
    showAlert("Error", "Please enter a number that is greater than 0", "error", "btn btn-primary");
  } else if (guess > 100) {
    showAlert("Error", "Please enter a number that is not greater than 100", "error", "btn btn-primary");
  } else {
    // add attempted guess to previousGuesses array
    previousGuesses.push(guess);

    // check if game is over
    if (numberOfGuesses === 9) {
      displayGueses(guess)
      displayMessage("Game over, you've run out of attempts");
      endGame();
    } else {
      // display previous guesses 
      displayGueses(guess)
      // check guess and display if worng
      checkGuess(guess)
    }
  }
}

// check user guess
function checkGuess(guess) {
  // random number hint
  if (guess === randomNumber) {
    showAlert("Congratulations", "You guessed correctly", "success", "btn btn-primary");
    displayMessage("Congratulations, you guessed correctly");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Too low, try again!!");
  } else if (guess > randomNumber) {
    displayMessage("Too high, try again!!");
  }
}

function displayMessage(message) {
  displayMessagEl.innerHTML = message;
}

// display guesses in browser
function displayGueses(guess) {
  guessedNumberEl.value = '';
  guessSlotEl.innerHTML += `${guess} `;
  numberOfGuesses++;
  remainingGuessEl.classList.remove('d-none');
  remainingGuessEl.innerHTML = `You have ${10 - numberOfGuesses} attempts remaining`;
}

// end game function
function endGame() {
  // clear user input
  guessedNumberEl.value = '';
  // disaple the userInput
  guessedNumberEl.setAttribute('disabled', '');
  // display start new game button
  startNewGameEl.classList.remove('d-none');
  // hide submit button
  submitGuessBtnEl.classList.add('d-none');
}

// start new game function
function newGame() {
  startNewGameEl.classList.add('d-none');
  startNewGame = true;
  if (startNewGame) {
    submitGuessBtnEl.classList.remove('d-none');
    randomNumber = parseInt((Math.random() * 100) + 1);
    previousGuesses = [];
    numberOfGuesses = 0;
    guessSlotEl.innerHTML = '';
    displayMessage('');
    remainingGuessEl.innerHTML = `You have ${10 - numberOfGuesses} attempts remaining`;
    guessedNumberEl.removeAttribute("disabled");
  }
}