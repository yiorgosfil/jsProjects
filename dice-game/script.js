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

// 'Full house' is when 'Three of a kind' and a pair rolls
// This gives 25points
function detectFullHouse(arr) {
  const counts = {}

  for (let num of counts) {
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }

  // Object.values(counts) creates an array with the values of 'counts'
  const hasThreeOfAKind = Object.values(counts).includes(3)
  const hasPair = Object.values(counts).includes(2)

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25)
  }

  updateRadioOption(5, 0)
}

// Check for a straight 'Ex. 1234' that gives a score of 30points
// A large straight 'Ex. 12345'gives a score of 40points
function checkForStraights(arr) {
  const sortedNumbersArr = arr.sort((a, b) => a - b)

  // A Set on the array will give only the uniwue values in the array
  // We convert the Set to arrray with the spread operator
  const uniqueNumbersArr = [...new Set(sortedNumbersArr)]

  const uniqueNumbersStr = uniqueNumbersArr.join('')

  const smallStraightsArr = ['1234', '2345', '3456']
  const largeStraightsArr = ['12345', '23456']

  for (const straight of smallStraightsArr) {
    if (uniqueNumbersStr.includes(straight)) {
      updateRadioOption(3, 30)
    }
  }
  if (largeStraightsArr.includes(uniqueNumbersStr)) {
    updateRadioOption(4, 40)
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

// Reset the game
function resetGame() {
  diceValuesArr = [0, 0, 0, 0, 0]
  score = 0
  totalScore = 0
  round = 1
  rolls = 0

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index]
  })

  totalScoreText.textContent = totalScore
  scoreHistory.innerHTML = ''

  currentRoundRollsText.textContent = rolls
  currentRoundText.textContent = round

  resetRadioOption()
}

// Roll the dice event listener
rollDiceBtn.addEventListener('click', () => {
  if (rolls === 3) {
    alert('You have made three rolls this round. Please select a score')
  } else {
    rolls++
    resetRadioOption()
    rollDice()
    updateStats()
    getHighestDuplicates(diceValuesArr)
    detectFullHouse(diceValuesArr)
    checkForStraights(diceValuesArr)
  }
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
        resetGame()
      }, 500)
    }
  } else {
    alert('Please select an option or roll the dice')
  }
})
