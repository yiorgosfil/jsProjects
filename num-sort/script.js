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
  for (let i = 0; i < array.length; i++) {
    let minIndex = i
  
    // Find the index of the minimum element in the remaining unsorted portion
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    // Swap the minimum element with the first element in the unsorted portion
    const temp = array[i]
    array[i] = array[minIndex]
    array[minIndex] = temp
  }
  return array
}

// Insertion sort algorithm
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j]
      j--      
    }
    array[j + 1] = currValue
  }
  return array
}

sortButton.addEventListener('click', sortInputArray)
