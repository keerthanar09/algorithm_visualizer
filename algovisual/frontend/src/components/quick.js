
/* global p5, p, rect, useState, createCanvas, frameRate, random, height, width, background, stroke, noStroke,  fill, rect, noLoop */

import React, {useRef, useEffect, useState} from "react";
import p5 from "p5";
import axios from "axios";
import Settings from "./UI/settings";

const QuickSortVisualization = () => {
  const [values, setValues] = useState([]); 
  const [numElements, setNumElements] = useState(10); 
  const [isPlaying, setIsPlaying] = useState(false);
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
      let w;

      p.setup = () => {
        p.createCanvas(600, 400);
        states = new Array(value.length).fill(-1);
        w = p.width/value.length;
        p.quickSort(value, 0, value.length - 1);
        p.noLoop();
      };

      p.quickSort = async (arr, start, end) => {
        if (start >= end) {
          if (start >= 0 && start < arr.length) states[start] = 2; 
          return;
        }
        let pivotIndex = await p.partition(arr, start, end);
        states[pivotIndex] = 2; 
        await Promise.all([
          p.quickSort(arr, start, pivotIndex - 1),
          p.quickSort(arr, pivotIndex + 1, end),
        ]);
      };
      p.partition = async (arr, start, end) => {
        let pivotValue = arr[end];
        let pivotIndex = start;
        states[end] = 1; 
        for (let i = start; i < end; i++) {
          if (arr[i] < pivotValue) {
            await p.swap(arr, i, pivotIndex);
            pivotIndex++;
          }
        }
        await p.swap(arr, pivotIndex, end);
        states[end] = 0; 
        return pivotIndex;
      };
      p.swap = async (arr, a, b) => {
        await p.sleep(800); 
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
      };
      p.sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };
      p.draw = () => {
        p.background(220);
        for (let i = 0; i < value.length; i++) {
          p.stroke(0);
          if (states[i] === 0) p.fill(128); 
          else if (states[i] === 1) p.fill(255, 0, 0); 
          else p.fill(0, 255, 0);
          p.rect(i * w, p.height - value[i], w - 2, value[i]);
          //Following code is to display the value of each bar above it while visualization is running.
          p.fill(0); 
          p.textAlign(p.CENTER, p.BOTTOM); 
          p.text(
            value[i], 
            i * (p.width / value.length) + (p.width / value.length) / 2, 
            p.height - value[i] - 5 
          );
        }
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
export default QuickSortVisualization;