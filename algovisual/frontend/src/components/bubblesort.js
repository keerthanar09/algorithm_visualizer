/* global p5, p, useState, createCanvas, frameRate, random, height, width, background, stroke, fill, rect, noLoop */

import React, {useRef, useEffect, useState} from "react";
import p5 from "p5";
import axios from "axios";

const BubbleSortVisualization = () => {
  const [values, setValues] = useState([]);  // React state to hold the data
  const sketchRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get_sorting_data/"); // Adjust the API URL if needed
        if (Array.isArray(response.data)) { 
          setValues(response.data);  // Update state only if data is valid
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (values.length === 0) {
      // Prevent running the p5 sketch until values are ready
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
    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
    }, [values]);
    return <div ref = {sketchRef}></div>
};
export default BubbleSortVisualization;
  
  