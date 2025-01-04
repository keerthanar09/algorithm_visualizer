import React, { useState, useEffect } from "react";
import "./static/bin.css"; 

const BinarySearchVisualization = () => {
  const [array, setArray] = useState([]);
  const [key, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);


  useEffect(() => {
    generateRandomSortedArray();
  }, []);

  const generateRandomSortedArray = () => {
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    ).sort((a, b) => a - b);

    setArray(newArray);
    setMessage("");
    setHighlightIndex(null);
    setFoundIndex(null);
  };

  // Perform binary search with visualization
  const performBinarySearch = async () => {
    const searchKey = parseInt(key, 10);
    if (isNaN(searchKey)) {
      setMessage("Please enter a valid number!");
      return;
    }

    setMessage("");
    setFoundIndex(null);
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setHighlightIndex(mid);
      await delay(1200);

      if (array[mid] === searchKey) {
        setFoundIndex(mid);
        setMessage(`Key ${searchKey} found at position ${mid + 1}!`);
        return;
      } else if (array[mid] < searchKey) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    setHighlightIndex(null);
    setMessage(`Key ${searchKey} not found in the array!`);
  };

  // Delay function for animations
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="binary-search-visualization">

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
        <button onClick={performBinarySearch}>Search</button>
        <button onClick={generateRandomSortedArray}>Generate New Array</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default BinarySearchVisualization;
