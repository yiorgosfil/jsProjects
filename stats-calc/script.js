function getMean(array) {
  array.reduce((acc, el) => acc + el, 0) / array.length
}

function getMedian(array) {
  // .sort() mutates the function parameter which is bad practice
  // .slice() makes a shallow copy of the array that can be then mutated
  const sorted = array.slice().sort((a, b) => a - b)
  const median = 
    array.length === 0
    ? getMean([sorted[array.length / 2], sorted[array.length / 2 -1]])
    : sorted[Math.floor(sorted[array.length / 2])]
  return median
}

function getMode(array) {
  const counts = {}
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1
  })

  // Remember: key-value pairs -> Extract the values of the counts object and puts them in an array
  // The extracted values are used to create a new Set, and any duplicates are automatically removed
  // .size referes to the number of elements in the Set
  if (new Set(Object.values(counts)).size === 1) {
    return null
  }

  // In the sort method -> counts[b] > counts[a] then b comes  before a
  // [0] is accessing the first element in the sorted array
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a])[0]
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  )
  return mode.join(', ')
}

function getRange(array) {
  return Math.max(...array) - Math.min(...array)
}

function getVariance(array) {
  const mean = getMean(array)
  const variance = array.reduce((acc, el) => {
    const difference = el - mean
    const squared = difference ** 2
    return acc + squared
  }, 0) / array.length
  return variance
}

function getStandardDeviation(array) {
  const variance = getVariance(array)
  const standardDeviation = Math.sqrt(variance)
  return standardDeviation
  
}

function calculate() {
  // Retrieve the values of the HTML element with the ID of numbers
  const value = document.querySelector('#numbers').value

  // Takes the 'value' string and splits it into an array wherever there's a comma followed by optional whitespace
  const array = value.split(/,\s*/g)

  // Convert each element of the array to a number and filter out any non number elements
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el))

  const mean = getMean(numbers)
  const median = getMedian(numbers)
  const mode = getMode(numbers)
  const range = getRange(numbers)
  const variance = getVariance(numbers)
  const standardDeviation = getStandardDeviation(numbers)

  document.querySelector('#mean').textContent = mean
  document.querySelector('#median').textContent = median
  document.querySelector('#mode').textContent = mode
  document.querySelector('#range').textContent = range
  document.querySelector('#variance').textContent = variance
  document.querySelector('#standard-deviation').textContent = standardDeviation
}
