import React, { useState, useEffect, useRef } from "react";
import './UI/styles/bin.css'; 
import axios from "axios";
import SettingsSearch from "./UI/settingsSearch";
const BinarySearchVisualization = () => {
  const [numElements, setNumElements] = useState(10);
  const [isPlaying, setIsPlaying] = useState(true);
  const [array, setArray] = useState([]);
  const [searchkey, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const currentStateRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get_search_data/?num_elements=${numElements}`
      );
      if (Array.isArray(response.data)) {
        setArray(response.data);
      } else {
        console.error("Invalid data format from API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [numElements]);

  useEffect(() => {
      isPlayingRef.current = isPlaying; 
    }, [isPlaying]);

    const delay = (ms) =>
      new Promise((resolve) =>
        setTimeout(() => {
          if (isPlayingRef.current) resolve();
        }, ms)
      );

    
  // Perform binary search with visualization
  const performSearch = async () => {
    
    const searchKey = parseInt(searchkey, 10);
    if (isNaN(searchKey)) {
      setMessage("Please enter a valid number!");
      return;
    }

    setMessage("");
    setFoundIndex(null);

    let { left, right, mid } = currentStateRef.current; // Resume from saved state
    if (left === 0 && right === 0) right = array.length - 1; // Initialize on first run

    while (left <= right) {
      if (!isPlayingRef.current) {
        currentStateRef.current = { left, right, mid }; 
        setMessage("Visualization Paused!");
        return;
      }

      mid = Math.floor((left + right) / 2);
      setHighlightIndex(mid);
      await delay(800); // Visualization delay

      if (array[mid] === searchKey) {
        setFoundIndex(mid);
        setMessage(`Key ${searchKey} found at position ${mid + 1}!`);
        currentStateRef.current = { left: 0, right: 0, mid: 0 }; 
        return;
      } else if (array[mid] < searchKey) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    setHighlightIndex(null);
    setMessage(`Key ${searchKey} not found in the array!`);
    currentStateRef.current = { left: 0, right: 0, mid: 0 }; // Reset state for next search
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      if (prev) {
        setMessage("Visualization Paused!");
      } else {
        setMessage("");
        performSearch(); 
      }
      return !prev;
    });
  };

  return (
    <div className="container1">
      <SettingsSearch
        numElements={numElements}
        setNumElements={setNumElements}
        searchkey={searchkey}
        setKey={setKey}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        performSearch={performSearch}
        fetchData={() => {
          fetchData();
          setHighlightIndex(null);
          setFoundIndex(null);
          setMessage("");
        }}
      />
      <div className="search-visualization">
        <div className="array-container">
          {array.map((num, index) => (
            <div
              key={index}
              className={`box ${index === highlightIndex ? "highlight" : ""} ${
                index === foundIndex ? "found" : ""
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};


export default BinarySearchVisualization;
