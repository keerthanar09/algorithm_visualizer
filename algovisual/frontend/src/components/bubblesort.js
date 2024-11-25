/* global p5, p, useState, createCanvas, frameRate, random, height, width, background, stroke, fill, rect, noLoop */

import React, {useRef, useEffect, useState} from "react";
import p5 from "p5";
import axios from "axios";
import PlayPauseButton from "./UI/pauseplay";
import GenerateArrayButton from "./UI/genarr";
import NumberInput from "./UI/inputbox";

const BubbleSortVisualization = () => {
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
      let i = 0;
      let j = 0;
      let swapped = false;
      let arr = [...values];
      p.setup = () => {
        p.createCanvas(400, 400);
        p.frameRate(1);
        
      };

      p.draw = () => {
        p.background(220);

        for (let k = 0; k < arr.length; k++) {
          p.stroke(0);
          if (k === j || k === j + 1) {
            p.fill(255, 0, 0);
          } else {
            p.fill(100, 150, 255);
          }
          p.rect(
            k * (p.width / arr.length),
            p.height - arr[k],
            p.width / arr.length - 5,
            arr[k]
          );
        }

        if (i < arr.length) {
          if (j < arr.length - i - 1) {
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              swapped = true;
            }
            j++;
          } else {
            if (!swapped) {
              p.noLoop();
            }
            j = 0;
            swapped = false;
            i++;
          }
        } else {
          p.noLoop(); 
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
    <div>
      <NumberInput numElements={numElements} setNumElements={setNumElements} />
      <GenerateArrayButton fetchData={fetchData} />
      <PlayPauseButton isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
      <div ref={sketchRef}></div>
    </div>
  );
};
export default BubbleSortVisualization;
  
  