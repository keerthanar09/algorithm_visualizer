import React, { useState, useRef, useEffect } from "react";
import SettingsPF from "./UI/settingsPF";
import "./UI/styles/align.css";

const BellmanVisualization = () => {
  const canvasRef = useRef(null);
  const [sourceNode, setSourceNode] = useState(0);
  const [nodeCount, setNodeCount] = useState(6);
  const [maxWeight, setMaxWeight] = useState(10);
  const [result, setResult] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [positions, setPositions] = useState({});
  const [shortestPaths, setShortestPaths] = useState([]);

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      drawGraph();
    }
  }, [nodes, edges, positions]);

  const generateGraph = () => {
    const newNodes = Array.from({ length: nodeCount }, (_, index) => ({
      id: index,
      dist: Infinity,
    }));

    const newEdges = [];
    const newPositions = {};
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    newNodes.forEach((_, index) => {
      const angle = (2 * Math.PI * index) / nodeCount;
      newPositions[index] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < 0.6) {
          const weight = Math.floor(Math.random() * maxWeight) + 1;
          newEdges.push({ from: i, to: j, weight });
          newEdges.push({ from: j, to: i, weight });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setPositions(newPositions);
    setShortestPaths([]);
    setResult("");
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach((edge) => {
      const fromNode = positions[edge.from];
      const toNode = positions[edge.to];

      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = "black";
        ctx.fillText(edge.weight, midX, midY);
      }
    });

    Object.entries(positions).forEach(([nodeId, { x, y }]) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fillText(nodeId, x - 5, y + 5);
    });
  };

  const runBellmanFord = async () => {
    if (isNaN(sourceNode) || sourceNode < 0 || sourceNode >= nodes.length) {
      alert("Please enter a valid starting node!");
      return;
    }

    const newNodes = nodes.map((node) => ({ ...node, dist: Infinity }));
    newNodes[sourceNode].dist = 0;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < nodes.length - 1; i++) {
      let updated = false;

      for (const edge of edges) {
        const fromNode = newNodes[edge.from];
        const toNode = newNodes[edge.to];

        if (fromNode.dist !== Infinity && fromNode.dist + edge.weight < toNode.dist) {
          toNode.dist = fromNode.dist + edge.weight;
          updated = true;
          await highlightEdge(edge.from, edge.to, "green", ctx);
        }
      }

      if (!updated) break;
    }

    for (const edge of edges) {
      const fromNode = newNodes[edge.from];
      const toNode = newNodes[edge.to];
      if (fromNode.dist + edge.weight < toNode.dist) {
        alert("Graph contains a negative weight cycle!");
        return;
      }
    }

    setNodes(newNodes);
    displayShortestPaths(sourceNode, newNodes);
  };

  const highlightEdge = async (from, to, color, ctx) => {
    const fromNode = positions[from];
    const toNode = positions[to];
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(toNode.x, toNode.y);
    ctx.stroke();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    drawGraph();
  };

  const displayShortestPaths = (startNode, graph) => {
    const paths = graph.map((node, index) => ({
      from: startNode,
      to: index,
      dist: node.dist,
    }));
    setShortestPaths(paths); // Ensure it's always an array
    setResult(
      paths
        .map((path) => `Node ${path.from} → Node ${path.to}: ${path.dist}`)
        .join("\n")
    );
  };

  useEffect(() => {
    generateGraph();
  }, [nodeCount, maxWeight]);

  return (
    <div className="mc">
      <SettingsPF
        nodeCount={nodeCount}
        setNodeCount={setNodeCount}
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
        handleStart={runBellmanFord}
        sourceNode={sourceNode}
        setSourceNode={setSourceNode}
      />
      <canvas id="canv"
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: "1px solid black" }}
      ></canvas>
      <pre>{result}</pre>
    </div>
  );
};

export default BellmanVisualization;
