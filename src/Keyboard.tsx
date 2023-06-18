import styles from './Keyboard.module.css'
const Keys = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

type KeyboardProps ={
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter:string)=> void,
    disabled?: boolean
}

export function Keyboard({activeLetters, inactiveLetters, addGuessedLetter, disabled = false}:KeyboardProps){
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(75px,1fr))", gap:".5rem"}}>
        {Keys.map(key=>{
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return (
                <button onClick={()=>{
                    {addGuessedLetter(key)}
                }}
                className={`${styles.btn} ${isActive ? styles.active : ""} ${
                    isInactive ? styles.inactive : ""
                  }`} 
                  key={key}
                disabled = {isActive || isInactive || disabled}  
                >
                    {key}
                </button>
            )
        })}
    </div>
  )
}
