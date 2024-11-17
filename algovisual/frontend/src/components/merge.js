/* global p5, p, rect, useState, createCanvas, frameRate, random, height, width, background, stroke, noStroke,  fill, rect, noLoop */

import React, {useRef, useEffect, useState} from "react";
import p5 from "p5";
import axios from "axios";

const MergeSortVisualization = () => {
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
  const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
    }, [values]);
    return <div ref = {sketchRef}></div>
};
export default MergeSortVisualization;
  
