function sum(nums) {
  nums.reduce((acc, el) => acc + el, 0)
}

// Generate an array w/ a sequence of numbers from 'start' to 'end'
function range(start, end) {
  Array(end - start + 1) // Creates a new array w/ length 'end - start + 1'
    .fill(start) // Fills all elements in the array with the value 'start'
    .map((element, index) => element + index) // Maps over each element and ads 'index' to it
}

function charRange(start, end) {
  range(start.charCodeAt(0), end.charCodeAt(0))
    .map((code) => String.fromCharCode(code))
}

window.onload = () => {
  const container = document.getElementById('container')

  function createLabel(name) {
    const label = document.createElement('div')
    label.className = 'label'
    label.textContent = name
    container.appendChild(label)
  }

  const letters = charRange("A", "J")

  letters.forEach(createLabel)

  range(1, 99).forEach(number => {
    createLabel(number)
    letters.forEach(letter => {
      const input = document.createElement('input')
      input.type = 'text'
      input.id = letter + number
      input.ariaLabel = letter + number
      container.appendChild(input)
    })
  })
}

