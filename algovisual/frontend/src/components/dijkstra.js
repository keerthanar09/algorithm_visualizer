import React, { useEffect, useRef, useState } from "react";
import SettingsPF from "./UI/settingsPF";
import "./UI/styles/align.css";

const DijkstraVisualizer = () => {
  const canvasRef = useRef(null);
  const [sourceNode, setSourceNode] = useState(0);
  const [nodeCount, setNodeCount] = useState(6);
  const [maxWeight, setMaxWeight] = useState(10);
  const [result, setResult] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [graph, setGraph] = useState([]);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      drawGraph();
    }
  }, [nodes, edges, positions]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    edges.forEach((edge) => {
      const fromNode = positions[edge.from];
      const toNode = positions[edge.to];
  
      if (!fromNode || !toNode) {
        console.error(`Missing position for nodes: ${edge.from}, ${edge.to}`);
        return; // Skip rendering this edge if positions are missing
      }
  
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
    });
  
    Object.keys(positions).forEach((nodeId) => {
      const { x, y } = positions[nodeId];
      if (!x || !y) {
        console.error(`Missing position for node: ${nodeId}`);
        return; // Skip rendering this node if position is missing
      }
  
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
  

  const visualizeDijkstra = (source) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const visited = new Set();
    const distances = Array(nodes.length).fill(Infinity);
    distances[source] = 0;
    const previous = Array(nodes.length).fill(null);
    const priorityQueue = new MinPriorityQueue();
    priorityQueue.enqueue(source, 0);

    const highlightNode = (nodeId, color) => {
      const { x, y } = positions[nodeId];
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fillText(nodeId, x - 5, y + 5);
    };

    const highlightEdge = (from, to, color) => {
      const fromNode = positions[from];
      const toNode = positions[to];
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.lineWidth = 1;
    };

    const interval = setInterval(() => {
      if (priorityQueue.isEmpty()) {
        clearInterval(interval);

        let resultText = `Shortest distances from Node ${source}:\n`;
        for (let i = 0; i < nodes.length; i++) {
          if (i !== source) {
            resultText += `Node ${source} -> Node ${i} --> Distance: ${
              distances[i] === Infinity ? "Infinity" : distances[i]
            }\n`;
          }
        }
        setResult(resultText);
        return;
      }

      const { element: currentNode } = priorityQueue.dequeue();
      if (visited.has(currentNode)) return;
      visited.add(currentNode);
      highlightNode(currentNode, "yellow");

      for (let neighbor = 0; neighbor < nodes.length; neighbor++) {
        if (graph[currentNode][neighbor] !== Infinity && !visited.has(neighbor)) {
          const newDist = distances[currentNode] + graph[currentNode][neighbor];
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            previous[neighbor] = currentNode;
            priorityQueue.enqueue(neighbor, newDist);
            highlightEdge(currentNode, neighbor, "blue");
          }
        }
      }

      highlightNode(currentNode, "green");
    }, 700);
  };

  const handleStart = () => {
    if (nodes.length === 0) {
      alert("Please generate a graph before starting.");
      return;
    }
    if (isNaN(sourceNode) || sourceNode < 0 || sourceNode >= nodes.length) {
      alert("Please enter a valid source node between 0 and 5.");
      return;
    }
    drawGraph(nodes, edges);
    visualizeDijkstra(sourceNode);
  };

  return (
    <div className="mc">
      <SettingsPF
        nodeCount={nodeCount}
        setNodeCount={setNodeCount}
        maxWeight={maxWeight}
        setMaxWeight={setMaxWeight}
        setNodes={setNodes}
        setEdges={setEdges}
        setGraph={setGraph}
        handleStart={handleStart}
        sourceNode={sourceNode}
        setSourceNode={setSourceNode}
        setPositions={setPositions}
      />
      <canvas id="canv"
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid black" }}
      ></canvas>
      <pre>{result}</pre>
    </div>
  );
};

class MinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(element, priority) {
    this.heap.push({ element, priority });
    this.bubbleUp();
  }

  dequeue() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (element.priority >= parent.priority) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) swap = leftChildIndex;
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (!swap && rightChild.priority < element.priority) ||
          (swap && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (!swap) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
export default DijkstraVisualizer;
