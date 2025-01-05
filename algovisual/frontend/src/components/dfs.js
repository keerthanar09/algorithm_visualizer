import React, { useEffect, useRef } from "react";
import "./UI/styles/bfs.css";

const DFSVisualization = () => {
  const canvasRef = useRef(null);
  const stackRef = useRef(null);
  const traversalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    const generateRandomGraph = () => {
      const nodes = [];
      const numNodes = Math.floor(Math.random() * 3) + 5; // Random nodes between 5 and 7
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

    const updateStack = (stack, currentNode = null) => {
      const stackContainer = stackRef.current;
      stackContainer.innerHTML = "";
      stack.forEach((node) => {
        const div = document.createElement("div");
        div.className = "stack-item";
        if (node === currentNode) {
          div.classList.add("current");
        }
        div.textContent = node;
        stackContainer.appendChild(div);
      });
    };

    const dfs = async (graph, startNode, positions) => {
      const stack = [startNode];
      const visited = new Set();
      const traversalOrder = [];

      while (stack.length > 0) {
        const currentNode = stack.pop();
        drawGraph(graph, positions, currentNode);
        updateStack(stack, currentNode);

        if (!visited.has(currentNode)) {
          visited.add(currentNode);
          traversalOrder.push(currentNode);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          graph[currentNode].forEach((neighbor) => {
            if (!visited.has(neighbor)) {
              stack.push(neighbor);
            }
          });
        }
      }

      // Print the traversal order
      const traversalContainer = traversalRef.current;
      traversalContainer.textContent = `DFS Traversal: ${traversalOrder.join(" -> ")}`;
    };

    const randomGraph = generateRandomGraph();
    const nodePositions = generateRandomPositions(Object.keys(randomGraph));
    drawGraph(randomGraph, nodePositions);

    const startButton = document.getElementById("startButton");
    const handleClick = () => {
      drawGraph(randomGraph, nodePositions);
      traversalRef.current.textContent = ""; // Clear previous traversal
      dfs(randomGraph, Object.keys(randomGraph)[0], nodePositions);
    };

    startButton.addEventListener("click", handleClick);

    return () => {
      startButton.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="controls-container">
        <div className="stack-container">
          <h2>Stack</h2>
          <div ref={stackRef} id="stack" className="traversal-order"></div>
        </div>
        <div className="traversal-container">
          <h2>DFS Traversal</h2>
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

export default DFSVisualization;
