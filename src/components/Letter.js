import React, { useContext, useEffect } from 'react';
import './WordleSection.css';
import { AppContext } from '../components/WordleSection';

function Letter({ letterPos, attemptVal }) {
    const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correctWordUpper = correctWord.toUpperCase();
    const guessArray = board[attemptVal].map((l) => l.toUpperCase());

 
    const isSubmitted = currAttempt.attempt > attemptVal;
    let letterState = "";

    if (isSubmitted) {

        const letterCount = {};
        for (const char of correctWordUpper) {
            letterCount[char] = (letterCount[char] || 0) + 1;
        }


        const correctMatches = new Array(guessArray.length).fill(false);
        guessArray.forEach((char, index) => {
            if (char === correctWordUpper[index]) {
                correctMatches[index] = true;
                letterCount[char]--; // 
            }
        });


        if (correctMatches[letterPos]) {
            letterState = "correct"; 
        } else if (letterCount[letter] > 0) {
            letterState = "almost"; 
            letterCount[letter]--; 
        } else {
            letterState = "error"; 
        }
    }


    useEffect(() => {
        if (isSubmitted && letter !== "" && letterState === "error") {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currAttempt.attempt]);

    return <div className="letter" id={letterState}>{letter}</div>;
}


export default Letter;
