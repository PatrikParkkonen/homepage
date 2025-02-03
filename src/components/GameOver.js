import React, { useContext } from 'react';
import { AppContext } from '../components/WordleSection';


function GameOver() {
    const {gameOver, currAttempt, correctWord} = useContext(AppContext)
    return (
        <div className="gameOver">
            <h3>{gameOver.guessedWord ? "You win!" : "Oops! Too bad."}</h3>
            <h1>The correct word was: {correctWord.toUpperCase()}</h1>
            {gameOver.guessedWord && (<h3>You got it in {currAttempt.attempt} attempts!</h3>)}
        </div>
    )
}

export default GameOver;