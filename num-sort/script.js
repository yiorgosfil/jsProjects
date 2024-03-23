const sortButton = document.getElementById('sort')

// Function that applies the sort algorithm
function sortInputArray(event) {
  event.preventDefault()

  const inputValues = [
    ...document.getElementsByClassName('values-dropdown')
  ].map((dropdown) => Number(dropdown.value))

  const sortedValues = inputValues.sort((a, b) => {
    return a - b
  })

  updateUI(sortedValues)
}

// Displays the sorted array in the UI
function updateUI(array = []) {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`)
    outputValueNode.innerText = num
  })
}

// Bubble sort algorithm
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.lenght - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}

// Selection sort algorithm
function selectionSort(array) {  
  for (let i = 0; i < array.length; i++) 
}
