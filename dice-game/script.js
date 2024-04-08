const listOfAllDice = document.querySelectorAll('.die')
const scoreInputs = document.querySelectorAll('#score-inputs input')
const scoreSpans = document.querySelectorAll('#score-options span')
const currentRoundText = document.getElementById('current-round')
const currentRoundRollsText = document.getElementById('current-round-rolls')
const totalScoreText = document.getElementById('total-score')
const scoreHistory = document.getElementById('score-history')
const rollDiceBtn = document.getElementById('roll-dice-btn')
const keepScoreBtn = document.getElementById('keep-score-btn')
const rulesContainer = document.querySelector('.rules-container')
const rulesBtn = document.getElementById('rules-btn')

// Show/hide rules container state
let isModalShowing = false

// Array that keeps the dice values for each round
let diceValuesArr = []

// Keep track of the number of rolls, current score and total score
let rolls = 0
let score = 0
let totalScore = 0

let round = 1

// Roll the dice algorithm
// When the user clicks on 'Roll the dice', 5 random numbers will
// be generated and displayed on the screen
function rollDice() {
  diceValuesArr = []

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1
    diceValuesArr.push(randomDice)
  }

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index]
  })
}

// Update the stats after each dice roll
function updateStats() {
  currentRoundText.textContent = round
  currentRoundRollsText.textContent = rolls
}

// Select an outcome after the roll and add points to the score
function updateRadioOption(optionNode, score) {
  
}
// Roll the dice event listener
rollDiceBtn.addEventListener('click', () => {
  if (rolls === 3) {
    alert('You have made three rolls this round. Please select a score')
  } else {
    rolls++
    rollDice()
  }
  updateStats()
})

// Toggle rules container visibility
rulesBtn.addEventListener('click', () => {
  isModalShowing = !isModalShowing

  if (isModalShowing) {
    rulesBtn.textContent = 'Hide Rules'
    rulesContainer.style.display = 'block'
  } else {
    rulesBtn.textContent = 'Show Rules'
    rulesContainer.style.display = 'none'
  }
})
