import React, { useState, useEffect } from "react";
import './SudokuSection.css';

const initialBoard = [
    [1, 0, 0, 0, 4, 6, 7, 0, 0],
    [3, 5, 0, 0, 2, 0, 0, 0, 0],
    [0, 2, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 8],
    [0, 3, 0, 2, 6, 8, 0, 5, 0],
    [7, 8, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 0],
    [0, 0, 0, 0, 8, 0, 0, 6, 1],
    [0, 0, 6, 9, 5, 0, 0, 0, 3]
  ];
  
  const solution = [
    [1, 9, 8, 3, 4, 6, 7, 2, 5],
    [3, 5, 4, 8, 2, 7, 9, 1, 6],
    [6, 2, 7, 5, 9, 1, 8, 3, 4],
    [2, 6, 1, 4, 7, 5, 3, 9, 8],
    [4, 3, 9, 2, 6, 8, 1, 5, 7],
    [7, 8, 5, 1, 3, 9, 6, 4, 2],
    [5, 7, 2, 6, 1, 3, 4, 8, 9],
    [9, 4, 3, 7, 8, 2, 5, 6, 1],
    [8, 1, 6, 9, 5, 4, 2, 7, 3]
  ];
  
  
  const SudokuSection = () => {
    const [board, setBoard] = useState(() => JSON.parse(JSON.stringify(initialBoard)));
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [gameWon, setGameWon] = useState(false);
    const [incorrectCells, setIncorrectCells] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    
  
    useEffect(() => {
        let interval;
        if (isRunning && !gameWon && !isPaused) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [isRunning, gameWon, isPaused]);

      const togglePause = () => {
        setIsPaused(!isPaused);
      };
  
    const handleCellChange = (row, col, value) => {
        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
        setIncorrectCells([]); // Clear previous errors
    
        // Check if board is complete
        const isComplete = newBoard.every(row => row.every(cell => cell !== 0));
        if (isComplete) checkSolution(newBoard);
      };
  
      const checkSolution = (currentBoard) => {
        const incorrect = [];
        let isCorrect = true;
    
        currentBoard.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell !== solution[i][j]) {
              incorrect.push({ row: i, col: j });
              isCorrect = false;
            }
          });
        });
    
        if (isCorrect) {
          setIsRunning(false);
          setGameWon(true);
          setIncorrectCells([]);
        } else {
          setIncorrectCells(incorrect);
        }
      };
  
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleNewGameClick = () => {
        if (window.confirm('Are you sure you want to restart the game?')) {
          resetGame();
        }
      };
  

    const resetGame = () => {
        setBoard(JSON.parse(JSON.stringify(initialBoard)));
        setTime(0);
        setIsRunning(true);
        setGameWon(false);
        setSelectedNumber(null);
      };
  
      return (
        <div className="app">
          <div className="game-header">
            <div className="timer">Time: {formatTime(time)}</div>
            <div className="controls">
              <button onClick={togglePause} className="pause-btn">
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button onClick={handleNewGameClick} className="new-game-btn">
                Restart
              </button>
            </div>
          </div>

        <div className={`board-container ${isPaused ? 'paused' : ''}`}>
          <div className="board">
            {board.map((row, i) => (
              <div key={i} className="row">
                {row.map((cell, j) => {
                  const isInitial = initialBoard[i][j] !== 0;
                  const isIncorrect = incorrectCells.some(
                    ic => ic.row === i && ic.col === j
                  );
                  return (
                    <Cell
                      key={`${i}-${j}`}
                      value={cell}
                      isFixed={isInitial}
                      isHighlighted={!isInitial && cell === selectedNumber}
                      isIncorrect={isIncorrect}
                      onChange={(value) => handleCellChange(i, j, value)}
                      onClick={() => !isInitial && setSelectedNumber(cell)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          {isPaused && <div className="pause-overlay">PAUSED</div>}
          </div>
    
          {gameWon && (
            <div className="game-over">
              <h2>Congratulations! You won!</h2>
              <p>Time: {formatTime(time)}</p>
            </div>
          )}
        </div>
      );
    }
  
    const Cell = ({ value, isFixed, isHighlighted, isIncorrect, onChange, onClick, isPaused }) => {
        const handleChange = (e) => {
          if (isFixed) return;
          const input = e.target.value;
          if (input === '' || (input >= 1 && input <= 9)) {
            onChange(input === '' ? 0 : parseInt(input));
          }
        };
      
        const handleKeyDown = (e) => {
          if (isFixed) return;
          if (e.key === 'Backspace' || e.key === 'Delete') {
            onChange(0);
            e.preventDefault();
          }
        };
  
        return (
            <input
              className={`cell
                ${isFixed ? 'fixed' : 'editable'}
                ${isHighlighted ? 'highlighted' : ''}
                ${isIncorrect ? 'incorrect' : ''}
              `}
              value={value !== 0 ? value : ''}
              readOnly={isFixed || isPaused}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onClick={onClick}
              maxLength="1"
              inputMode="numeric"
            />
          );
        };

export default SudokuSection;
