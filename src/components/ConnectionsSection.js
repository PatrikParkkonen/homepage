import React, { useState, useEffect } from "react";
import './ConnectionsSection.css';

// Current words and categories
const words = [
    { word: "Gold", category: "Shades of yellow", position: [0, 0] },
    { word: "Mango", category: "Shades of yellow", position: [1, 1] },
    { word: "Citrine", category: "Shades of yellow", position: [1, 2] },
    { word: "Saffron", category: "Shades of yellow", position: [3, 2] },
    { word: "Python", category: "Programming languages", position: [1, 3] },
    { word: "Ruby", category: "Programming languages", position: [0, 1] },
    { word: "Rust", category: "Programming languages", position: [3, 3] },
    { word: "Go", category: "Programming languages", position: [3, 1] },
    { word: "Stop", category: "Types of watches", position: [3, 0] },
    { word: "Smart", category: "Types of watches", position: [2, 2] },
    { word: "Analog", category: "Types of watches", position: [2, 0] },
    { word: "Dress", category: "Types of watches", position: [0, 3] },
    { word: "Screen", category: "Words that start with Touch", position: [1, 0] },
    { word: "Pad", category: "Words that start with Touch", position: [2, 1] },
    { word: "Down", category: "Words that start with Touch", position: [2, 3] },
    { word: "Back", category: "Words that start with Touch", position: [0, 2] }
  ];
  

  const categoryColors = ["orange", "green", "blue", "purple"];
  
  export default function ConnectionsGame() {
    const [selected, setSelected] = useState([]);
    const [foundGroups, setFoundGroups] = useState([]);
    const [foundCategories, setFoundCategories] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [shake, setShake] = useState(false);
    const maxMistakes = 4;
    const [categoryColorMap, setCategoryColorMap] = useState({});
    const [almostCorrect, setAlmostCorrect] = useState(false);
  
    useEffect(() => {
      assignCategoryColors();
    }, []);
  
    const assignCategoryColors = () => {
      const uniqueCategories = [...new Set(words.map((w) => w.category))];
      const colorMap = {};
      uniqueCategories.forEach((category, index) => {
        colorMap[category] = categoryColors[index] || "gray";
      });
      setCategoryColorMap(colorMap);
    };
  
    const checkSelection = () => {
      if (selected.length !== 4 || mistakes >= maxMistakes) return;
      
      const categorySet = new Set(selected.map((w) => w.category));
      if (categorySet.size === 1) {
        setFoundGroups([...foundGroups, ...selected]);
        setFoundCategories([...foundCategories, selected[0].category]);
        setAlmostCorrect(false);
        setSelected([]);
      } else {
        const newShakeState = {};
        selected.forEach((word) => {
          newShakeState[word.word] = true;
        });
        setShake(newShakeState);
        setTimeout(() => setShake({}), 500);
        const categoryCounts = {};
        selected.forEach((w) => {
          categoryCounts[w.category] = (categoryCounts[w.category] || 0) + 1;
        });
        
        if (Object.values(categoryCounts).includes(3)) {
          setAlmostCorrect(true);
          setMistakes(mistakes + 1);
        } else {
          setAlmostCorrect(false);
          setMistakes(mistakes + 1);
        }
      }
    };
  
    return (
      <div className="game-container">
        <h1>Legally Distinct Connections</h1>
        <p>Mistakes: {mistakes} / {maxMistakes}</p>
        {almostCorrect && <p className="hint">You're one word away!</p>}
        <div className={`grid ${shake ? "shake" : ""}`}>
          {words.map((item) => (
            <button
              key={item.word}
              className={`word ${selected.includes(item) ? "selected" : ""} ${foundGroups.includes(item) || mistakes >= maxMistakes ? "found" : ""} ${shake[item.word] ? "shake" : ""}`}
              style={{ gridRow: item.position[0] + 1, gridColumn: item.position[1] + 1, backgroundColor: foundGroups.includes(item) || mistakes >= maxMistakes ? categoryColorMap[item.category] : "" }}
              onClick={() => setSelected(selected.includes(item) ? selected.filter((w) => w !== item) : [...selected, item])}
              disabled={foundGroups.includes(item) || mistakes >= maxMistakes}
            >
              {item.word}
            </button>
          ))}
        </div>
        <button className="check-btn" onClick={checkSelection} disabled={selected.length !== 4 || mistakes >= maxMistakes}>Check</button>
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
      {mistakes >= maxMistakes && foundCategories.length < 4 && (
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