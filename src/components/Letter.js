import React, { useContext, useEffect } from 'react';
import './WordleSection.css';
import { AppContext } from '../components/WordleSection';

function Letter({ letterPos, attemptVal }) {
    const { board, correctWord, currAttempt, disabledLetters, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correctWordUpper = correctWord.toUpperCase();
    const guessArray = board[attemptVal].map((l) => l.toUpperCase());

    // Making sure checks happen after submitting an answer
    const isSubmitted = currAttempt.attempt > attemptVal;
    let letterState = "";

    if (isSubmitted) {
        // Count how often a letter shows up in the right word
        const letterCount = {};
        for (const char of correctWordUpper) {
            letterCount[char] = (letterCount[char] || 0) + 1;
        }

        // Track green letters
        const correctMatches = new Array(guessArray.length).fill(false);
        guessArray.forEach((char, index) => {
            if (char === correctWordUpper[index]) {
                correctMatches[index] = true;
                letterCount[char]--; // Reduce count for green letters
            }
        });

        // Track yellow letters
        const yellowMatches = new Array(guessArray.length).fill(false);
        guessArray.forEach((char, index) => {
            if (!correctMatches[index] && letterCount[char] > 0) {
                yellowMatches[index] = true; // Yellow
                letterCount[char]--; // Reduce available count for yellow letters
            }
        });

        // Color assignments
        if (correctMatches[letterPos]) {
            letterState = "correct"; // Green
        } else if (yellowMatches[letterPos]) {
            letterState = "almost"; // Yellow
        } else {
            letterState = "error"; // Gray
        }
    }

    // Disable used incorrect letters
    useEffect(() => {
        if (isSubmitted && letter !== "" && letterState === "error") {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currAttempt.attempt]);

    return <div className="letter" id={letterState}>{letter}</div>;
}



export default Letter;
