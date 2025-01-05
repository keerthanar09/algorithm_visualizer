import React, { useEffect, useRef } from "react";
import "./UI/styles/bfs.css";

const BFSVisualization = () => {
  const canvasRef = useRef(null);
  const queueRef = useRef(null);

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
      nodes.forEach((node) => {
        positions[node] = {
          x: Math.random() * 400 + 50,
          y: Math.random() * 200 + 50,
        };
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

    const bestFirstSearch = async (start, graph, nodePositions) => {
      const queue = [start];
      const visited = new Set();
      updateQueueDisplay(queue);

      while (queue.length > 0) {
        const current = queue.shift();
        updateQueueDisplay(queue);

        if (!visited.has(current)) {
          visited.add(current);
          const position = nodePositions[current];
          if (!position) {
            console.error(`Position for node "${current}" not found.`);
            continue;
          }

          const { x, y } = position;

          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.fillStyle = "#ff5722";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = "#fff";
          ctx.font = "14px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(current, x, y);

          await new Promise((resolve) => setTimeout(resolve, 1500));
          graph[current]?.forEach((neighbor) => {
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
            }
          });
          updateQueueDisplay(queue);
        }
      }
      updateQueueDisplay(queue, true);
    };

    const randomGraph = generateRandomGraph();
    const nodePositions = generateRandomPositions(Object.keys(randomGraph));

    drawGraph(randomGraph, nodePositions);

    const startButton = document.getElementById("startButton");
    const handleStart = () => {
      drawGraph(randomGraph, nodePositions);
      bestFirstSearch(Object.keys(randomGraph)[0], randomGraph, nodePositions);
    };
    startButton.addEventListener("click", handleStart);

    return () => {
      startButton.removeEventListener("click", handleStart);
    };
  }, []);

  return (
    <div className="container">
      <div className="graph-container">
        <canvas ref={canvasRef} id="graphCanvas"></canvas>
      </div>
      <div className="queue-container">
        <h2>Queue</h2>
        <ul ref={queueRef} id="queue"></ul>
        <button id="startButton">Start Visualization</button>
      </div>
    </div>
  );
};

export default BFSVisualization;
