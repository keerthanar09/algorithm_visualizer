import React, { useState, useEffect, useRef } from "react";
import './UI/styles/lin.css';
import axios from "axios";
import SettingsSearch from "./UI/settingsSearch";

const LinearSearchVisualization = () => {
  const [numElements, setNumElements] = useState(10);
  const [isPlaying, setIsPlaying] = useState(true);
  const [array, setArray] = useState([]);
  const [searchkey, setKey] = useState("");
  const [message, setMessage] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get_sorting_data/?num_elements=${numElements}`
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


  // Perform the search with visualization
  const performSearch = async () => {
    const searchKey = parseInt(searchkey, 10);
    if (isNaN(searchKey)) {
      setMessage("Please enter a valid number!");
      return;
    }
    setMessage("");
    setFoundIndex(null);

    for (let i = currentIndexRef.current; i < array.length; i++) {
      if (!isPlayingRef.current) {
        currentIndexRef.current = i;
        setMessage("Paused!");
        return;
      }

      setHighlightIndex(i);
      await delay(800); 

      if (array[i] === searchKey) {
        setFoundIndex(i);
        setMessage(`Key ${searchKey} found at position ${i + 1}!`);
        currentIndexRef.current = 0; 
        return;
      }
    }

    setHighlightIndex(null);
    setMessage(`Key ${searchKey} not found in the array!`);
    currentIndexRef.current = 0; 
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev); // Toggle the state
    if (isPlaying) {
      setMessage("Paused!");
    } else {
      setMessage("");
      performSearch(); // Resume the search
    }
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

export default LinearSearchVisualization;
