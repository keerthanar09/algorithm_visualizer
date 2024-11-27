/* global p5, p, rect, useState, createCanvas, frameRate, random, height, width, background, stroke, noStroke,  fill, rect, noLoop */

import React, {useRef, useEffect, useState} from "react";
import p5 from "p5";
import axios from "axios";
import Settings from "./UI/settings";

const MergeSortVisualization = () => {
  const [values, setValues] = useState([]); 
  const [numElements, setNumElements] = useState(10); 
  const [isPlaying, setIsPlaying] = useState(true);
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null);


    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_sorting_data/?num_elements=${numElements}`); 
        if (Array.isArray(response.data)) { 
          setValues(response.data); 
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

//Prevents running p5 skectch if the data from the backend is not ready
  useEffect(() => {
    if (values.length === 0) {
      return;
    }
    const sketch = (p) => {

      let value = [...values];
      let states = [];
      let done = false;

      p.setup = () => {
        p.createCanvas(600, 400); 
        // value = new Array(5).fill(0).map(() => random(height));
        states = new Array(value.length).fill(-1);
        
        p.mergeSort(value, 0, value.length - 1);
      };

    p.draw = () => {
      p.background(255);
      for (let i = 0; i < value.length; i++) {
        if (states[i] === -1) p.fill(0);
        else if (states[i] === 0) p.fill(0, 0, 255); 
        else if (states[i] === 1) p.fill(0, 255, 0); 
        p.noStroke(); 
        p.rect(i * (p.width / value.length), p.height - value[i], p.width / value.length - 4, value[i]);
        //Following code is to display the value of each bar above it while visualization is running.
        p.fill(0); 
        p.textAlign(p.CENTER, p.BOTTOM); 
        p.text(
          value[i], 
          i * (p.width / value.length) + (p.width / value.length) / 2, 
          p.height - value[i] - 5 
        );
      }

      if (done) p.noLoop();
    };

    p.mergeSort = async (arr, start, end) => {
      if (start >= end) {
        if (start >= 0) states[start] = 1; 
        return;
      }
      const mid = Math.floor((start + end) / 2);
      await p.mergeSort(arr, start, mid);
      await p.mergeSort(arr, mid + 1, end);
      await p.merge(arr, start, mid, end);
    };

    p.merge = async (arr, start, mid, end) => {
      let left = arr.slice(start, mid + 1);
      let right = arr.slice(mid + 1, end + 1);
      
      let i = 0, j = 0, k = start;

      states[start] = 0; 

      while (i < left.length && j < right.length) {
        await p.sleep(1000); 
        if (left[i] < right[j]) {
          arr[k++] = left[i++];
        } else {
          arr[k++] = right[j++];
        }
      }

      while (i < left.length) {
        await p.sleep(1000);
        arr[k++] = left[i++];
      }

      while (j < right.length) {
        await p.sleep(1000);
        arr[k++] = right[j++];
      }

      if (start >= 0) {
        for (let l = start; l <= end; l++) states[l] = 1; 
      }

      if (start === 0 && end === arr.length - 1) done = true; 
    };

    p.sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
  };
  p5InstanceRef.current = new p5(sketch, sketchRef.current);

  return () => {
    p5InstanceRef.current.remove();
  };
}, [values]);

// This function is to implement the pause and play functionality
const togglePlayPause = () => {
  setIsPlaying((prev) => {
    if (prev) {
      p5InstanceRef.current.noLoop(); // The loop is stopped and visualization is paused
    } else {
      p5InstanceRef.current.loop(); //When play is pressed, the loop is continued from where it was stopped.
    }
    return !prev;
  });
};


return (
  <div class="container1">
    <Settings
      numElements={numElements}
      setNumElements={setNumElements}
      togglePlayPause={togglePlayPause}
      isPlaying={isPlaying}
      fetchData={fetchData}
    />
    <div class="vis" ref={sketchRef}></div>
  </div>
);
};



export default MergeSortVisualization;
  
