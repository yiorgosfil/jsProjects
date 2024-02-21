const calorieCounter = document.getElementById('calorie-counter')
const budgetNumberInput = document.getElementById('budget')
const entryDropdown = document.getElementById('entry-dropdown')
const andEntryButton = document.getElementById('add-entry')
const clearButton = document.getElementById('clear')
const output = document.getElementById('output')
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g
  return str.replace(regex, '')
}

function inInvalidInput(str) {
  const regex = /\d+e\d+/i
  return str.match(regex)
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`)
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Number</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />
    `
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString)
}

function getCaloriesFromInputs(list) {
  let calories = 0

  for (const item of list) {
    const currVal = cleanInputString(item.value)
    const invalidInputMatch = isInvalidInput(currVal)
  }
}
