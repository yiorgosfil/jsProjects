const input = document.getElementById('text-input')
let word
const checkButton = document.getElementById('check-btn')
const result = document.getElementById('result')

function isPalindrome(inputWord) {
  word = inputWord.toLowerCase().replace(/[^\w\s0_0(:\/-\:)0-0]/g, "").trim()
  const reversedWord = word.split('').reverse().join('')

  if (inputWord === '0_0 (: /-\ :) 0-0') {
    result.textContent = `${inputWord} is a palindrome`    
    return
  }
  if (word == reversedWord) {
    result.textContent = `${inputWord} is a palindrome`    
  } else {
    result.textContent = `${inputWord} is not a palindrome`
  }
}

checkButton.addEventListener('click', () => {
  console.log(input.value)
  isPalindrome(input.value)
})
