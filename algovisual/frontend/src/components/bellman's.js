/* global p5, p, useState, createCanvas, frameRate, random, height, width, background, stroke, fill, rect, noLoop */

import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import axios from "axios";
import Settings from "./UI/settings";

const BellmanVisualization = () => {
  const [values, setValues] = useState([]);
  const [numElements, setNumElements] = useState(10);
  const [isPlaying, setIsPlaying] = useState(true);
  const sketchRef = useRef();
  const p5InstanceRef = useRef(null);
  const generateGraphButtonRef = useRef(null);
  const startButtonRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get_sorting_data/?num_elements=${numElements}`
      );
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

  useEffect(() => {
    if (values.length === 0) {
      return;
    }
    const sketch = (p) => {
      let vertices = [];
      let edges = [];
      p.setup = () => {
        p.createCanvas(400, 400);
        p.frameRate(1);
        p.generateRandomGraph();
      };

      p.generateRandomGraph = () => {
        const vertexCount = Math.floor(Math.random() * 4) + 3;
        vertices = [];
        edges = [];
        for (let i = 0; i < vertexCount; i++) {
          vertices.push({
            id: i,
            x: Math.floor(Math.random() * (p.width - 50)) + 25,
            y: Math.floor(Math.random() * (p.height - 50)) + 25,
          });
        }
        for (let i = 0; i < vertexCount - 1; i++) {
          for (let j = i + 1; j < vertexCount; j++) {
            if (Math.random() > 0.5) {
              edges.push({
                from: i,
                to: j,
                weight: Math.floor(Math.random() * 10) + 1,
              });
            }
          }
        }

        p.drawGraph();
      };
      p.drawGraph = () => {
        p.background(255);
        edges.forEach((edge) => {
          const fromVertex = vertices[edge.from];
          const toVertex = vertices[edge.to];

          p.stroke(0);
          p.line(fromVertex.x, fromVertex.y, toVertex.x, toVertex.y);
          const midX = (fromVertex.x + toVertex.x) / 2;
          const midY = (fromVertex.y + toVertex.y) / 2;
          p.fill(255, 0, 0);
          p.text(edge.weight, midX, midY);
        });
        vertices.forEach((vertex) => {
            p.fill(173, 216, 230); // Light blue
            p.ellipse(vertex.x, vertex.y, 40, 40);
            p.fill(0);
            p.text(vertex.id, vertex.x - 5, vertex.y + 5);
          });
      };
      p.highlightEdge = (edge, color) => {
        const fromVertex = vertices[edge.from];
        const toVertex = vertices[edge.to];
        p.stroke(color);
        p.strokeWeight(3);
        p.line(fromVertex.x, fromVertex.y, toVertex.x, toVertex.y);
      };
      p.visualizeBellmanFord = async () => {
        const distances = Array(vertices.length).fill(Infinity);
        distances[0] = 0;

        for (let i = 0; i < vertices.length - 1; i++) {
          for (const edge of edges) {
            const { from, to, weight } = edge;

            if (distances[from] + weight < distances[to]) {
              distances[to] = distances[from] + weight;
              p.highlightEdge(edge, "blue");
              await p.sleep(1000);
              p.drawGraph();
            }
          }
        }
        let hasNegativeCycle = false;
        for (const edge of edges) {
          const { from, to, weight } = edge;
          if (distances[from] + weight < distances[to]) {
            hasNegativeCycle = true;
            break;
          }
        }

        if (hasNegativeCycle) {
          alert("Graph contains a negative weight cycle!");
        } else {
          let message = "Algorithm completed. Shortest distances:\n";
          distances.forEach((distance, index) => {
            message += `Vertex ${index}: Distance = ${distance}`;
          });
          alert(message);
        }
      };

      p.sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
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
  useEffect(() => {
    const generateGraphButton = generateGraphButtonRef.current;
    const startButton = startButtonRef.current;

    const generateRandomGraph = () => {
      p5InstanceRef.current.generateRandomGraph();
    };

    const visualizeBellmanFord = () => {
      p5InstanceRef.current.visualizeBellmanFord();
    };

    generateGraphButton.addEventListener("click", generateRandomGraph);
    startButton.addEventListener("click", visualizeBellmanFord);

    // Cleanup event listeners on unmount
    return () => {
      generateGraphButton.removeEventListener("click", generateRandomGraph);
      startButton.removeEventListener("click", visualizeBellmanFord);
    };
  }, []);
  return (
    <div class="container1">
      {/* <Settings
        numElements={numElements}
        setNumElements={setNumElements}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
        fetchData={fetchData}
      /> */}
      <div class="vis" ref={sketchRef}></div>
      <button ref={generateGraphButtonRef}>Generate Graph</button>
      <button ref={startButtonRef}>Start Bellman Ford</button>
    </div>
  );
};
export default BellmanVisualization;
