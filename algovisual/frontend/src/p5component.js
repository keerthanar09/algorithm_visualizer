import React, { useEffect, useRef } from 'react';

const P5Component = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Check if p5 is available
    if (window.p5) {
      const sketch = (p) => {
        p.setup = () => {
          p.createCanvas(400, 400);
          p.background(200);
        };

        p.draw = () => {
          p.background(200);
          p.ellipse(p.mouseX, p.mouseY, 50, 50);
        };
      };

      // Attach the sketch to the ref element
      new window.p5(sketch, canvasRef.current);
    }
  }, []);

  return <div ref={canvasRef}></div>;
};

export default P5Component;
