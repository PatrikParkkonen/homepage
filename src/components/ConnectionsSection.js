import React, { useState, useEffect } from "react";
import './ConnectionsSection.css';

// Current words and categories, no randomization yet
const words = [
    { word: "Apple", category: "Fruits" },
    { word: "Banana", category: "Fruits" },
    { word: "Orange", category: "Fruits" },
    { word: "Grapes", category: "Fruits" },
    { word: "Red", category: "Colors" },
    { word: "Blue", category: "Colors" },
    { word: "Green", category: "Colors" },
    { word: "Yellow", category: "Colors" },
    { word: "Piano", category: "Instruments" },
    { word: "Violin", category: "Instruments" },
    { word: "Drums", category: "Instruments" },
    { word: "Flute", category: "Instruments" },
    { word: "Cat", category: "Animals" },
    { word: "Dog", category: "Animals" },
    { word: "Elephant", category: "Animals" },
    { word: "Tiger", category: "Animals" }
  ];
  
  // Shuffling the board and assigning colors, orange instead of yellow for visibility
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  const categoryColors = ["orange", "green", "blue", "purple"];
  
  export default function ConnectionsGame() {
    const [shuffledWords, setShuffledWords] = useState([]);
    const [selected, setSelected] = useState([]);
    const [foundGroups, setFoundGroups] = useState([]);
    const [foundCategories, setFoundCategories] = useState([]);
    const [attempts, setAttempts] = useState(4);
    const [categoryColorMap, setCategoryColorMap] = useState({});
  
    useEffect(() => {
      setShuffledWords(shuffleArray([...words]));
      assignCategoryColors();
    }, []);
  
    // Color assignments
    const assignCategoryColors = () => {
      const uniqueCategories = [...new Set(words.map((w) => w.category))];
      const colorMap = {};
      uniqueCategories.forEach((category, index) => {
        colorMap[category] = categoryColors[index] || "gray";
      });
      setCategoryColorMap(colorMap);
    };
  
    const handleSelect = (word) => {
      if (foundGroups.includes(word) || attempts === 0) return;
      
      if (selected.includes(word)) {
        setSelected(selected.filter((w) => w !== word));
      } else if (selected.length < 4) {
        setSelected([...selected, word]);
      }
    };
  
    const checkSelection = () => {
      if (selected.length !== 4 || attempts === 0) return;
      
      const categorySet = new Set(selected.map((w) => w.category));
      if (categorySet.size === 1) {
        setFoundGroups([...foundGroups, ...selected]);
        setFoundCategories([...foundCategories, selected[0].category]);
      }
      setSelected([]);
      setAttempts(Math.max(0, attempts - 1));
    };
  
    return (
      <div className="game-container">
        <h1>Legally Distinct Connections</h1>
        <p>Attempts left: {attempts}</p>
        <div className="grid">
          {shuffledWords.map((item) => (
            <button
              key={item.word}
              className={`word ${selected.includes(item) ? "selected" : ""} ${foundGroups.includes(item) ? "found" : ""}`}
              style={{ backgroundColor: foundGroups.includes(item) ? categoryColorMap[item.category] : "" }}
              onClick={() => handleSelect(item)}
              disabled={foundGroups.includes(item) || attempts === 0}
            >
              {item.word}
            </button>
          ))}
        </div>
        <button className="check-btn" onClick={checkSelection} disabled={selected.length !== 4 || attempts === 0}>Check</button>
        {foundCategories.length > 0 && (
          <div className="categories-found">
            <h3>Categories Found:</h3>
            <ul>
              {foundCategories.map((category, index) => (
                <li key={index} style={{ color: categoryColorMap[category] }}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
        {attempts === 0 && foundCategories.length < 4 && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <h3>Correct Categories:</h3>
            <ul>
              {[...new Set(words.map(w => w.category))].map((category, index) => (
                <li key={index} style={{ color: categoryColorMap[category] }}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
        {foundGroups.length === words.length && <h2 className="win-message">You Win!</h2>}
      </div>
    );
  }