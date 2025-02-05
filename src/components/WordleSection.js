import React, { useEffect } from 'react';
import './WordleSection.css';
import Board from "./Board";
import Keyboard from "./Keyboard";
import GameOver from "./GameOver";
import { createContext, useState } from 'react';
import { boardDefault, generateWordSet } from './Words';

export const AppContext = createContext();

function WordleSection() {
    const [board, setBoard] = useState(boardDefault);
    const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
    const [wordSet, setWordSet] = useState(new Set());
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [correctWord, setCorrectWord] = useState("");
    const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});



    useEffect(() => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord.toUpperCase());
        });
    }, []);

    const onSelectLetter = (keyVal) => {
        if (currAttempt.letterPos >= 5) return; // Prevent the input of more than 5 letters
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
    };

    const onDelete = () => {
        if (currAttempt.letterPos === 0) return; // Disable Delete if there are no letters
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos -1] = "";     
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});              
    };

    const onEnter = () => {
        if (currAttempt.letterPos !== 5) return; // Disable Enter if there aren't 5 letters

        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i].toLowerCase();
        }

        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
        } else {
            alert("Word Not Found");
        }

        if (currWord.toUpperCase() === correctWord) {
            setGameOver({gameOver: true, guessedWord: true}); // End game as a win
            return;
        }

        if (currAttempt.attempt === 5) {
            setGameOver({gameOver: true, guessedWord: false}); // End game as a loss
        }


    };
    return (
        <div className='wordle-container'>
                <nav>
            <h1>Legally Distinct Wordle (beta)</h1>
            </nav>
            <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onDelete, onEnter, onSelectLetter, correctWord, setDisabledLetters, disabledLetters, setGameOver, gameOver}}>
                <div className="game">
                <Board />
                {gameOver.gameOver ? <GameOver /> : <Keyboard />}
                </div>
            </AppContext.Provider>

                
            </div>
        
    )
}

export default WordleSection;