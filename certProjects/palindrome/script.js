const input = document.getElementById('text-input')
const inputValue = input.value
console.log(inputValue)
let word
const checkButton = document.getElementById('check-btn')
const result = document.getElementById('result')

function isPalindrome(inputWord) {
  const word = inputWord.toLowerCase().replace(/\W/g, "").trim()
  const reversedWord = word.split('').reverse().join('')
  console.log(word)
  if (word == reversedWord) {
    result.textContent = `${word} is a palindrome`    
  } else {
    result.textContent = `${word} is not a palindrome`
  }
}

checkButton.addEventListener('click', () => {
  isPalindrome(inputValue)
})
