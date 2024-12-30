import React, { useState, useEffect } from "react";

const LinearSearchVisualization = () => {
  const [array, setArray] = useState([]);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  // Initialize the random array on mount
  useEffect(() => {
    generateRandomArray();
  }, []);

  // Generate a new random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setMessage("");
    setHighlightIndex(null);
    setFoundIndex(null);
  };

  // Perform the search with visualization
  const performSearch = async () => {
    const searchKey = parseInt(key, 10);
    if (isNaN(searchKey)) {
      setMessage("Please enter a valid number!");
      return;
    }
    setMessage("");
    setFoundIndex(null);

    for (let i = 0; i < array.length; i++) {
      setHighlightIndex(i);
      await delay(800);

      if (array[i] === searchKey) {
        setFoundIndex(i);
        setMessage(`Key ${searchKey} found at position ${i + 1}!`);
        return;
      }
    }

    setHighlightIndex(null);
    setMessage(`Key ${searchKey} not found in the array!`);
  };

  // Delay function for visualization
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="search-visualization">

      <div className="array-container">
        {array.map((num, index) => (
          <div
            key={index}
            className={`box ${
              index === highlightIndex ? "highlight" : ""
            } ${index === foundIndex ? "found" : ""}`}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="controls">
        <input
          type="number"
          placeholder="Enter key to search"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button onClick={performSearch}>Search</button>
        <button onClick={generateRandomArray}>Generate New Array</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default LinearSearchVisualization;
