import React, { useEffect, useRef } from "react";
import "./UI/styles/bfs.css";

const BFSVisualization = () => {
  const canvasRef = useRef(null);
  const queueRef = useRef(null);
  const traversalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    const generateRandomGraph = () => {
      const nodes = [];
      const numNodes = Math.floor(Math.random() * 3) + 5; // Random number of nodes between 5 and 7
      for (let i = 0; i < numNodes; i++) {
        nodes.push(String.fromCharCode(65 + i)); // A, B, C...
      }

      const graph = {};
      nodes.forEach((node) => {
        const edges = nodes.filter(
          (target) => target !== node && Math.random() > 0.3
        );
        graph[node] = edges;
      });

      return graph;
    };

    const generateRandomPositions = (nodes) => {
      const positions = {};
      const isOverlapping = (x1, y1, x2, y2) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) < 40;

      nodes.forEach((node) => {
        let x, y, overlapping;
        do {
          x = Math.random() * (canvas.width - 100) + 50;
          y = Math.random() * (canvas.height - 100) + 50;
          overlapping = Object.values(positions).some(({ x: x2, y: y2 }) =>
            isOverlapping(x, y, x2, y2)
          );
        } while (overlapping);

        positions[node] = { x, y };
      });

      return positions;
    };

    const drawGraph = (graph, positions, highlightNode = null) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw edges
      Object.keys(graph).forEach((node) => {
        graph[node].forEach((neighbor) => {
          ctx.beginPath();
          ctx.moveTo(positions[node].x, positions[node].y);
          ctx.lineTo(positions[neighbor].x, positions[neighbor].y);
          ctx.strokeStyle = "#ccc";
          ctx.stroke();
        });
      });

      // Draw nodes
      Object.keys(positions).forEach((node) => {
        const { x, y } = positions[node];
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = highlightNode === node ? "orange" : "lightblue";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node, x, y);
      });
    };

    const updateQueueDisplay = (queue, final = false) => {
      const queueContainer = queueRef.current;
      queueContainer.innerHTML = "";
      if (final && queue.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Queue is now empty (BFS complete)";
        li.style.color = "green";
        li.style.fontWeight = "bold";
        queueContainer.appendChild(li);
        return;
      }

      queue.forEach((node) => {
        const li = document.createElement("li");
        li.textContent = node;
        queueContainer.appendChild(li);
      });
    };

    const bfs = async (start, graph, positions) => {
      const queue = [start];
      const visited = new Set();
      const traversalOrder = [];
      updateQueueDisplay(queue);

      while (queue.length > 0) {
        const currentNode = queue.shift();
        updateQueueDisplay(queue);

        if (!visited.has(currentNode)) {
          visited.add(currentNode);
          traversalOrder.push(currentNode);

          // Highlight current node
          drawGraph(graph, positions, currentNode);
          await new Promise((resolve) => setTimeout(resolve, 1000));

          graph[currentNode]?.forEach((neighbor) => {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          });
          updateQueueDisplay(queue);
        }
      }

      // Display traversal order
      const traversalContainer = traversalRef.current;
      traversalContainer.textContent = `BFS Traversal: ${traversalOrder.join(" -> ")}`;
    };

    const randomGraph = generateRandomGraph();
    const nodePositions = generateRandomPositions(Object.keys(randomGraph));
    drawGraph(randomGraph, nodePositions);

    const startButton = document.getElementById("startButton");
    const handleStart = () => {
      drawGraph(randomGraph, nodePositions);
      traversalRef.current.textContent = ""; // Clear previous traversal
      bfs(Object.keys(randomGraph)[0], randomGraph, nodePositions);
    };

    startButton.addEventListener("click", handleStart);

    return () => {
      startButton.removeEventListener("click", handleStart);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="controls-container">
        <div className="stack-container">
          <h2>Queue</h2>
          <div ref={queueRef} id="stack" className="traversal-order"></div>
        </div>
        <div className="traversal-container">
          <h2>BFS Traversal</h2>
          <div ref={traversalRef} id="traversal" className="traversal-order"></div>
        </div>
        <button id="startButton" className="start-button">
          Start Visualization
        </button>
      </div>
      <div className="visualization-container">
        <canvas ref={canvasRef} id="graphCanvas"></canvas>
      </div>
    </div>
  );
  
  
};

export default BFSVisualization;
