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
  scoreInputs[optionNode].disabled = false
  scoreInputs[optionNode].value = score
  scoreSpans[optionNode].textContent = `, score = ${score}`
}

// Keep the score and move onto the next round
function updateScore(selectedValue, achieved) {
  totalScore += parseInt(selectedValue)
  totalScoreText.textContent = totalScore

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`
}

// Track any duplicates found in the 'diceValuesArr' and
// display a score next to the first two radio buttons
function getHighestDuplicates(arr) {
  const counts = {}

  // Count occurencies of elements in an array
  for (const num of arr) {
    if (counts[num]) {
      counts[num]++
    } else {
      counts[num] = 1
    }
  }

  // Keep track of when a number appears 3 or 4 times in the 'arr'
  let highestCount = 0

  for (const num of arr) {
    // Get current duplicate count for each number in the 'arr'
    const count = counts[num]
    if (count >= 3 && count > highestCount) {
      highestCount = count
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count
    }
  }

  // Score totalling the sum of all five values for rolls
  // That are "Three of a kind" or "Four of a kind"
  const sumOfAllDice = diceValuesArr.reduce((a, b) => a + b, 0)

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice)
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice)
  }

  updateRadioOption(5, 0)
}

// Before each roll, reset 'inputs' and 'spans' score values
function resetRadioOption() {
  scoreInputs.forEach((input) => {
    input.disabled = true
    input.checked = false
  })

  scoreSpans.forEach((span) => {
    span.textContent = ''
  })
}

// Roll the dice event listener
rollDiceBtn.addEventListener('click', () => {
  if (rolls === 3) {
    alert('You have made three rolls this round. Please select a score')
  } else {
    rolls++
    resetRadioOption()
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

// Keep score event listener
keepScoreBtn.addEventListener('click', () => {
  let selectedValue
  let achieved

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value
      achieved = radioButton.id
      break
    }
  }

  if (selectedValue) {
    rolls = 0
    round++
    updateStats()
    resetRadioOption()
    updateScore(selectedValue, achieved)
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${totalScore}`)
      }, 500)
    }
  } else {
    alert('Please select an option or roll the dice')
  }
})
