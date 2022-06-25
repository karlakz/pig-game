"use strict";
// Selecting Elements
const score0Elem = document.getElementById("score--0");
const score1Elem = document.querySelector("#score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const diceImgElement = document.querySelector(".dice");
const btnRollElement = document.querySelector(".btn--roll");
const btnNewElement = document.querySelector(".btn--new");
const btnHoldElement = document.querySelector(".btn--hold");

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceImgElement.classList.add("hidden");

  currentScore = 0;
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Pressing Roll Button
btnRollElement.addEventListener("click", function () {
  if (playing) {
    // 1.Generating a random dice number
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
    //   console.log(randomDiceNumber);
    //   2.Displaying the dice
    diceImgElement.classList.remove("hidden");
    diceImgElement.src = `images/dice-${randomDiceNumber}.png`;

    //   3. Check for rolled 1
    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber; //Add randomDiceNumber to current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   if true, switch to next player
      switchPlayer();
    }
  }
});

btnHoldElement.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      diceImgElement.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNewElement.addEventListener("click", init);
