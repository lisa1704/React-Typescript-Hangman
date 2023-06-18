import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'
import words from './wordList.json'
import {useCallback, useState} from 'react'
import { useEffect } from "react"

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}


function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
console.log(wordToGuess)
const isLoser = incorrectLetters.length >= 6
const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },[guessedLetters, isLoser, isWinner])



useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    const key = e.key
    if (!key.match(/^[a-z]$/)) return

    e.preventDefault()
    addGuessedLetter(key)
  }

  document.addEventListener("keypress", handler)

  return () => {
    document.removeEventListener("keypress", handler)
  }
}, [guessedLetters])

useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    const key = e.key
    if (key !== "Enter") return

    e.preventDefault()
    setGuessedLetters([])
    setWordToGuess(getWord())
  }
  document.addEventListener("keypress", handler)
  return () => {
    document.removeEventListener("keypress", handler)
  }
}, [])

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection:"column",
      gap: "2rem",
      alignItems: "center",
      margin: "0 auto"
    }}>
      <div style={{
        fontSize:"2rem", textAlign:"center"
      }}>
        {isWinner && "Winner! - Refresh for new game"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangmanDrawing noOfGuesses = {incorrectLetters.length}/>
      <HangmanWord 
      guessedLetters = {guessedLetters} 
      wordToGuess = {wordToGuess}
      reveal = {isLoser}
      />
      <div style={{alignSelf:"stretch"}}>
      <Keyboard
      disabled ={isLoser || isWinner}
      activeLetters = {guessedLetters.filter(letter => 
        wordToGuess.includes(letter))}
      inactiveLetters = {incorrectLetters}
      addGuessedLetter = {addGuessedLetter}
      />
      </div>
      
    </div>
  )
}

export default App
