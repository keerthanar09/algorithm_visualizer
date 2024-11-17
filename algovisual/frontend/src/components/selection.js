/* global p5, p, rect, useState, createCanvas, frameRate, random, height, width, background, stroke, noStroke,  fill, rect, noLoop */

import React, {useRef, useEffect, useState} from "react";
import p5 from "p5";
import axios from "axios";

const SelectionSortVisualization = () => {
  const [values, setValues] = useState([]); 
  const sketchRef = useRef();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get_sorting_data/"); 
        if (Array.isArray(response.data)) { 
          setValues(response.data); 
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

//Prevents running p5 skectch if the data from the backend is not ready
  useEffect(() => {
    if (values.length === 0) {
      return;
    }
    const sketch = (p) => {
      let value = [...values];
      let i = 0, j = 0, minIndex;

      p.setup = () => {
        p.createCanvas(600, 400);
        // value = Array.from({ length: 5 }, () => p.random(height));
        minIndex = i;
        p.frameRate(2); 
      }
      p.draw = () => {
        p.background(220);
        for (let k = 0; k < value.length; k++) {
          if (k === i) p.fill(255, 0, 0); 
          else if (k === minIndex) p.fill(0, 255, 0); 
          else p.fill(100);
          p.rect(k * (p.width / value.length), p.height - value[k], p.width / value.length - 2, value[k]);
        }

        if (i < value.length) {
          if (j < value.length) {
            if (value[j] < value[minIndex]) {
              minIndex = j; 
            }
            j++;
          } else {
            [value[i], value[minIndex]] = [value[minIndex], value[i]];
            i++;
            j = i;
            minIndex = i;
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
export default SelectionSortVisualization;