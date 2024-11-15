/* global createCanvas, frameRate, random, height, width, background, stroke, fill, rect, noLoop */

import React, {useRef, useEffect} from "react";
import p5 from "p5";
const BubbleSortVisualization = () => {
  const sketchRef = useRef();
  useEffect(() => {
    const sketch = (p) => {
      let values = [];
      let i = 0;
      let j = 0;
      let swapped = false;
      p.setup = () => {
        p.createCanvas(400, 400);
        p.frameRate(1);
        values = Array.from({ length: 5 }, () => p.random(p.height * 0.6));
      };

      p.draw = () => {
        p.background(220);

        for (let k = 0; k < values.length; k++) {
          p.stroke(0);
          if (k === j || k === j + 1) {
            p.fill(255, 0, 0);
          } else {
            p.fill(100, 150, 255);
          }
          p.rect(
            k * (p.width / values.length),
            p.height - values[k],
            p.width / values.length - 5,
            values[k]
          );
        }

        if (i < values.length) {
          if (j < values.length - i - 1) {
            if (values[j] > values[j + 1]) {
              [values[j], values[j + 1]] = [values[j + 1], values[j]];
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
    }, []);
    return <div ref = {sketchRef}></div>
};
export default BubbleSortVisualization;
  
  